import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ImageBackground,
  Image,
  ActivityIndicator
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoAction';

const bg = require('../imgs/bg.png');

class Principal extends Component {
  _autenticarUsuario() {
    const { email, senha } = this.props

    this.props.autenticarUsuario({email, senha});
  }

  renderBtnAcessar () {
    if(this.props.loadingLogin){
      return(<ActivityIndicator size='large' />);
    }
    return(
      <Button title='Entrar' color='#115E54' onPress={() => this._autenticarUsuario()} />
    );
  }

  render() {
    return (
      <Image style={styles.container} source={bg} >
            <View style={styles.topo}>
              <Text style={styles.txtTopo}>
                WhatsApp Clone
              </Text> 
            </View>

            <View style={styles.centro}>
              <TextInput 
                value={this.props.email}  
                style={{fontSize: 20, height: 45}} 
                placeholder='E-mail' 
                placeholderTextColor='#fff' 
                onChangeText={ (value) => this.props.modificaEmail(value) } 
              />
              <TextInput 
                value={this.props.senha} 
                secureTextEntry  
                style={{fontSize: 20, height: 45}} 
                placeholder='Senha' 
                placeholderTextColor='#fff' 
                onChangeText={ (value) => this.props.modificaSenha(value) } 
              />
               <Text style={{fontWeight: 'bold',color:'#fbcaca', fontSize: 18}}> {this.props.erroAutenticacao} </Text>

              <TouchableHighlight  onPress={() => Actions.Cadastrar()} activeOpacity={0.3} underlayColor='#115E54'>
                <Text style={{fontSize: 20, color: '#FFF'}}>Ainda não tem cadastro? Cadastre-se </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.bottom}>
              {this.renderBtnAcessar()}
            </View>
        
      </Image>
    );
  }
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: null, height: null
    
  },
  txtTopo: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#FFF'
  },
  topo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  centro: {
    flex: 2,
    padding: 8
  },
  bottom: {
    flex: 2
  }
});

const mapStateToProps = (state) => (
  {
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroAutenticacao: state.AutenticacaoReducer.erroAutenticacao,
    loadingLogin: state.AutenticacaoReducer.loadingLogin
  }
)



export  default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(Principal);

