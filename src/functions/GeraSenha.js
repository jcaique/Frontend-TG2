/**
 * recebe um objeto contendo os parametros de uma senha 
 * e retorna uma String aleatoria de acordo com esses parametros
 * @param {object} parametros o objeto contendo os parametros
 * 
 * { maiusculas:bool, minusculas:bool, 
 *   numeros:bool, especiais:bool,
 *   tamanho:number }
 * @returns {string} A senha gerada
 */

function geraSenha(parametros) {

    let caracteres = ''
    if (parametros.maiusculas) {

        caracteres += 'ABCDEFGHIJKLMNOPQRSTUVXZ'

    }
    if (parametros.minusculas) {

        caracteres += 'abcdefghijklmnopqrstuvxz'

    }
    if (parametros.numeros) {

        caracteres += '1234567890'

    }
    if (parametros.especiais) {

        caracteres += '!@#$%&*()-_=+/|?.<>[]{}'

    }

    let senha = ''
    let i = 0
    while(true){
        if(i>=parametros.tamanho){
            break
        }
        i++
        let num = Math.floor(Math.random() * (caracteres.length - 1))
        senha += caracteres.charAt(num)
    }

    return senha

}

export default geraSenha