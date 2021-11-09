import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { TextInput, Modal, Portal, Provider, FAB, HelperText } from "react-native-paper"

import estilos from "../../themes/Estilos"

import ModalSenha from "../../components/ModalSenha"

import { BACKEND,MAXSIZESENHA } from "../../constants"

export default function NovaConta(props) {

    /**
     * @todo
     * o teclado ajusta o tamanho da tela e arrasta o botão | renderização condicional
     * o teclado esconde os campos mais baixos | alterar posicionamento com foco?
     */

    let { dono } = props.route.params
    const [idSite, setIdSite] = useState('')

    const [username, setUsername] = useState('')
    const [site, setSite] = useState('')
    const [senha, setSenha] = useState('')
    const [erros, setErros] = useState({})

    const [showModal, setShowModal] = useState(false)

    /*function setParamsSenha(newSenha){
        setSenha(geraSenha(newSenha))
    }*/

    const validaErrosLogin = () => {
        let errosPossiveis = {}

        if (username.trim() === '') errosPossiveis.username = 'Informe o username.'
        if (senha.length < 3 && senha.trim() !== '') errosPossiveis.senha = 'Senha com no mínimo 3 caracteres.'
        if (senha.trim() === '') errosPossiveis.senha = 'Informe a senha.'
        if (site.trim() === '') errosPossiveis.site = 'informe um site.'

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

                    let { _id } = data

                    setIdSite(_id)

                })
                .catch((err) => {
                    console.error(`${'ocorreu um erro no cadastro do site: ' + err.message}`)
                })
        }
    }

    useEffect(()=>{
        if(idSite!==''){
            cadastraDados()
        }
    },[idSite])

    return (
        <>
            <Provider>
                <View style={{
                    flex: 1,
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
                            maxLength={MAXSIZESENHA}
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
                            <ModalSenha
                                setSenha={setSenha}
                                setShowModal={setShowModal}
                            />
                        </Modal>
                    </Portal>

                </View>
            </Provider>
        </>
    )

}