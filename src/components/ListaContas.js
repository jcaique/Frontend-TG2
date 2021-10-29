import React from "react"
import { View, Text } from "react-native"
import { Button, Card, IconButton, TextInput } from "react-native-paper"
import * as Clipboard from "expo-clipboard"
import estilos from "../themes/Estilos"

function ListaContas({ info }) {

    return (
        <>

            <Card style={{ marginVertical: 4 }}>
                <Card.Content>

                    <View>

                        <TextInput
                            value={info.login}
                            mode='outlined'
                            editable={false}
                            label='Username'
                            dense={true}
                        />

                    </View>
                    <Button
                        icon='content-copy'
                        mode='contained'
                        onPress={() => Clipboard.setString(info.login)}
                        style={{ backgroundColor: estilos.fabsmall.backgroundColor, alignSelf: 'flex-end', marginTop: 4 }}
                    >
                        Copiar
                    </Button>

                    <View>

                        <TextInput
                            value={info.senha}
                            mode='outlined'
                            editable={false}
                            label='Senha'
                            dense={true}
                        />

                        <Button
                            icon='content-copy'
                            mode='contained'
                            onPress={() => Clipboard.setString(info.senha)}
                            style={{ backgroundColor: estilos.fabsmall.backgroundColor, alignSelf: 'flex-end', marginTop: 4 }}
                        >
                            Copiar
                        </Button>

                    </View>
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'space-between' }}>
                    <Button onPress={() => alert('Botão Deletar')} >Deletar</Button>
                    <Button onPress={() => alert('botão editar')}>Editar</Button>
                </Card.Actions>
            </Card>
        </>
    )

}

export default ListaContas