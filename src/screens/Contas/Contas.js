import React, { useState, useEffect } from "react"
import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import { FAB, Modal, Portal, Provider } from "react-native-paper"

import ListaContas from "../../components/ListaContas"
import ModalSenha from "../../components/ModalSenha"

import estilos from "../../themes/Estilos"
import { BACKEND } from "../../constants"

export default function Contas(props) {

    let { dono, url } = props.route.params

    const [carregando, SetCarregando] = useState(false)
    const [info, SetInfo] = useState([{}])
    const [showModal, setShowModal] = useState(false)
    const [novaSenha, setNovaSenha] = useState('')

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

    async function editaDados(_id,login,senha) {
        let uri = `${BACKEND + "/contas/"}`

        let dados = {
            _id:_id,
            login:login,
            senha:senha,
            dono: dono,
            url: url,
        }

        await fetch(uri, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message)
            }).catch((err) => console.log(err.message))

        obtemDados()
    }

    async function deletaDados(_id) {
        let uri = `${BACKEND + "/contas/"}`

        let dados = {_id:_id}

        await fetch(uri, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message)
            }).catch((err) => console.log(err.message))
            
        obtemDados()
    }

    useEffect(() => {
        obtemDados()
    }, [])

    return (
        <>
            <Provider>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginHorizontal: 16
                }}>

                    {carregando && <ActivityIndicator size="large" color="#0000cd" style={{alignSelf:'center',justifyContent:'center'}} />}
                    {info.length === 0 && !carregando ?
                        (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                                    {!carregando &&
                                        <FAB
                                            icon='cached'
                                            style={estilos.fab}
                                            label='Recarregar'
                                            onPress={() => obtemDados()}
                                        />
                                    }
                                </View>
                                {info.map((val, index) => {
                                    return (
                                        !carregando &&
                                        <ListaContas
                                            key={`${val._id}|${index}`}
                                            info={val}
                                            setShowModal={setShowModal}
                                            novaSenha={novaSenha}
                                            editaDados={editaDados}
                                            deletaDados={deletaDados}
                                        />

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
                <Portal>
                    <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={estilos.modal} >
                        <ModalSenha
                            setSenha={setNovaSenha}
                            setShowModal={setShowModal}
                        />
                    </Modal>
                </Portal>
            </Provider>
        </>
    )

}