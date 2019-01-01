import React, { Component } from 'react';
import Button from './Button'
import {
    StyleSheet, View, Image, Text, TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux'

class Thankyou extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ height: 212, width: '60%', resizeMode: "contain", }}
                    source={require("../assets/img/thankyou.png")} />
                <View>
                    <Button btnText='Go To Home'
                        onBtnPress={() => Actions.Home()} />
                </View>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff'
    },
})
export default Thankyou