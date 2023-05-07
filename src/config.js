import {Dimensions} from 'react-native'

const params = {
  tamanhoBloco: 110,
  tamanhoBorda: 5,
  tamanhoFonte: 18,
  tamanhoCabecalho: 0.15,
  dificuldade: 0.1,
  getQuantidadeDeColunas(){
    let largura = Dimensions.get('window').width
    return Math.floor(largura/this.tamanhoBloco)
  },
  getQuantidadeLinhas(){
    let altura = Dimensions.get('window').height
    altura = altura * (1 - this.tamanhoCabecalho)
    return Math.floor(altura/this.tamanhoBloco)
  },
}

export default params