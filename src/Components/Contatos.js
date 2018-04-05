import React, {Component} from 'react';
import {View, Text, StyleSheet, ListView, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

import { contatosUsuarioFetch } from '../actions/AppAction';

class Contatos extends Component {
    componentWillMount() {
        this.props.contatosUsuarioFetch();

        this.criaFonteDeDados(this.props.contatos);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.contatos);
    }

    criaFonteDeDados(contatos) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 });
    
        this.fonteDeDados =  ds.cloneWithRows(contatos);
    }


    renderRow(contato){
        return(
            <TouchableHighlight
                onPress={() => Actions.Conversa({ 
                    contatoNome: contato.nome, 
                    contatoEmail: contato.email,
                    title: contato.nome //titulo do navbar sobrescrito
                })}
            >
                <View style={styles.listView}>
                    <Text style={{fontSize: 25}} >{contato.email} </Text>
                    <Text style={{fontSize: 18}} >{contato.nome} </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return(
            <View style={styles.container}>
               <ListView
                    enableEmptySections 
                    dataSource = {this.fonteDeDados}
                    renderRow={(data) => this.renderRow(data)}
               />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    listView: {
        flex:1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#CCC',
    }
});

mapStateToProps = (state) => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return {...val, uid}
    })

    return {
        contatos: contatos
    }
}

export default connect(mapStateToProps, {contatosUsuarioFetch})(Contatos);