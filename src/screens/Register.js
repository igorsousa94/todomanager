import React, {Component} from 'react';
import { Button, Image, KeyboardAvoidingView, StyleSheet, TextInput, View, Text, Alert } from 'react-native';
import { createUserOnFirebaseAsync } from '../services/FirebaseApi';

const img = require('../assets/TodoList.png');

export default class Register extends Component {

    static navigationOptions = {
        title: 'Register'
    };

    state = {
        email: '',
        password: ''
    }

    async _createUserAsync() {
        try {
            const user = await createUserOnFirebaseAsync(this.state.email,this.state.password);
            Alert.alert('User Created!', 
                `User ${user.email} has succesfuly been created!`, 
                [{
                    text: 'OK', onPress: () => {
                        this.props.navigation.goBack();
                    }
                }]);
        } catch (error) {
            Alert.alert('Create User Failed!', error.message);
        }
    }

    render(){
        return (
            <KeyboardAvoidingView style={style.container} behavior="padding">
                <View style={style.topView}>
                    <Image style={style.img} source={img}/>
                    <Text style={style.title}>Registering new user</Text> 
                </View>
                <View style={style.bottomView}>
                    <TextInput 
                        style={style.input} 
                        placeholder="Email"
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        onChangeText={(email) => {
                            this.setState({email})
                        }}
                    />
                    <TextInput 
                        style={style.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(password) => {
                            this.setState({password})
                        }}
                    />
                    <Button 
                        title="Register User" 
                        onPress={() => {this._createUserAsync()}}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    topView: {
        flex: 0.20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25
    },
    img: {
        width: 50,
        height: 50,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    bottomView: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
    },
    input: {
        marginBottom: 20
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:  20
    },
    textRegister: {
        fontWeight: 'bold'
    },
});