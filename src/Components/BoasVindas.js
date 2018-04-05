import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';

const logo = require('../imgs/logo.png');
const bg = require('../imgs/bg.png');

const BoasVindas = () =>  {
    return(
        <Image style={styles.container} source={bg} >
            <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}} >
                <Text style={{fontSize: 20, color: '#FFF'}}>Seja bem-vindo! </Text>
                <Image source={logo} />
            </View>   

            <View style={{flex:1}} >
                <Button title='Fazer login' onPress={ () => Actions.Login()} />
            </View> 
        </Image>
    );
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        width: null,
        height: null
    }
});

export default BoasVindas;