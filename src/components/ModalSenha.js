import React, { useState } from "react"
import { View, Text } from "react-native"
import { FAB, Checkbox, IconButton } from "react-native-paper"

import estilos from "../themes/Estilos"

import geraSenha from '../functions/GeraSenha'

import { MAXSIZESENHA } from "../constants"

function ModalSenha({ setSenha, setShowModal}) {

    const [tamanho, setTamanho] = useState(0)
    const [maiusculas, setMaiusculas] = useState(true)
    const [minusculas, setMinusculas] = useState(true)
    const [numeros, setNumeros] = useState(true)
    const [especiais, setEspeciais] = useState(false)

    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text>Tamanho: </Text>
                    <Text >{tamanho}</Text>

                </View>

                <View >

                    <IconButton
                        icon='chevron-up'
                        onPress={() => setTamanho(tamanho + 1)}
                        disabled={tamanho < MAXSIZESENHA ? false : true}
                        size={36}
                    />
                    <IconButton
                        icon='chevron-down'
                        onPress={() => setTamanho(tamanho - 1)}
                        disabled={tamanho > 0 ? false : true}
                        size={36}
                    />

                </View>

                <View >

                    <IconButton
                        icon='chevron-double-up'
                        onPress={() => tamanho + 5 <= MAXSIZESENHA ? setTamanho(tamanho + 5) : setTamanho(MAXSIZESENHA)}
                        disabled={tamanho < MAXSIZESENHA ? false : true}
                        size={36}
                    />
                    <IconButton
                        icon='chevron-double-down'
                        onPress={() => tamanho - 5 >= 0 ? setTamanho(tamanho - 5) : setTamanho(0)}
                        disabled={tamanho > 0 ? false : true}
                        size={36}
                    />

                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>

                <View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text>Maiúsculas</Text>
                        <Checkbox
                            status={maiusculas ? 'checked' : 'unchecked'}
                            onPress={() => setMaiusculas(!maiusculas)}
                        />

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text>Minúsculas</Text>
                        <Checkbox
                            status={minusculas ? 'checked' : 'unchecked'}
                            onPress={() => setMinusculas(!minusculas)}
                        />

                    </View>

                </View>

                <View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={{ marginRight: 2 }}>Números</Text>
                        {/*a margem alinha as checkboxes */}
                        <Checkbox
                            status={numeros ? 'checked' : 'unchecked'}
                            onPress={() => setNumeros(!numeros)}
                        />

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text>Especiais</Text>
                        <Checkbox
                            status={especiais ? 'checked' : 'unchecked'}
                            onPress={() => setEspeciais(!especiais)}
                        />

                    </View>

                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                <FAB
                    style={estilos.fab}
                    onPress={() => setShowModal(false)}
                    label='Cancelar'
                    icon='close'
                />
                <FAB
                    style={estilos.fab}
                    onPress={() => {

                        let parametros = {
                            tamanho: tamanho,
                            maiusculas: maiusculas,
                            minusculas: minusculas,
                            numeros: numeros,
                            especiais: especiais
                        }

                        setSenha(geraSenha(parametros))
                        setShowModal(false)
                    }
                    }
                    label='Confirmar'
                    icon='check'
                />

            </View>
        </View>
    )
}

export default ModalSenha