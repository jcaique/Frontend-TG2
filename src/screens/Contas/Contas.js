import React, { useState, useEffect } from "react"
import { View, Text, ScrollView,ActivityIndicator } from "react-native"
import { FAB } from "react-native-paper"

import ListaContas from "../../components/ListaContas"

import estilos from "../../themes/Estilos"
import { BACKEND } from "../../constants"

export default function Contas(props) {

    let { dono, url } = props.route.params

    const [carregando, SetCarregando] = useState(false)
    const [info, SetInfo] = useState([{}])

    async function obtemDados() {
        SetCarregando(true)
        let uri = `${BACKEND + "/contas/" + dono}`

        let dados = {
            dono: dono,
            url: url,
        }

        await fetch(uri, {
            mode: 'cors',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
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
                        <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
                            <Text>Cadastre uma conta neste site para iniciar</Text>
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
                                    !carregando && <ListaContas key={index} info={val}/>
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
                onPress={() => props.navigation.navigate('NovaConta', { dono: dono })}
            />

        </>
    )

}