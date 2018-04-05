import React, {Component} from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, ActivityIndicator } from 'react-native';

import {connect} from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../actions/AutenticacaoAction';

const bg = require('../imgs/bg.png');

class FormCadastro extends Component  {
    
    _cadastraUsuario (){
        const {nome, email, senha} = this.props;
        
        this.props.cadastraUsuario({nome, email, senha});
    }

    renderBtnCadastro () {
        if(this.props.loadingCadastro){
            return(<ActivityIndicator size='large' />)
        }
        return(
            <Button title='Cadastrar' color='#115E54' onPress = { () => this._cadastraUsuario()} />
        )
    }

    render () {
        return(
            <Image style={styles.container} source={bg} >
                <View style={styles.dados}>
                    <TextInput 
                        value={this.props.nome} 
                        placeholder='Nome' 
                        placeholderTextColor='#fff' 
                        style={{fontSize: 20, height: 45}} 
                        onChangeText = { (value) => this.props.modificaNome(value)} 
                    />
                    <TextInput 
                        value={this.props.email} 
                        placeholder='E-mail' 
                        placeholderTextColor='#fff' 
                        style={{fontSize: 20, height: 45}} 
                        onChangeText = { (value) => this.props.modificaEmail(value)} 
                    />
                    <TextInput 
                        secureTextEntry 
                        value={this.props.senha} 
                        placeholder='Senha' 
                        placeholderTextColor='#fff' 
                        style={{fontSize: 20, height: 45}} 
                        onChangeText = { (value) => this.props.modificaSenha(value)} 
                    />

                    <Text style={{fontWeight: 'bold', color:'#fbcaca', fontSize: 18}}>{this.props.erroCadastro} </Text>
                </View>
    
                <View style={styles.button}>
                    {this.renderBtnCadastro()}
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
    dados: {
        flex: 4,
        justifyContent: 'center',
    },
    button: {
        flex: 1
    }
});

const mapStateToProps = (state) => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loadingCadastro: state.AutenticacaoReducer.loadingCadastro
    }
)

export default connect(mapStateToProps, 
    {
        modificaEmail, 
        modificaSenha, 
        modificaNome, 
        cadastraUsuario
    })(FormCadastro);