import { StyleSheet } from 'react-native';

// css versão escrota

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        alignItems: "center",
        width: 380,
        height: 62,
        resizeMode: "cover",
    },
    subtitulo: {
        marginTop: 4,
        paddingVertical: 2,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    subtituloFinal: {
        marginTop: 4,
        paddingVertical: 2,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    vezmodo: {
        color: 'white',
    },
    boxJogador: {
        width: 80,
        height: 80,
        backgroundColor: "#ddd",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
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
        // width: 80,
        // height: 80,
        // alignItems: 'center',
        fontSize: 40,
        color: '#553fda'
    },
    jogadorO: {
        fontSize: 40,
        color: '#da3f3f'
    },
    maquina: {
        alignItems: "center",
        width: 170,
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
        marginTop: 10
    },
    textoBotaoMenu: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    ganhador: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white'
    },
    imageBackground: {
        backgroundColor: "#222034",
        flex: 2,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    },
});