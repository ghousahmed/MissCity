
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
class StepButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clicked: false
        }
    }
    clickedButton = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    render() {
        return (
            <TouchableOpacity
                style={{
                    height: 112, width: '42%', backgroundColor: this.state.clicked ? '#c0c0c0' : '#fff',
                    borderColor: '#808080', borderRadius: 5, borderWidth: 1, marginHorizontal: 5,
                    justifyContent: "center", alignItems: 'center', margin: 6
                }}
                onPress={() => Actions.StepDesc({stepDesc : this.props.stepDesc})}   >
                <Image source={{ uri: this.props.imageUri }} style={{
                    width: '100%', height: '100%',
                    resizeMode: 'cover'
                }} />
                <View style={{
                    position: 'absolute', height: 25, top: 0,
                    backgroundColor: '#000', opacity: 0.6, width: '100%', 
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#fff' }}
                    >{this.props.btnText} </Text>
                </View>
                <View style={{
                    position: 'absolute', height: 25, bottom: 0,
                    backgroundColor: '#000', opacity: 0.6, width: '100%', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#fff' }}
                    >{this.props.title} </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
export default StepButton