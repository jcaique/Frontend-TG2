import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Button, Card, TextInput } from "react-native-paper"
import * as Clipboard from "expo-clipboard"
import estilos from "../themes/Estilos"

function ListaContas({ info, setShowModal,novaSenha,editaDados,deletaDados }) {

    const [login, setLogin] = useState(info.login)
    const [senha, setSenha] = useState(info.senha)
    const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)

    useEffect(()=>{
        if(edit){
            setSenha(novaSenha)
        }
    },[novaSenha])

    return (
        <>

            <Card
                style={
                    edit ?
                        { marginVertical: 4, backgroundColor: '#DAD4F7' }
                        : del ?
                            { marginVertical: 4, backgroundColor: '#FCBA12' }
                            :
                            { marginVertical: 4 }
                }
            >
                <Card.Content>

                    <View>

                        <TextInput
                            value={login}
                            mode='outlined'
                            editable={edit}
                            label='Username'
                            dense={true}
                            onChangeText={login => setLogin(login)}
                        />

                    </View>
                    <Button
                        icon='content-copy'
                        mode='contained'
                        onPress={() => !edit ? Clipboard.setString(info.login) : {}}
                        style={{ backgroundColor: estilos.fabsmall.backgroundColor, alignSelf: 'flex-end', marginTop: 4 }}
                    >
                        Copiar
                    </Button>

                    <View>

                        <TextInput
                            value={senha}
                            mode='outlined'
                            editable={edit}
                            label='Senha'
                            dense={true}
                            onChangeText={senha => setSenha(senha)}
                        />

                        {!edit &&
                            <Button
                                icon='content-copy'
                                mode='contained'
                                onPress={() => Clipboard.setString(info.senha)}
                                style={{ backgroundColor: estilos.fabsmall.backgroundColor, alignSelf: 'flex-end', marginTop: 4 }}
                            >
                                Copiar
                            </Button>
                        }
                        {edit &&
                            <Button
                                icon='dice-5'
                                mode='contained'
                                onPress={() => setShowModal(true)}
                                style={{ backgroundColor: estilos.fabsmall.backgroundColor, alignSelf: 'flex-end', marginTop: 4 }}
                            >
                                Gerar
                            </Button>
                        }

                    </View>
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'space-between' }}>
                    {!edit && !del && //inicia o modo deletar
                        <Button onPress={() => setDel(true)} >Deletar</Button>
                    }
                    {!edit && del && //cancela o modo deletar
                        <Button onPress={() => setDel(false)} >Cancelar</Button>
                    }
                    {!edit && del && //deleta a conta
                        <Button onPress={() => deletaDados(info._id)} >Confirmar</Button>
                    }
                    {!edit && !del && //inicia o modo edição
                        <Button onPress={() => setEdit(true)}>Editar</Button>
                    }
                    {edit && !del && //cancela o modo edição
                        <Button onPress={() => {
                            setLogin(info.login)
                            setSenha(info.senha)
                            setEdit(false)
                        }}>
                            Cancelar
                        </Button>
                    }
                    {edit && !del && //salva a edição
                        <Button onPress={() => editaDados(info._id,login,senha)}>Salvar</Button>
                    }
                </Card.Actions>
            </Card>
        </>
    )

}

export default ListaContas