/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Style from './Style';
import * as firebase from "firebase";

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

firebase.initializeApp({
    apiKey: "AIzaSyAHkWCDexnsrLvi5YBq-3aW-eJE4DRycgw",
    authDomain: "fir-example-70bc0.firebaseapp.com",
    databaseURL: "https://fir-example-70bc0.firebaseio.com",
    projectId: "fir-example-70bc0",
    storageBucket: "fir-example-70bc0.appspot.com",
    messagingSenderId: "360218722138"
});



export default class FirebaseReactNative extends Component {
  render() {
    return (
      <View style={Style.container}>
        <Text style={Style.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={Style.instructions}>
          To get started, edit 
        </Text>
        <Text style={Style.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
  async signup(email, pass) {

    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, pass);

        console.log("Account created");

        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
        console.log(error.toString())
    }

}
async login(email, pass) {
    
    try {
        await firebase.auth()
            .signInWithEmailAndPassword(email, pass);

        console.log("Logged In!");

        // Navigate to the Home page

    } catch (error) {
        console.log(error.toString())
    }

}
async logout() {

    try {

        await firebase.auth().signOut();

        // Navigate to login view

    } catch (error) {
        console.log(error);
    }

}


}

AppRegistry.registerComponent('FirebaseReactNative', () => FirebaseReactNative);
