import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, FAB, HelperText, ActivityIndicator, ProgressBar } from 'react-native-paper'

import BACKEND from '../../constants'

function NovoLogin(props) {
  const [mostraSenha, setSetMostraSenha] = useState(true)
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [erros, setErros] = useState({})

  async function CriaConta() {
    let errosOcorridos = validaErrosLogin()

    if (Object.keys(errosOcorridos).length > 0) {
      setErros(errosOcorridos)

      setTimeout(() => {setErros({})}, 5000);
    } else {
      let metodo = 'POST' //se preciso futuramente, fazer condicionalmente
      let novoLogin = { login: usuario, senha: senha }

      let url = `${BACKEND}/`

    }
  }

  const validaErrosLogin = () => {
    let errosPossiveis = {}

    if (usuario.trim() === '') errosPossiveis.usuario = 'Informe o nome de usuário.'
    if (senha.length < 8 && senha.trim() !== '') errosPossiveis.senha = 'Senha com no mínimo 8 caracteres.'
    if (senha.trim() === '') errosPossiveis.senha = 'Informe a senha.'
    if (senha !== confirmaSenha && confirmaSenha.trim() !== '') errosPossiveis.confirmaSenha = 'Senhas divergentes.'
    
    console.log(errosPossiveis.usuario)
    console.log(errosPossiveis.senha)
    console.log(errosPossiveis.confirmaSenha)

    return errosPossiveis
  }

  return (
    <View style={estilos.boxTela}>
      <View style={estilos.boxDados}>
        <TextInput
          style={estilos.inputs}
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
          style={estilos.inputs}
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
          style={estilos.inputs}
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

          <Text>{usuario + ' ' + senha}</Text>
      </View>


      <View style={estilos.boxBotoes}>
        <FAB
          label='Salvar'
          icon='content-save'
          style={estilos.FAB}
          onPress={() => { CriaConta() }}
        />
      </View>
    </View>
  )
}

const estilos = StyleSheet.create({
  boxTela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#32a',
  },

  boxDados: {
    backgroundColor: '#ee0',
    width: '90%',
  },

  fab: {
    elevation: 8,
    backgroundColor: '#4b0082',
    width: 140,
  },

  boxBotoes: {
    backgroundColor: '#a00',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '1%',
    padding: '1%'
  },

  inputs: {
    padding: '2%'
  },

  helper:{
    left:'1%',
    fontFamily:'Roboto',
    marginTop:-10
  } 

})

export default NovoLogin;