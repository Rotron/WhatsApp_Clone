import React from 'react';
import {View, Text, StatusBar, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import firebase from 'firebase';

import { zerarStates } from '../actions/AppAction';
const adcContato = require('../imgs/adicionar-contato.png');

const TabBarMenu = (props) => {
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor= '#114D44' />

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{height: 50, justifyContent: 'center'}}>
                    <Text style={{color: '#FFF', fontSize: 20, marginLeft: 20}} >WhatsApp Clone </Text>
                </View>

                <View style={{flexDirection: 'row', marginRight: 20}}>
                    <View style={{justifyContent: 'center', alignItems: 'center' ,width: 50}} >
                        <TouchableHighlight 
                            onPress={() => {Actions.AdicionarContato(); props.zerarStates()}}
                            underlayColor='#114D44'
                        >
                            <Image source={adcContato} />
                        </TouchableHighlight>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <TouchableHighlight
                            onPress={() => firebase.auth().signOut()
                                .then(() => Actions.Login())
                            }
                        >
                            <Text style={{color: '#FFF', fontSize: 20}} >Sair</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

            <TabBar {...props} style={{backgroundColor:'#115E54', elevation: 0}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#115E54',
        elevation: 4,
        marginBottom: 6,
    },
    
});

export default connect(null, {zerarStates})(TabBarMenu);