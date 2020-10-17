import React, {Component, useState} from 'react';
import { Button, Image, KeyboardAvoidingView, StyleSheet, TextInput, View, Text, Alert } from 'react-native';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';
import {CommonActions} from '@react-navigation/native';

const img = require('../assets/TodoList.png');

export default class Login extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        //email: '',
        email: '',
        password: ''
    }

    async _signInAsync(){
         try {
            const user = await signInOnFirebaseAsync(this.state.email, this.state.password);
            Alert.alert(
                'User Authenticated',
                `User ${this.state.email} has succesfuly been authenticated!`,
            );
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'TaskList'}],
                }),
            );
         } catch (error) {
            Alert.alert('Login Failed', error.message);
         }
    }

    render (){
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.topView}>
                    <Image style={styles.img} source={img} />
                </View>
                <View style={styles.bottomView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={this.state.email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        onChangeText={text => this.setState({
                            email: text
                        })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={this.state.password}
                        //onChangeText={text => setPassword(text)}
                        onChangeText={text => this.setState({
                            password: text
                        })}
                    />
                    <Button 
                        title="Sign In" 
                        //onPress={() => signInAsync()}
                        onPress={() => this._signInAsync()} 
                    />
                    <View style={styles.textContainer}>
                        <Text>Not a member? Let's</Text>
                        <Text 
                            style={styles.textRegister}
                            onPress={() => {
                                //props.navigation.navigate('Register');
                                const { navigate } = this.props.navigation;
                                navigate('Register');
                            }}
                        > Register</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    };
    
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200,
    },
    bottomView: {
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