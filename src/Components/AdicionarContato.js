import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Button, Text, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import AppReducer from '../Reducers/AppReducer';
import { modificaEmail, adicionaContato } from '../actions/AppAction';

class AdicionarContato extends Component {
    _adicionaContato = () => {
        if(this.props.loadingAdcContatoErro){
            return (
                    <ActivityIndicator size='large' /> 
            );
        }
        return (
                <Button color='#115E54' title='Adicionar' onPress={ () => this.props.adicionaContato(this.props.txtAdcContato)} />
        )
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'center'}} >
                    <TextInput 
                        placeholder='E-mail do contado' 
                        style={{fontSize: 20, height: 45}}
                        value={this.props.txtAdcContato}
                        onChangeText={(value) => this.props.modificaEmail(value)}
                    />
                </View>
    
                <View style={{flex: 1}} >
                    {this._adicionaContato()}
                    <Text style={{fontWeight: 'bold',color:'#FF0000', fontSize: 18}}>{this.props.adcContatoErro} </Text> 
                    <Text style={{fontWeight: 'bold',color:'#008000', fontSize: 18}}>{this.props.msgAdcContatoSucesso} </Text> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    }
});

mapStateToProps = (state) => (
    {
        txtAdcContato: state.AppReducer.txtAdcContato,
        adcContatoErro: state.AppReducer.adcContatoErro,
        loadingAdcContatoErro: state.AppReducer.loadingAdcContatoErro,
        msgAdcContatoSucesso: state.AppReducer.msgAdcContatoSucesso
    }
)

export default connect(mapStateToProps, {modificaEmail, adicionaContato})(AdicionarContato);