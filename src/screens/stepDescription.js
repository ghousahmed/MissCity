import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import DescView from './descriptionView'
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, ScrollView, FlatList,ActivityIndicator } from 'react-native';
import firebase from '../config/Firebase/Firebase'
import { Constants } from 'expo'

// var data = require('./test-project-87320-export.json');

class StepDesc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rootes: [],
            data: ""
        }
    }
    componentDidMount() {
        firebase.database().ref('/').on('value', (data) => {
            console.log(data.val())
            let filter = Object.keys(data.val().routes).filter(ans => data.val().routes[ans].city === this.props.Roote)
            this.setState({
                data: data.val(),
                rootes: filter
            })
        })
    }
    render() {
        let { data } = this.state;
        return (
            data === "" ?
            <View style={styles.container}><ActivityIndicator size="large" color="#fe5960" /></View>
            :
            <ImageBackground style={{
                flex: 1, justifyContent: "center",
            }}
            // source={require("./searchRoad.jpg")}
            >
                <View style={{
                    flex: 1, width: "100%",
                    justifyContent: "center",
                }}
                >
                    <View style={{ flex: 2 }}>
                        <View style={{ flex: 4 }}>
                            <Image source={{ uri: this.props.stepDesc.imageUrl }} style={{
                                width: '100%', height: '100%',
                                resizeMode: 'cover'
                            }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: 30, width: '100%', backgroundColor: '#fe5960',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: '#fff', fontWeight: '700',
                                    letterSpacing: 1, fontSize: 16
                                }}>
                                    {this.props.stepDesc.city}City </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 3, marginVertical: 5 }}>

                        <DescView height={33} title='Title' detail={this.props.stepDesc.title} />
                        <DescView height={33} title='street' detail={this.props.stepDesc.street} />
                        <DescView height={33} title='Step Number' detail={this.props.stepDesc.number} />
                        <DescView height={33} title='zip' detail={this.props.stepDesc.zip} />
                        <DescView height={72} title='Step To Step Tipp' detail={this.props.stepDesc.stepToStepTipp} />
                        <DescView height={72} title='Description' detail={this.props.stepDesc.description} />

                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', marginHorizontal: 5, marginBottom: 6, }}>
                            <TouchableOpacity
                            onPress={()=>Actions.Maps()}
                                style={{
                                    height: 41, width: '100%', backgroundColor: '#fe5960',
                                    justifyContent: "center", alignItems: 'center',
                                }}>
                                <Text style={{
                                    color: '#fff', fontWeight: '700',
                                    letterSpacing: 1, fontSize: 16
                                }}>
                                    Start Ride </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </ImageBackground >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
      },
})
export default StepDesc