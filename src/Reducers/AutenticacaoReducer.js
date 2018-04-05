import {
    MODIFICA_EMAIL, 
    MODIFICA_NOME, 
    MODIFICA_SENHA,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    AUTENTICA_USUARIO_SUCESSO,
    AUTENTICA_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO
} from '../actions/types';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: '',
    erroAutenticacao: '',
    loadingLogin: false,
    loadingCadastro: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_NOME:
            return {...state, nome: action.payload}
        case CADASTRO_USUARIO_SUCESSO:
            return {...state, nome: '', senha: ''}
        case CADASTRO_USUARIO_ERRO:
            return {...state, erroCadastro: action.payload, loadingCadastro: false}
        case AUTENTICA_USUARIO_SUCESSO:
            return {...state,  ...INITIAL_STATE} //o state é retornado para o estado inicial
        case AUTENTICA_USUARIO_ERRO:
            return {...state, erroAutenticacao: action.payload, loadingLogin: false}
        case LOGIN_EM_ANDAMENTO:
            return {...state, loadingLogin: true}    
        case CADASTRO_EM_ANDAMENTO:
            return {...state, loadingCadastro: true}    
        default:
            return state;
    }

    
}