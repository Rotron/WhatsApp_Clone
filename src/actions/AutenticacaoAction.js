import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import b64 from 'base-64';

import {
    MODIFICA_EMAIL, 
    MODIFICA_NOME,
    MODIFICA_SENHA,
    CADASTRO_USUARIO_ERRO,
    CADASTRO_USUARIO_SUCESSO,
    AUTENTICA_USUARIO_ERRO,
    AUTENTICA_USUARIO_SUCESSO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO
} from './types'

export const modificaEmail =  (email) => {
    return {
        type: MODIFICA_EMAIL,
        payload: email
    };
}

export const modificaSenha =  (senha) => {
    return {
        type: MODIFICA_SENHA,
        payload: senha
    };
}

export const modificaNome =  (nome) => {
    return {
        type: MODIFICA_NOME,
        payload: nome
    };
}

/* Criar usuário */

export const cadastraUsuario = ({nome, email, senha}) => {
    return  dispatch => {
        dispatch({type: CADASTRO_EM_ANDAMENTO})
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then( user => {
                let emailb64 = b64.encode(email);

                firebase.database().ref(`/contatos/${emailb64}`)
                    .push(
                        {
                            nome: nome
                        }
                    ).then((value) => 
                        cadastroUsuarioSucesso(dispatch)
                    ); 
            })
            .catch( err => cadastroUsuarioErro(err, dispatch) );
    }
    
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch( { type: CADASTRO_USUARIO_SUCESSO});
    Actions.BoasVindas();
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch( { type: CADASTRO_USUARIO_ERRO, payload: erro.message});
}

/* Autenticação de usuário */

export const autenticarUsuario = ({email, senha}) => {
    return (dispatch) => {
        dispatch({type: LOGIN_EM_ANDAMENTO})

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((user)=> autenticarUsuarioSucesso(dispatch))
        .catch((err) => autenticarUsuarioErro(err, dispatch) );
    }
}

const autenticarUsuarioSucesso = (dispatch) => {
    dispatch({type: AUTENTICA_USUARIO_SUCESSO})
    
    Actions.Inicio();
}

const autenticarUsuarioErro = (err, dispatch) => {
    dispatch({type: AUTENTICA_USUARIO_ERRO, payload: err.message})
}