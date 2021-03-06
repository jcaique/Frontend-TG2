import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, FAB, HelperText, ActivityIndicator } from 'react-native-paper';

import { BACKEND } from './../../constants'
import estilos from '../../themes/Estilos';

function Login(props) {
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');
  const [mostraSenha, setSetMostraSenha] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [entrando, setEntrando] = useState(false)

  async function Logar() {
    setEntrando(true);

    let login = { login: usuario, senha: senha }
    let url = `${BACKEND + '/login/' + usuario}`

    await fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    }).then(response => response.json())
      .then(data => {
        data.status === 200 ? props.navigation.navigate('Sites', {idUsuario:data._id}) : setAviso(true)
      })
      .catch(function (error) {
        //implementar erro da aplicação 
        console.error('Erro ao entrar.\n' + error.message + '\n' + error.status)
      })

    setEntrando(false)
  }

  return (
    <View style={estilos.boxTela}>
      <View style={estilos.boxDados}>
        <TextInput
          onFocus={() => setAviso(false)}
          label='Usuário'
          maxLength={30}
          mode='flat'
          onChangeText={usuario => setUsuario(usuario)}
          style={estilos.input}
          underlineColor='#0000cd'
          selectionColor='#baa7d9'
          value={usuario}
          placeholder='Informe seu usuário'
        />

        <TextInput
          onFocus={() => setAviso(false)}
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
          selectionColor='#baa7d9'
          placeholder='Digite sua senha'
        />

        <HelperText
          style={{ left: '1%' }}
          type='error'
          visible={aviso}> Usuário/Senha inválidos.
        </HelperText>

        <ActivityIndicator color='#0000cd' animating={entrando} />
      </View>

      <View style={estilos.boxBotoes}>
        <FAB
          style={estilos.fab}
          icon='account-plus'
          label='Criar Conta'
          onPress={() => { props.navigation.navigate('NovoLogin') }}
        />

        <FAB
          style={estilos.fab}
          icon='login-variant'
          label='Entrar'
          onPress={() => { Logar() }}
          disabled={!(usuario.length > 0 && senha.length > 0)}
        />
      </View>
    </View>
  )
}

export default Login;