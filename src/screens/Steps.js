import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import StepButton from './stepButton'
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, ScrollView, FlatList ,ActivityIndicator} from 'react-native';
import firebase from '../config/Firebase/Firebase'
import { Constants } from 'expo'


// var data = require('./test-project-87320-export.json');

class Steps extends Component {
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
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 4 }}>
                            <Image source={{uri : this.props.steps[0].imageUrl}} style={{
                                width: '100%', height: '100%',
                                resizeMode: 'cover'
                            }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: 41, width: '100%', backgroundColor: '#fe5960',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: '#fff', fontWeight: '700',
                                    letterSpacing: 1, fontSize: 16
                                }}>
                                    Hamberg City </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, }}>
                        <View style={{
                            flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 4,
                            marginVertical: 12, justifyContent: 'center', alignItems: "center"
                        }}>
                            {
                                this.props.steps !== undefined ?
                                    this.props.steps.map((data, ind) => {
                                        return (
                                            <StepButton btnText={`Step ${ind + 1}`} stepDesc={data}
                                                title={data.title} imageUri={data.imageUrl} />
                                        )
                                    })
                                    :
                                    null
                            }
                            {/* <StepButton btnText='Step 2' title='city' imageUri='https://firebasestorage.googleapis.com/v0/b/test-project-87320.appspot.com/o/routes%2F-LQXq9ysO20RH5wBl_iF%2Fstep-0.jpg?alt=media&token=464e0709-ac7b-472e-9942-712ecc594d8b' />
                            <StepButton btnText='Step 3' title='city' imageUri='https://firebasestorage.googleapis.com/v0/b/test-project-87320.appspot.com/o/routes%2F-LQXq9ysO20RH5wBl_iF%2Fstep-0.jpg?alt=media&token=464e0709-ac7b-472e-9942-712ecc594d8b' />
                            <StepButton btnText='Step 4' title='city' imageUri='https://firebasestorage.googleapis.com/v0/b/test-project-87320.appspot.com/o/routes%2F-LQXq9ysO20RH5wBl_iF%2Fstep-0.jpg?alt=media&token=464e0709-ac7b-472e-9942-712ecc594d8b' /> */}
                        </View>
                    </View>
                    {/* <View style={{ flex: 3 }}>

                    </View> */}
                    {/*  */}

                </View>
            </ImageBackground>
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
export default Steps