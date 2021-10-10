import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, ScrollView } from 'react-native'
import { FAB, Text } from 'react-native-paper'

import estilos from '../../themes/Estilos'

import ListaSites from '../../components/ListaSites'
import { BACKEND } from '../../constants'

export default function Sites(props) {

  const [carregando, SetCarregando] = useState(false)
  const [info, SetInfo] = useState([{}])
  let { idUsuario } = props.route.params


  async function obtemDados() {
    SetCarregando(true)
    let uri = `${BACKEND + "/sites"}`

    await fetch(uri)
      .then(response => response.json())
      .then(data => {
        SetInfo(data)
      }).catch((err) => console.log(err.message))
    SetCarregando(false)
  }

  useEffect(() => {
    obtemDados()
  }, [])

  return (
    <>

      <View style={{
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 16
      }}>

        {carregando && <ActivityIndicator size="large" color="#0000cd" />}
        {info.length === 0 && !carregando ?
          (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text>Cadastre uma conta para iniciar</Text>
            </View>
          ) : (
            <ScrollView>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 8
              }}>
                {!carregando && <FAB icon='cached' style={estilos.fab} label='Recarregar' onPress={() => obtemDados()} />}
              </View>
              {info.map((val, index) => {
                return (
                  !carregando && <ListaSites key={index} info={val} onPress={() => props.navigation.navigate('Contas', { dono: idUsuario, url: val._id })} />
                )
              })}
            </ScrollView>
          )
        }


      </View>
      <FAB style={{
        ...estilos.fabNovaCont,
        backgroundColor: estilos.fab.backgroundColor
      }}
        icon='plus'
        label='' 
        onPress={()=>props.navigation.navigate('NovaConta',{dono:idUsuario})}
        />

    </>
  )
}