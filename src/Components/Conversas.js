import React, {Component} from 'react';
import {View, ListView, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';

import {conversasUsuarioFetch} from '../actions/AppAction';
import ConversasUsuarioReducer from '../Reducers/ConversasUsuarioReducer';
import {Actions} from 'react-native-router-flux';

class Conversas extends Component {

    componentWillMount(){
        this.props.conversasUsuarioFetch();

        this.criaFonteDeDados(this.props.conversas);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.conversas);
    }


    criaFonteDeDados(conversas) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 });
    
        this.fonteDeDados =  ds.cloneWithRows(conversas);
    }

    renderRow(contato) {
        return(
            <TouchableHighlight
                onPress={() => Actions.Conversa({
                    contatoNome: contato.nome, 
                    contatoEmail: contato.email,
                    title: contato.nome //titulo do navbar sobrescrito
                })}
            >
                <View style={styles.listView} >
                    <Text style={{fontSize: 25}} >{contato.nome} </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <ListView
                    enableEmptySections 
                    dataSource={this.fonteDeDados}
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
    const conversas = _.map(state.ConversasUsuarioReducer, (val, uid) => {
        return {...val, uid}
    })

   return {
    conversas: conversas
   }
}

export default connect(mapStateToProps, {conversasUsuarioFetch})(Conversas) ;