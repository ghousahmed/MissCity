import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Inbox from './Inbox'
import Button from './Button'
import firebase from '../config/Firebase/Firebase'
import {
    StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, ScrollView,
    ActivityIndicator, BackHandler,
} from 'react-native';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password1: '',
            error: '',
            loader: false
        }
    }
    signInUser = (data) => {
        this.setState({ error: '' })
        if (data.email === '' || data.password1 === ''
        ) {
            this.setState({ error: 'All fields are required' })
        }
        else {
            this.setState({ loader: true })
            firebase.auth().signInWithEmailAndPassword(data.email, data.password1).then((data) => {
                Actions.Home()
                this.setState({
                    email: '',
                    password1: '',
                    error: '',
                    loader: false
                })
            })
                .catch((err) => {
                    this.setState({ error: err.message, loader: false })
                })
        }
    }
    componentDidMount() {
        console.log(Actions.currentScene)
        if (Actions.currentScene === 'Signin') {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp()
            });
        }
    }
    render() {
        return (
            <View style={{ height: "100%", width: '100%',backgroundColor: '#fff'}}
               
            >
                <ScrollView>
                    <View style={{ height: 212, justifyContent: "center", alignItems: "center", marginTop: "15%" }}>
                        <Image
                            style={{ height: 212, width: '60%', resizeMode: "contain", }}
                            source={require("../assets/img/logo.png")} />
                    </View>
                    <Inbox placeholder='User Email'
                        value={this.state.email}
                        onChange={(text) => { this.setState({ email: text }) }}
                        iconName='envelope-o' />

                    <Inbox placeholder='  Password'
                        value={this.state.password1}
                        onChange={(text) => { this.setState({ password1: text }) }}
                        iconName='lock' secure={true} />

                    <Button btnText='Sign In'
                        onBtnPress={() => this.signInUser(this.state)}
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
                            onPress={() => Actions.Singup()} >
                            <Text style={{
                                color: '#fe5960', fontWeight: 'bold', marginTop: 10, fontSize: 16
                            }}>Create an account</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} >
                        <TouchableOpacity
                            onPress={() => {
                                let email = this.state.email
                                let that = this
                                firebase.auth().sendPasswordResetEmail(this.state.email).then(function () {
                                    console.log("dasdasdasdas")
                                    Actions.ForgetPassword({ userEmail: email })
                                }).catch(function (error) {
                                    that.setState({ error: error.message, loader: false })
                                    console.log(error.message)
                                })
                            }
                            }
                        >
                            <Text style={{
                                color: '#fe5960', fontWeight: 'bold', marginTop: 10, textDecorationLine: "underline",
                                textDecorationColor: '#fe5960'
                            }}>Forget Password</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({

})
export default SignIn