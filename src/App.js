import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'
import Routes from './Components/Routes';
import reducers from './Reducers';

class App extends Component {

    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Setting a timer'];
    }

    componentWillMount () {
        // Initialize Firebase
        let config = {
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: ""
        };
        firebase.initializeApp(config);
    }

    render () {
        return(
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
                <Routes />
            </Provider>
        );
    }
}

export default App;