import * as React from 'react';
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

  // Configuração do player em cima da matriz"tabuleiro" do jogo
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
  // Configuração do player contra maquina
  function contraMaquina(jogador) {
    setJogadorAtual(jogador);
    setJogadasRestantes(9);
    setTela('jogador');
    setTela('nivel');
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setTela('vscpu');
  }
  // Script para setar as funções de menu, dentro de jogo e de resultado do jogo.
  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'nivel':
      return getTelaNivel();
    case 'vscpu':
      return getTelaVsCPU();
    case 'ganhador':
      return getTelaGanhador();
    case 'jogador':
      return escolherJogador();
  };
  // Exibi o tabuleiro do jogo com suas peças
  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')

    verificarGanhador(tabuleiro, linha, coluna);

  }
  // Funções para exibir nivel de dificuldade
  function selecionarNivel() {
    setTela('jogador');
  }
  // Exibe o menu do Jogo
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
        <TouchableOpacity style={styles.boxMaquina} onPress={() => setTela('nivel')}>
          <Text style={styles.maquina}>VS Computador</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // exibi menu de dificuldade do jogo
  function getTelaNivel() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <TouchableOpacity style={styles.boxMaquina} onPress={() => selecionarNivel('facil')}>
          <Text style={styles.facil}>Facil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxMaquina} onPress={() => selecionarNivel('normal')}>
          <Text style={styles.normal}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxMaquina} onPress={() => selecionarNivel('dificil')}>
          <Text style={styles.dificil}>Dificil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Voltar</Text>
        </TouchableOpacity>
      </View>

    )
  }
  // Exibi menu de escolha de jogador no modo Contra Maquina
  function escolherJogador() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>selecione seu jogador</Text>

        <View style={styles.inlineItems}>
          <TouchableOpacity style={styles.boxJogador} onPress={() => contraMaquina('X')}>
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxJogador} onPress={() => contraMaquina('O')}>
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('nivel')}>
          <Text style={styles.textoBotaoMenu}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // Tela de jogo Contra Player
  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.titulo} >Jogo da Velha</Text>
        <Text>Vez de: {jogadorAtual}.</Text>
        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={styles.inlineItems}>
                {
                  linha.map((coluna, numeroColuna) => {
                    return (
                      <TouchableOpacity key={numeroColuna} style={styles.boxJogador}
                        onPress={() => jogar(numeroLinha, numeroColuna)} disabled={coluna !== ''}>
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
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
  // Tela de Jogo Contra Maquina
  function getTelaVsCPU() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.titulo} >Jogo da Velha</Text>
        <Text>Vez de: {jogadorAtual}</Text>
        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={styles.inlineItems}>
                {
                  linha.map((coluna, numeroColuna) => {
                    return (
                      <TouchableOpacity key={numeroColuna} style={styles.boxJogador}
                        onPress={() => jogar(numeroLinha, numeroColuna)} disabled={coluna !== ''}>
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })
        }
        <TouchableOpacity style={styles.botaoMenu} onPress={() => contraMaquina(jogadorAtual === 'X' ? jogadorAtual : 'O')}>
          <Text style={styles.textoBotaoMenu}>Reiniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>

      </View>
    );
  }
  // Exibe o resultado de quem ganhou o jogo
  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtituloFinal}>Resultado Final:</Text>

        {
          ganhador === '' &&
          <Text style={styles.ganhador}>Empatou</Text>
        }
        {
          ganhador !== '' &&
          <>
            <View style={styles.boxJogador}>
              <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
            <Text style={styles.ganhador}>GANHOU</Text>
          </>
        }

        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // Verifica se tem vencedor, perdedor ou se empatou
  function verificarGanhador(tabuleiro, linha, coluna) {
    // linhas
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] == tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0]);
    }
    // coluna
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }
    // diagonal 1
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0]);
    }
    // diagonal 2
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2]);
    }
    // nenhum ganhador
    if ((jogadasRestantes - 1) === 0) {
      return finalizarJogo('');
    }
    // jogo não finalizado
    setJogadasRestantes((jogadasRestantes - 1));
  }
  // Caso a função verificadora de ganhador funcione, o jogo deve finalizar e puxar a função de exibir os resultados
  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela('ganhador');
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
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitulo: {
    marginTop: 4,
    paddingVertical: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(100,100,100)',
  },
  subtituloFinal: {
    marginTop: 4,
    paddingVertical: 2,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: "#ddd",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  boxMaquina: {
    width: 170,
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
  maquina: {
    fontSize: 18,
    color: '#ff8000'
  },
  facil: {
    fontSize: 18,
    color: '#16b300'
  },
  normal: {
    fontSize: 18,
    color: '#ff8000'
  },
  dificil: {
    fontSize: 18,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333'
  },
});