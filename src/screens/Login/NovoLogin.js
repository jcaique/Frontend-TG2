import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, FAB, HelperText, ActivityIndicator, ProgressBar } from 'react-native-paper'

import {BACKEND} from '../../constants'
import estilos from '../../themes/Estilos'

function NovoLogin(props) {
  const [mostraSenha, setSetMostraSenha] = useState(true)
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [erros, setErros] = useState({})
  const [status, setStatus] = useState('') //mostrar mensagem do back para o usuário
  const [criandoConta, setCriandoConta] = useState(false)

  async function CriaConta() {
    let errosOcorridos = validaErrosLogin()

    if (Object.keys(errosOcorridos).length > 0) {
      setErros(errosOcorridos)

      //para remover os alertas depois de 5 segundos
      setTimeout(() => setErros({}), 5000);
    }
    else {
      //let metodo = 'POST' //se preciso futuramente, fazer condicionalmente
      let novoLogin = { login: usuario, senha: senha }

      let url = `${BACKEND}/login`;
      console.log(url)
      
      setCriandoConta(true)
      await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoLogin)
      }).then(response => response.json())
        .then(response => {
          response.status === 200 ? props.navigation.navigate('Login') : setStatus(response.message);
          
          setTimeout(() => setStatus(''), 5000)
        })
        .catch(function (error) {
          console.error('Erro ao criar login.' + '\n' + error.message + '\n' + error.status);
          setStatus('Houve erro ao fazer a solicitação. ' + error.status + ' ' + error.message)
        })
      setCriandoConta(false)
    }
  }

  const validaErrosLogin = () => {
    let errosPossiveis = {}

    if (usuario.trim() === '') errosPossiveis.usuario = 'Informe o nome de usuário.'
    if (senha.length < 8 && senha.trim() !== '') errosPossiveis.senha = 'Senha com no mínimo 8 caracteres.'
    if (senha.trim() === '') errosPossiveis.senha = 'Informe a senha.'
    if (senha !== confirmaSenha && confirmaSenha.trim() !== '') errosPossiveis.confirmaSenha = 'Senhas diferentes.'

    console.log(errosPossiveis.usuario)
    console.log(errosPossiveis.senha)
    console.log(errosPossiveis.confirmaSenha)

    return errosPossiveis
  }

  return (
    <View style={estilos.boxTela}>
      <View style={estilos.boxDados}>
        <TextInput
          style={estilos.input}
          label='Nome de usuário'
          placeholder='Insira o nome de usuário'
          underlineColor='#0000cd'
          selectionColor='#baa7d9'
          mode='outlined'
          onChangeText={(usuario) => setUsuario(usuario)}
          value={usuario}
          error={!!erros.usuario}
        //implementar o auto focus
        />
        <HelperText
          type='error'
          style={estilos.helper}
          visible={!!erros.usuario}
        >{erros.usuario}
        </HelperText>

        <TextInput
          style={estilos.input}
          label='Senha'
          placeholder='Insira a senha'
          underlineColor='#0000cd'
          selectionColor='#baa7d9'
          mode='outlined'
          secureTextEntry={mostraSenha}
          right={
            <TextInput.Icon
              name={mostraSenha ? 'eye-off' : 'eye'}
              onPress={() => setSetMostraSenha(mostraSenha ? false : true)}
            />
          }
          value={senha}
          onChangeText={(senha) => setSenha(senha)}
          error={!!erros.senha}
        />
        <HelperText
          type='error'
          style={estilos.helper}
          visible={!!erros.senha}
        >{erros.senha}
        </HelperText>

        <TextInput
          style={estilos.input}
          label='Confirmar senha'
          placeholder='Reinsira a senha'
          underlineColor='#0000cd'
          selectionColor='#baa7d9'
          mode='outlined'
          secureTextEntry={mostraSenha}
          right={
            <TextInput.Icon
              name={mostraSenha ? 'eye-off' : 'eye'}
              onPress={() => setSetMostraSenha(mostraSenha ? false : true)}
            />
          }
          value={confirmaSenha}
          onChangeText={(confirmaSenha) => setConfirmaSenha(confirmaSenha)}
          error={!!erros.confirmaSenha}
        />
        <HelperText
          type='error'
          style={estilos.helper}
          visible={!!erros.confirmaSenha}
        >{erros.confirmaSenha}
        </HelperText>

        <HelperText
          type='error'
          style={estilos.helper}
          visible={!!status}
        >{status}            
        </HelperText>
      </View>

      <View style={estilos.boxBotoes}>
        <FAB
          label='Cadastrar'
          icon='content-save'
          style={estilos.fab}
          onPress={() => { CriaConta() }}
        />
      </View>

      <ActivityIndicator 
        color='#0000cd' 
        animating={criandoConta} 
        size='large'  
        style={estilos.load}/>
    </View>
  )
}

/*const estilos = StyleSheet.create({
  boxTela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#32a',
  },

  boxDados: {
    // backgroundColor: '#ee0',
    width: '90%',
  },

  fab: {
    elevation: 8,
    backgroundColor: '#4b0082',
    width: 140,
  },

  boxBotoes: {
    // backgroundColor: '#a00',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '1%',
    padding: '1%'
  },

  inputs: {
    padding: '2%'
  },

  helper: {
    left: '1%',
    fontFamily: 'Roboto',
    marginTop: -10
  },

  load:{
    top: '-25%'
  }

})*/

export default NovoLogin;