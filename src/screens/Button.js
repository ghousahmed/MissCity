import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class Button extends Component {
    render() {
        return (
            <View style={styles.inputDiv}>

                <TouchableOpacity
                    style={styles.signUpBtn}
                    onPress={this.props.onBtnPress}   >
                    <Text style={styles.signUpBtnTxt}
                    >{this.props.btnText} </Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    inputDiv: {
        margin: 3,
        marginHorizontal : 24
        // paddingHorizontal: 8,
    },
    signUpBtn: {
        // marginRight: 21,
        // marginLeft:21,
        // marginTop: 10,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#fe5960',
        elevation: 3
    },
    signUpBtnTxt: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    }
})
export default Button