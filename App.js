import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);
    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setTela('jogo');
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')

    verificarGanhador(tabuleiro, linha, coluna);

  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    // linhas
    if(tabuleiro[linha][0] !== '' && tabuleiro[linha][0] == tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]){
      return finalizarJogo(tabuleiro[linha][0]);
    }
    // coluna
    if(tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]){
      return finalizarJogo(tabuleiro[0][coluna]);
    }
    // diagonal 1
    if(tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]){
      return finalizarJogo(tabuleiro[0][0]);
    }
    // diagonal 2
    if(tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]){
      return finalizarJogo(tabuleiro[0][2]);
    }
    // nenhum ganhador
    if((jogadasRestantes -1) === 0) {
      return finalizarJogo('');
    }
    // jogo não finalizado
    setJogadasRestantes((jogadasRestantes - 1));
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela('ganhador');
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  };
  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>selecione seu jogador</Text>

        <View style={styles.inlineItems}>
          <TouchableOpacity style={styles.boxJogador} onPress={() => iniciarJogo('X')}>
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxJogador} onPress={() => iniciarJogo('O')}>
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.titulo} >Jogo da Velha</Text>

        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={styles.inlineItems}>
                {
                  linha.map((coluna, numeroColuna) => {
                    return (
                      <TouchableOpacity key={numeroColuna} style={styles.boxJogador}
                        onPress={() => jogar(numeroLinha, numeroColuna)} disabled={coluna !== ''}>
                        <Text style={coluna === 'X' ? styles.boxJogadorX : styles.boxJogadorO}>{coluna}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })
        }

        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Resultado Final</Text>

        {
          ganhador === '' && <Text style={styles.ganhador}>Nenhum Ganhador</Text>
        }
        {
          ganhador !== '' &&
          <>
            <Text style={styles.ganhador}>Ganhador</Text>
            <View style={styles.boxJogador}>
              <Text style={ganhador === 'X' ? styles.boxJogadorX : styles.boxJogadorO}>{coluna}</Text>
            </View>
          </>
        }

        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
// css versão escrota
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: 'rgb(210,10,250)',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitulo: {
    width: 220,
    marginTop: 4,
    paddingVertical: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(100,100,100)',
  },
  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: "#ddd",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  jogadorX: {
    fontSize: 40,
    color: '#553fda'
  },
  jogadorO: {
    fontSize: 40,
    color: '#da3f3f'
  },
  inlineItems: {
    flexDirection: 'row'
  },
  botaoMenu: {
    marginTop: 20
  },
  textoBotaoMenu: {
    color: '#4e6fe4'
  },
  ganhador: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333'
  },
});