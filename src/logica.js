import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import {tabuleiro, jogar} from '../App';
function logica(){

    const criarTubuleiro = () => {
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
    };
};

export default { criarTubuleiro, logica }; 