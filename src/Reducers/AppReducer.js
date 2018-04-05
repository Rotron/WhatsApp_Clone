import { 
    MODIFICA_ADICIONA_CONTATO,
    ADICIONA_CONTATO_SUCESSO,
    ADICIONA_CONTATO_ERRO,
    ADC_CONTATO_LOADING,
    ZERAR_STATES,
    MODIFICA_MENSAGEM,
    ENVIA_MENSAGEM_SUCESSO
} from '../actions/types';

const INITAL_STATE = {
    txtAdcContato: '',
    adcContatoErro: '',
    loadingAdcContatoErro: false,
    msgAdcContatoSucesso: '',
    mensagem: ''
};

export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_ADICIONA_CONTATO:
            return {...state, txtAdcContato: action.payload}
        case ADICIONA_CONTATO_ERRO:
            return {...state, adcContatoErro: action.payload, msgAdcContatoSucesso: '', loadingAdcContatoErro: false}
        case ADICIONA_CONTATO_SUCESSO:
            return {...state, loadingAdcContatoErro: false, msgAdcContatoSucesso: action.payload}
        case ADC_CONTATO_LOADING:
            return {...state, loadingAdcContatoErro: true}
        case ZERAR_STATES:
            return {
                ...state, 
                loadingAdcContatoErro: false,
                txtAdcContato: '',
                adcContatoErro: '',
                msgAdcContatoSucesso: ''
            }
        case MODIFICA_MENSAGEM:
            return {...state, mensagem: action.payload}
        case ENVIA_MENSAGEM_SUCESSO:
            return {...state, mensagem: ''}
        default:
            return state;
    }
}