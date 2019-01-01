
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
class DescView extends Component {
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
            <View style={{
                flexDirection: 'row', borderBottomColor: '#e0e0e0',
                borderBottomWidth: 1, marginHorizontal: '3%', height: this.props.height,
                alignItems: "center" , marginVertical : 1
            }}>
                <View style={{ flex: 1.5, }}>
                    <Text style={{
                        flex: 1, marginVertical: 3, fontWeight: "700", textAlign: "center",
                      borderRightColor: '#e0e0e0', borderRightWidth: 2 , padding : 1
                    }}>{this.props.title}</Text>
                </View>
                <View style={{ flex: 3 , }}>
                    <Text style={{ flex: 1, textAlign: 'left' , paddingLeft :8 }}>{this.props.detail}</Text>
                </View>
            </View>
        )
    }
}
export default DescView