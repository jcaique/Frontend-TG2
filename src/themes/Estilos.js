import {StyleSheet} from 'react-native'

const estilos = StyleSheet.create({
    boxTela: {
      flex: 1,
      //backgroundColor: '#bff',
      alignItems: 'center',
      justifyContent: 'center'
    },
  
    boxDados: {
      //backgroundColor: '#b01',
      width: '90%'
    },
  
    boxBotoes: {
      //backgroundColor: '#ee0',
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: '1%',
      padding: '1%'
    },
  
    fab: {
      elevation: 8,
      backgroundColor: '#4b0082',
      width: 140,
    },

    fabNovaCont:{
      position:'absolute',
      right:0,
      bottom:0,
      margin:16
    },
  
    input: {
      margin: '5%',
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      elevation: 5
    },
    load:{
        top: '-25%'
    },
    helper: {
        left: '1%',
        fontFamily: 'Roboto',
        marginTop: -10
    }
  })

  export default estilos