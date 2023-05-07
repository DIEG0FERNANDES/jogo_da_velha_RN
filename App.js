import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

// import {
//   criarTubuleiro
// } from './src/logica';

import Estilo from './src/components/estilos'


export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');
  const [nivel, setNivel] = useState('');

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

    verificarGanhador(tabuleiro, linha,coluna);
  }
  // Funções para exibir nivel de dificuldade
  function selecionarNivel(nivel) {
    setNivel(nivel);
    setTela('jogador');
  }
  // Exibe o menu do Jogo
  function getTelaMenu() {
    return (
      <ImageBackground source={require('./src/assets/image-background.png')} style={Estilo.imageBackground}>
        <View style={Estilo.container}>
          <StatusBar style='auto' />
          <Image source={require('./src/assets/image-text.png')} style={Estilo.titulo} />
          <Text style={Estilo.subtitulo}>selecione seu jogador</Text>

          <View style={Estilo.inlineItems}>
            <TouchableOpacity style={Estilo.boxJogador} onPress={() => iniciarJogo('X')}>
              <Text style={Estilo.jogadorX}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Estilo.boxJogador} onPress={() => iniciarJogo('O')}>
              <Text style={Estilo.jogadorO}>O</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={Estilo.boxMaquina} onPress={() => setTela('nivel')}>
            <Image source={require('./src/assets/image-computador.png')} style={Estilo.maquina} />
            {/* <Text style={Estilo.maquina}>VS Computador</Text>image-computador.png */}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
  // exibi menu de dificuldade do jogo
  function getTelaNivel() {
    return (<ImageBackground source={require('./src/assets/image-background.png')} style={Estilo.imageBackground}>
      <View style={Estilo.container}>
        <StatusBar style='auto' />
        <Image source={require('./src/assets/image-text.png')} style={Estilo.titulo} />
        <Text style={Estilo.subtitulo}>selecione o modo de jogo</Text>
        <TouchableOpacity style={Estilo.boxMaquina} onPress={() => selecionarNivel('Facíl')}>
          <Text style={Estilo.facil}>Facil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Estilo.boxMaquina} onPress={() => selecionarNivel('Normal')}>
          <Text style={Estilo.normal}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Estilo.boxMaquina} onPress={() => selecionarNivel('Difícil')}>
          <Text style={Estilo.dificil}>Dificil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Estilo.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={Estilo.textoBotaoMenu}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    )
  }
  function selecionarNivel(nivel) {
    setNivel(nivel)
    setTela('jogador');
  }
  // Exibi menu de escolha de jogador no modo Contra Maquina
  function escolherJogador() {
    return (
      <ImageBackground source={require('./src/assets/image-background.png')} style={Estilo.imageBackground}>
        <View style={Estilo.container}>
          <StatusBar style='auto' />
          <Image source={require('./src/assets/image-text.png')} style={Estilo.titulo} />
          <Text style={Estilo.subtitulo}>selecione seu jogador</Text>

          <View style={Estilo.inlineItems}>
            <TouchableOpacity style={Estilo.boxJogador} onPress={() => contraMaquina('X')}>
              <Text style={Estilo.jogadorX}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Estilo.boxJogador} onPress={() => contraMaquina('O')}>
              <Text style={Estilo.jogadorO}>O</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={Estilo.botaoMenu} onPress={() => setTela('nivel')}>
            <Text style={Estilo.textoBotaoMenu}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Estilo.botaoMenu} onPress={() => setTela('menu')}>
            <Text style={Estilo.textoBotaoMenu}>Voltar ao Menu</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
  // Tela de jogo Contra Player
  function getTelaJogo() {
    return (
      <ImageBackground source={require('./src/assets/image-background.png')} style={Estilo.imageBackground}>
        <View style={Estilo.container}>
          <StatusBar style='auto' />

          <Image source={require('./src/assets/image-text.png')} style={Estilo.titulo} />
          <Text style={Estilo.vezmodo}>Vez de: {jogadorAtual}.</Text>
          {
            tabuleiro.map((linha, numeroLinha) => {
              return (
                <View key={numeroLinha} style={Estilo.inlineItems}>
                  {
                    linha.map((coluna, numeroColuna) => {
                      return (
                        <TouchableOpacity key={numeroColuna} style={Estilo.boxJogador}
                          onPress={() => jogar(numeroLinha, numeroColuna)} disabled={coluna !== ''}>
                          <Text style={coluna === 'X' ? Estilo.jogadorX : Estilo.jogadorO}>{coluna}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              )
            })
          }

          <TouchableOpacity style={Estilo.botaoMenu} onPress={() => setTela('menu')}>
            <Text style={Estilo.textoBotaoMenu}>Voltar ao Menu</Text>
          </TouchableOpacity>
        </View >
      </ImageBackground >
    );
  }
  // Tela de Jogo Contra Maquina
  function getTelaVsCPU() {
    return (
      <ImageBackground source={require('./src/assets/image-background.png')} style={Estilo.imageBackground}>
        <View style={Estilo.container}>
          <StatusBar style='auto' />
          <Image source={require('./src/assets/image-text.png')} style={Estilo.titulo} />
          <Text style={Estilo.vezmodo}>Vez de: {jogadorAtual}</Text>
          <View style={Estilo.inlineItems}>
            <TouchableOpacity onPress={() => setTela('nivel')}>
              <Text style={Estilo.textoBotaoMenu}>selecione o modo: {nivel}</Text>
            </TouchableOpacity>
          </View>

          {
            tabuleiro.map((linha, numeroLinha) => {
              return (
                <View key={numeroLinha} style={Estilo.inlineItems}>
                  {
                    linha.map((coluna, numeroColuna) => {
                      return (
                        <TouchableOpacity key={numeroColuna} style={Estilo.boxJogador}
                          onPress={() => jogar(numeroLinha, numeroColuna)} disabled={coluna !== ''}>
                          <Text style={coluna === 'X' ? Estilo.jogadorX : Estilo.jogadorO}>{coluna}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              )
            })
          }
          <TouchableOpacity style={Estilo.botaoMenu} onPress={() => reiniciar(jogadorAtual)}>
            <Text style={Estilo.textoBotaoMenu}>Reiniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={Estilo.botaoMenu} onPress={() => setTela('menu')}>
            <Text style={Estilo.textoBotaoMenu}>Voltar ao Menu</Text>
          </TouchableOpacity>

        </View >
      </ImageBackground >
    );
  }
  // Exibe o resultado de quem ganhou o jogo
  function getTelaGanhador() {
    return (
      <ImageBackground source={require('./src/assets/image-background.png')} style={Estilo.imageBackground}>
        <View style={Estilo.container}>
          <StatusBar style='auto' />
          <Image source={require('./src/assets/image-text.png')} style={Estilo.titulo} />
          <Text style={Estilo.subtituloFinal}>Resultado Final:</Text>

          {
            ganhador === '' &&
            <Text style={Estilo.ganhador}>Empatou</Text>
          }
          {
            ganhador !== '' &&
            <>
              <View style={Estilo.boxJogador}>
                <Text style={ganhador === 'X' ? Estilo.jogadorX : Estilo.jogadorO}>{ganhador}</Text>
              </View>
              <Text style={Estilo.ganhador}>GANHOU</Text>
            </>
          }

          <TouchableOpacity style={Estilo.botaoMenu} onPress={() => setTela('menu')}>
            <Text style={Estilo.textoBotaoMenu}>Voltar ao Menu</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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