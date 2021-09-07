import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, FAB, HelperText } from 'react-native-paper';
import { color } from 'react-native-reanimated';

import BACKEND from './../../constants'

function Login(props) {
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');
  const [mostraSenha, setSetMostraSenha] = useState(true);
  const [loginValido, setLoginValido] = useState(false);

  const Logar = async () => {
    let login = { usuario: usuario, senha: senha }
    let url = `${BACKEND}/:login`
    await fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
      .then(response => {
        response.status === 200 ? props.Navegacao.navigate('Menu') : setLoginValido(true)
      })
  }

  return (
    <View style={estilos.boxTela}>
      <View style={estilos.boxDados}>
        <TextInput
          autoFocus={true}
          label='Usuário'
          maxLength={30}
          mode='flat'
          onChangeText={usuario => setUsuario(usuario)}
          style={estilos.input}
          underlineColor='#0000cd'
          value={usuario}
        />

        <TextInput
          label='Senha'
          mode='flat'
          onChangeText={senha => setSenha(senha)}
          secureTextEntry={mostraSenha}
          style={estilos.input}
          value={senha}
          right={
            <TextInput.Icon
              name={mostraSenha ? 'eye-off' : 'eye'}
              onPress={() => setSetMostraSenha(mostraSenha ? false : true)}
            />
          }
          underlineColor='#0000cd'
          placeholderTextColor='#000'
        />

        <HelperText
          style={{ left: '1%' }}
          type='error'
          visible={loginValido}> Usuário/Senha inválidos. 
        </HelperText>
      </View>

      <View style={estilos.boxBotoes}>
        <FAB
          style={estilos.fab}
          icon='login-variant'
          label='Entrar'
          onPress={() => Logar()}
        />

        <FAB
          style={estilos.fab}
          icon='account-plus'
          label='Cadastrar'
          onPress={() => { props.navigation.navigate('NovoLogin') }}
        />
      </View>
    </View>
  )
}

const estilos = StyleSheet.create({
  boxTela: {
    flex: 1,
    // backgroundColor: '#bff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  boxDados: {
    //backgroundColor: '#b01',
    width: '90%'
  },

  boxBotoes: {
    // backgroundColor: '#ee0',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
    padding: '1%'
  },

  fab: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    width: 140,
  },

  input: {
    margin: '5%',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    elevation: 5
  }
})

export default Login;