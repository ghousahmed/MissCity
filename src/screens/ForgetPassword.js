import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Inbox from './Inbox'
import Button from './Button'
import firebase from 'firebase'
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';


class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            error: ''
        }
    }
    updatePassword = () => {
        this.setState({error : ''})
        firebase.auth().signInWithEmailAndPassword(this.props.userEmail, this.state.newPassword)
            .then((data) => {
                // // Actions.Menu()
                // this.setState({
                //     email: '',
                //     password1: '',
                //     error: '',
                //     loader: false
                // })
            })
            .catch((err) => {
                this.setState({ error: err.message, loader: false })
            })
    }
    render() {
        return (
            <View style={{
                flex: 1, justifyContent: "center", backgroundColor: "#94ecf9"
            }}>
                <View style={{ justifyContent: "center", alignItems: "center",  marginHorizontal: "8%" }}>
                    <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>
                        New Password
                    </Text>
                    <Text style={{ color: "red", textAlign: "center" , marginVertical  : "2%" }}> Please set password in email link and add new password
                     </Text>
                </View>

                <View style = {{marginHorizontal : "8%"}}>
                    <Inbox placeholder='Password'
                        onChange={(text) => { this.setState({ newPassword: text }) }}
                        iconName='lock' secure={true} />
                </View>
                <View style={{ marginHorizontal: "8%" }}>
                    <Button btnText='Sign In'
                        onBtnPress={() => this.updatePassword()}
                    />
                </View>
                {
                    (this.state.error !== '') ? (
                        <Text style={{ color: "red", textAlign: "center" }}> {this.state.error} </Text>
                    ) : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
export default ForgetPassword