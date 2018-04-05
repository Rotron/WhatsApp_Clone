import {
    MODIFICA_ADICIONA_CONTATO,
    ADICIONA_CONTATO_SUCESSO,
    ADICIONA_CONTATO_ERRO,
    ADC_CONTATO_LOADING,
    ZERAR_STATES,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    ENVIA_MENSAGEM,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CONVERSA_USUARIO,
    CONVERSAS_USUARIO_FETCH
} from './types';
import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';

export const modificaEmail = (email) => {
    return {
        type: MODIFICA_ADICIONA_CONTATO,
        payload: email
    }
}

export const adicionaContato = (email) => {
    return (dispatch) => {
        dispatch({type: ADC_CONTATO_LOADING})
        let emailb64 = b64.encode(email);

        firebase.database().ref(`/contatos/${emailb64}`)
            .once('value')
            .then((snapshot) => {
                if(snapshot.val()){
                    const dadosContato = _.values(snapshot.val());
                    console.log(dadosContato)
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email)
                
                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ email: email, nome:dadosContato[0].nome })
                        .then(() => adicionaContatoSucesso(dispatch))
                        .catch((err) => adicionaContatoSucesso(dispatch, err.message))
                }else {
                    dispatch({
                        type: ADICIONA_CONTATO_ERRO,
                        payload: 'E-mail informado não corresponde a um usuário válido.'
                    })
                }
            })
    }
}

const adicionaContatoErro = (dispatch, erro) => (
    dispatch({
        type: ADICIONA_CONTATO_ERRO,
        payload: erro
    })
);
const adicionaContatoSucesso = (dispatch) => (
    dispatch({ type: ADICIONA_CONTATO_SUCESSO, payload: 'Contato adicionado com sucesso!' })
);

export const zerarStates = () => {
    return{
        type: ZERAR_STATES
    }
}


export const contatosUsuarioFetch = () => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email)

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on('value', (snapshot) => {
                contatosUsuarioFetchSucesso(dispatch, snapshot);
            })
    }

}

const contatosUsuarioFetchSucesso = (dispatch, snapshot) => {
    dispatch({type: LISTA_CONTATO_USUARIO, payload: snapshot.val()})
}

export const modificaMensagem = (msg) => {
    return {
        type: MODIFICA_MENSAGEM,
        payload: msg
    }
}

export const enviaMensagem = (msg, contatoNome, contatoEmail) => {
    const {currentUser} = firebase.auth();
    const usuarioEmail = currentUser.email;

    return (dispatch) => {
       let userEmailB64 = b64.encode(usuarioEmail);
       let contatoEmailB64 = b64.encode(contatoEmail);

       firebase.database().ref(`/mensagens/${userEmailB64}/${contatoEmailB64}`)
        .push({ mensagem: msg, tipo: 'e' })
        .then(() => {
            firebase.database().ref(`/mensagens/${contatoEmailB64}/${userEmailB64}`)
                .push({ mensagem: msg, tipo: 'r' })
                .then(() => enviaMensagemSucesso(dispatch))
        })
        .then(() => { //armazenar o cabeçalho da conversa do usuario autenticado
            firebase.database().ref(`/usuario_conversas/${userEmailB64}/${contatoEmailB64}`)
                .set({ nome:contatoNome, email: contatoEmail})
        })
        .then(() => { //armazenar o cabeçalho da conversa do contato
            firebase.database().ref(`/contatos/${userEmailB64}`)
                .once('value')
                .then((snapshot) => {
                    const dadosUsuario = _.values(snapshot.val());

                    firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${userEmailB64}`)
                        .set({ nome: dadosUsuario[0].nome, email: usuarioEmail})
                })
        })
        .catch((err) => alert(err));
        
    }
}

export const enviaMensagemSucesso = (dispatch) => {
    dispatch({type: ENVIA_MENSAGEM_SUCESSO})
}

export const conversaUsuarioFetch = (contatoEmail) => {
    const {currentUser} = firebase.auth();
    const usuarioEmail = currentUser.email;

    return (dispatch) => {
        let userEmailB64 = b64.encode(usuarioEmail);
        let contatoEmailB64 = b64.encode(contatoEmail); 

        firebase.database().ref(`/mensagens/${userEmailB64}/${contatoEmailB64}`)
            .on('value', (snapshot) => {
                dispatch({
                    type: LISTA_CONVERSA_USUARIO,
                    payload: snapshot.val()
                })
            })
            
    }
}

export const conversasUsuarioFetch = () => {
    return (dispatch) => {
        let { currentUser } = firebase.auth();
        let userEmailB64 = b64.encode(currentUser.email);
        console.lo

        firebase.database().ref(`/usuario_conversas/${userEmailB64}`)
            .on('value', (snapshot) => {
                dispatch({
                    type: CONVERSAS_USUARIO_FETCH,
                    payload: snapshot.val()
                });
            })
    }
}