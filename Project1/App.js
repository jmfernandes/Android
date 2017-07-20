
import Style from './src/Style';
import InputButton from './src/InputButton';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';

// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
    ['C','CE','(',')'],
    ['abs','^2','sqrt','/'],
    [1, 2, 3, '*'],
    [4, 5, 6, '-'],
    [7, 8, 9, '+'],
    ['.',0,'+/-', '=']
];

//adding extra lines

export default class AwesomeProject extends Component {
      constructor(props) {
        super(props);

        this.state = {
            previousInputValue: null,
            inputValue: 0
        }
    }
    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.previousContainer}>
                    <Text style={Style.displayText}>{this.state.previousInputValue}</Text>
                </View>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

    /**
     * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
     */
    _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                    <InputButton
                      value={input}
                      onPress={this._onInputButtonPressed.bind(this, input)}
                      key={r + "-" + i} />
                );
            }


            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }


        return views;
    }
    // what is called
    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }
    //this is where the set state acts
    _handleNumberInput(num) {
            let inputValue = 0
        if (this.state.inputValue == 0 || String(this.state.inputValue).contains('NaN')){
            inputValue = String(num);
        }
        else{
            inputValue = String(this.state.inputValue) + String(num);
        }

        this.setState({
            inputValue: inputValue
        })
    }
    //
    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                if(['/','*','+','-'].indexOf(String(this.state.inputValue).slice(-1)) > -1){
                this.setState({
                    inputValue: this.state.inputValue.replace(/.$/,str)
                });
                }
                else{
                  this.setState({
                    inputValue: this.state.inputValue + str
                });
                }
                break;
            case '=':
                if (String((this.state.inputValue.match(/\(/) || []).length) != String((this.state.inputValue.match(/\)/) || []).length)){
                    Alert.alert("Uneven number of parenthesis")
                    return;
                }
                if(['/','*','+','-'].indexOf(String(this.state.inputValue).slice(-1)) > -1){
                    return;
                }
                let inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;
                let numarray = [this.state.inputValue.indexOf('*'),this.state.inputValue.indexOf('/'),this.state.inputValue.indexOf('+'),this.state.inputValue.indexOf('-')]
                if (Math.max.apply(Math, numarray) == -1) {
                    return;
                }

                this.setState({
                    previousInputValue: inputValue+' = '+String(eval(inputValue)),
                    inputValue: String(eval(inputValue))
                });

                break;
            case 'C':
                if (this.state.inputValue.length == 1 || this.state.inputValue == 0 || String(this.state.inputValue).contains('NaN') ){
                this.setState({
                    inputValue: 0
                })
                }
                else{
                this.setState({
                    inputValue: String(this.state.inputValue).substring(0, String(this.state.inputValue).length-1)
                })
                }
            break;
            case 'CE':
                    this.setState({
                    inputValue: 0
                })
            break;
            case '+/-':
                this.setState({
                    inputValue: this.state.inputValue * (-1.0)
                })
            break;
            case 'sqrt':
                this.setState({
                    inputValue: Math.sqrt(this.state.inputValue)
                })
            break;
            case '.':
                numarray = [this.state.inputValue.indexOf('*'),this.state.inputValue.indexOf('/'),this.state.inputValue.indexOf('+'),this.state.inputValue.indexOf('-')]

                if (!this.state.inputValue.substring(Math.max.apply(Math, numarray)+1, this.state.inputValue.length).includes("."))
                this.setState({
                    inputValue: this.state.inputValue + '.'
                })
            break;
            case '(':
                if (this.state.inputValue == 0 || String(this.state.inputValue).contains('NaN')){
                this.setState({
                    inputValue: '('
                })
                }
                else{
                    if (isNaN(String(this.state.inputValue).slice(-1))){
                this.setState({
                    inputValue: this.state.inputValue+'('
                })
                }
                else{
                this.setState({
                    inputValue: this.state.inputValue+'*('
                })
                }
                }
            break;
            case ')':
                if (this.state.inputValue == 0 || String(this.state.inputValue).contains('NaN')){
                this.setState({
                    inputValue: ')'
                })
                }
                else{
                this.setState({
                    inputValue: this.state.inputValue+')'
                })
                }
            break;
        }
    }


}
