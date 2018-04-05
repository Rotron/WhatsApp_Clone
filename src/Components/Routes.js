import React from 'react';
import {Scene, Router} from 'react-native-router-flux';

import Principal from './Principal';
import FormCadastro from './FormCadastro';
import BoasVindas from './BoasVindas';
import Inicio from './Inicio';
import AdicionarContatos from './AdicionarContato';
import Conversa from './Conversa';

export default Routes = (props) => {
    return(
     <Router navigationBarStyle={{backgroundColor: '#115E54'}} titleStyle={{color: '#FFF'}} >
        <Scene key='Login' component={Principal}  title='Login'  hideNavBar />
        <Scene key='Cadastrar' component={FormCadastro} title='Cadastro' hideNavBar={false} />
        <Scene key='BoasVindas' component={BoasVindas} title='Bem-vindo' hideNavBar />
        <Scene key='Inicio' component={Inicio} title='Inicio' hideNavBar />
        <Scene key='AdicionarContato' component={AdicionarContatos} title='Adicionar Contato' hideNavBar={false} />
        <Scene key='Conversa' component={Conversa} title='Conversa' hideNavBar={false} />
    
    </Router> 
    );
}


