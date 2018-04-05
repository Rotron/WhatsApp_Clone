import React, { Component} from 'react';
import {View, Text, ListView ,TextInput, StyleSheet, Image, TouchableHighlight} from 'react-native';
import _ from 'lodash';

import {connect} from 'react-redux';
import {modificaMensagem, enviaMensagem, conversaUsuarioFetch } from '../actions/AppAction';
const enviarMSG = require('../imgs/enviar_mensagem.png');

class Conversa extends Component {
    componentWillMount() {
        const { contatoEmail, conversa} = this.props;

        this.props.conversaUsuarioFetch(contatoEmail);
        this.criaFonteDeDados(conversa);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.contatoEmail != nextProps.contatoEmail){
            this.props.conversaUsuarioFetch(nextProps.contatoEmail)
        }

        this.criaFonteDeDados(nextProps.conversa);
    }

    criaFonteDeDados(conversa){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    
        this.dataSource = ds.cloneWithRows(conversa)
    }
    _enviaMensagem(){
        const { mensagem,  contatoNome, contatoEmail} = this.props;
        
        this.props.enviaMensagem(mensagem,  contatoNome, contatoEmail);
    }

    renderRow(texto){
        if(texto.tipo === 'e'){
            return(
                <View style={{alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40}} >
                    <Text style={{fontSize:18, color: '#000', padding: 10, backgroundColor: '#DBF5D4', elevation: 1}} >{texto.mensagem}</Text>
                </View>
            );
        }

        return(
            <View style={{alignItems: 'flex-start', marginHorizontal: 5, marginRight: 40}} >
                <Text style={{fontSize:18, color: '#000', padding: 10, backgroundColor: '#F7F7F7', elevation: 1}} >{texto.mensagem}</Text>
            </View>
        );
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={{flex: 1, paddingBottom: 20}} >
                    <ListView
                        enableEmptySections 
                        dataSource={this.dataSource}
                        renderRow={(data) => this.renderRow(data)}
                    />
                
                </View>

                <View style={{height:60, flexDirection: 'row'}} >
                    <TextInput
                        value={this.props.mensagem}
                        placeholder='Digite aqui...'
                        onChangeText={(value) => this.props.modificaMensagem(value)} 
                        style={{flex:4, backgroundColor: '#FFF', fontSize:18, borderWidth:1}}
                    />

                    <TouchableHighlight
                        onPress={() => this._enviaMensagem()}
                        underlayColor='#FFF'
                    >
                        <Image source={enviarMSG} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 50,
        backgroundColor: '#EEE4DC',
        padding: 10,
    }
});

mapStateToProps = (state) => {
    let conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return {...val, uid}
    })

    return {
        mensagem: state.AppReducer.mensagem,
        conversa: conversa
    }
}

export default connect(mapStateToProps,{conversaUsuarioFetch, modificaMensagem, enviaMensagem })(Conversa);