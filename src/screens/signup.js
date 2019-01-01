import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Inbox from './Inbox'
import Button from './Button'
import firebase from '../config/Firebase/Firebase'
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password1: '',
            password2: '',
            error: '',
            loader: false
        }
    }
    signUpUser = (data) => {
        if (data.userName === '' || data.email === '' || data.password1 === ''
            || data.password1 === '') {
            this.setState({ error: 'All fields are required' })
        } else if (data.password1 !== data.password2) { this.setState({ error: 'Password do not match' }) }
        else {
            this.setState({ loader: true })
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password1).then((data) => {
                Actions.Signin()
                this.setState({
                    userName: '',
                    email: '',
                    password1: '',
                    password2: '',
                    error: '',
                    loader: false
                })
            })
                .catch((err) => {
                    this.setState({ error: err.message, loader: false })
                })
        }
    }
    render() {
        return (
            <View style={{ flex: 1 ,backgroundColor: '#fff'}}
            >
                <ScrollView>
                    <View style={{
                        justifyContent: "center", alignItems: "center",
                        height: 212, width: '100%',
                    }}>
                        <Image
                            style={{ height: 212, width: '60%', resizeMode: "contain", }}
                            source={require("../assets/img/logo.png")} />

                    </View>
                    <Inbox placeholder='User Name'
                        value={this.state.userName}
                        onChange={(text) => { this.setState({ userName: text }) }}
                        iconName='user' />
                    <Inbox placeholder='User Email'
                        value={this.state.email}
                        onChange={(text) => { this.setState({ email: text }) }}
                        iconName='envelope-o' />
                    <Inbox placeholder='Password'
                        value={this.state.password1}
                        onChange={(text) => { this.setState({ password1: text }) }}
                        iconName='lock' secure={true} />
                    <Inbox placeholder='Confirm Password'
                        value={this.state.password2}
                        onChange={(text) => { this.setState({ password2: text }) }}
                        iconName='lock' secure={true} />
                    <Button btnText='Sign Up'
                        onBtnPress={() =>
                            this.signUpUser(this.state)
                        }
                    />
                    {
                        this.state.loader === true ?
                            <ActivityIndicator size="large" color="#fe5960" /> :
                            null
                    }
                    {
                        (this.state.error !== '') ? (
                            <View style={{backgroundColor: '#fff', marginRight: 23,marginLeft: 23,padding: 3,}}><Text style={{ color: "red", textAlign: "center" }}> {this.state.error} </Text></View>
                        ) : null
                    }

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} >
                        <TouchableOpacity
                            onPress={() =>
                                Actions.Signin()
                            }
                        >
                            <Text style={{
                                color: '#fe5960', fontWeight: 'bold', marginTop: 10
                            }}>Already have an account</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({

})
export default SignUp