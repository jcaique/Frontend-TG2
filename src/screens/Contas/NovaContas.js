import React, { useState } from "react"
import { View, Text } from "react-native"
import { TextInput, Modal, Portal, Provider, FAB, Checkbox, IconButton, HelperText } from "react-native-paper"

import estilos from "../../themes/Estilos"

import geraSenha from '../../functions/GeraSenha'

import { BACKEND } from "../../constants"

export default function NovaConta(props) {

    /**
     * @todo
     * O modal esta lento
     * o teclado ajusta o tamanho da tela e arrasta o botão | renderização condicional
     * o teclado esconde os campos mais baixos | alterar posicionamento com foco? ou usar o componente View como pai ao invez do React.fragment
     */

    let { dono } = props.route.params
    const [idSite, setIdSite] = useState('')

    const maxSizeSenha = 50 //o tamanho maximo da senha. inclusivo

    const [username, setUsername] = useState('')
    const [site, setSite] = useState('')
    const [senha, setSenha] = useState('')
    const [erros, setErros] = useState({})

    const [showModal, setShowModal] = useState(false)
    const [tamanho, setTamanho] = useState(0)
    const [maiusculas, setMaiusculas] = useState(true)
    const [minusculas, setMinusculas] = useState(true)
    const [numeros, setNumeros] = useState(true)
    const [especiais, setEspeciais] = useState(false)

    const validaErrosLogin = () => {
        let errosPossiveis = {}

        if (username.trim() === '') errosPossiveis.username = 'Informe o username.'
        if (senha.length < 3 && senha.trim() !== '') errosPossiveis.senha = 'Senha com no mínimo 3 caracteres.'
        if (senha.trim() === '') errosPossiveis.senha = 'Informe a senha.'
        if (site.trim() === '') errosPossiveis.site = 'informe um site.'

        //console.log(errosPossiveis.username)
        //console.log(errosPossiveis.senha)
        //console.log(errosPossiveis.site)

        return errosPossiveis
    }

    async function cadastraDados() {

            let uri = `${BACKEND + '/contas/'}`

            let info = {
                dono: dono,
                url: idSite,
                login: username,
                senha: senha
            }

            console.log('info:')
            console.log(info)

            await fetch(uri, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
                .then(response => response.json())
                .then(data => {

                    if (data.messsage === undefined) {

                        alert('cadastrado com sucesso')

                    } else if (data.message === 'Uma conta com o mesmo nome ja existe') {

                        alert(data.message)

                    } else {

                        alert(data.message[0].msg)

                    }

                    console.log(data)

                })
                .catch((err) => {
                    alert(`ocorreu um erro ao cadastrar a conta: ${err.message}`)
                })

        

        props.navigation.goBack()

    }

    async function cadastraSite() {
        let errosOcorridos = validaErrosLogin()

        if (Object.keys(errosOcorridos).length > 0) {
            setErros(errosOcorridos)

            setTimeout(() => setErros({}), 5000);

        } else {

            let uri = `${BACKEND + '/sites/'}`

            await fetch(uri, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: site })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('data:')
                    console.log(data)

                    let { _id } = data

                    setIdSite(_id)

                })
                .catch((err) => {
                    console.error(`${'ocorreu um erro no cadastro do site: ' + err.message}`)
                })

            cadastraDados()
        }
    }

    return (
        <>
            <Provider>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    padding: 16
                }}>

                    {/*site */}

                    <View>
                        <TextInput
                            label='website'
                            mode='flat'
                            onChangeText={site => setSite(site)}
                            style={estilos.input}
                            underlineColor='#0000cd'
                            selectionColor='#baa7d9'
                            value={site}
                            placeholder='Insira a URL do Site'
                            error={!!erros.site}
                        />
                        <HelperText
                            visible={!!erros.site}
                            style={estilos.helper}
                            type='error'
                        >
                            {erros.site}
                        </HelperText>
                    </View>

                    {/*conta */}

                    <View>
                        <TextInput
                            label='Username'
                            maxLength={150}
                            mode='flat'
                            onChangeText={username => setUsername(username)}
                            style={estilos.input}
                            underlineColor='#0000cd'
                            selectionColor='#baa7d9'
                            value={username}
                            placeholder='Informe o username'
                            error={!!erros.username}
                        />

                        <HelperText
                            visible={!!erros.username}
                            style={estilos.helper}
                            type='error'
                        >
                            {erros.username}
                        </HelperText>

                        <TextInput
                            label='Senha'
                            maxLength={maxSizeSenha}
                            mode='flat'
                            onChangeText={senha => setSenha(senha)}
                            style={estilos.input}
                            value={senha}
                            disabled={showModal} //evita que o campo entre em foco atraz do modal
                            right={
                                <TextInput.Icon
                                    name='dice-5'
                                    onPress={() => setShowModal(true)}

                                />
                            }
                            underlineColor='#0000cd'
                            selectionColor='#baa7d9'
                            placeholder='Digite sua senha'
                            error={!!erros.senha}
                        />
                        <HelperText
                            visible={!!erros.senha}
                            style={estilos.helper}
                            type='error'
                        >
                            {erros.senha}
                        </HelperText>
                    </View>


                    <FAB
                        style={{ ...estilos.fabNovaCont, backgroundColor: estilos.fab.backgroundColor }}
                        label='Cadastrar'
                        icon='plus'
                        onPress={() => {
                            cadastraSite()
                        }}
                    />


                    {/*Modal */}

                    <Portal>
                        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={estilos.modal}>
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
                                            disabled={tamanho < maxSizeSenha ? false : true}
                                            //style={estilos.fabsmall}
                                            size={36}
                                        />
                                        <IconButton
                                            icon='chevron-down'
                                            onPress={() => setTamanho(tamanho - 1)}
                                            disabled={tamanho > 0 ? false : true}
                                            //style={estilos.fabsmall}
                                            size={36}
                                        />

                                    </View>

                                    <View >

                                        <IconButton
                                            icon='chevron-double-up'
                                            onPress={() => tamanho + 5 <= maxSizeSenha ? setTamanho(tamanho + 5) : setTamanho(maxSizeSenha)}
                                            disabled={tamanho < maxSizeSenha ? false : true}
                                            //style={estilos.fabsmall}
                                            size={36}
                                        />
                                        <IconButton
                                            icon='chevron-double-down'
                                            onPress={() => tamanho - 5 >= 0 ? setTamanho(tamanho - 5) : setTamanho(0)}
                                            disabled={tamanho > 0 ? false : true}
                                            //style={estilos.fabsmall}
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
                        </Modal>
                    </Portal>

                </View>
            </Provider>
        </>
    )

}