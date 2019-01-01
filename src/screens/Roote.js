import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, ScrollView, FlatList,ActivityIndicator } from 'react-native';
import Inbox from './Inbox'
import firebase from '../config/Firebase/Firebase'
import { Constants } from 'expo'

// var data = require('./test-project-87320-export.json');

class Roots extends Component {
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
            <View style={{
                flex: 1, justifyContent: "center",
                backgroundColor: '#fff'
            }} >
            <View style={{
                    flex: 0.5,
                    justifyContent: "center",
                }}
                >
                    <Inbox placeholder='Search'
                        value={this.state.seacrh}
                        onChange={(text) => { this.setState({ seacrh: text }) }}
                        iconName='search' />
                </View>
                <View style={{
                    flex: 3, marginHorizontal: '3%',
                    marginTop: 10
                }}>
                    {
                        this.state.rootes.length !== 0 ?
                            <FlatList
                                data={this.state.rootes}
                                renderItem={({ item }
                                ) => {
                                    console.log(item)
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                height: 121, width: "100%", borderColor: "#bfdaf9",
                                                borderWidth: 2, borderRadius: 7, backgroundColor: "#fff",
                                                flexDirection: "row", borderColor: "#ffbbcb", borderWidth: 1,
                                                marginVertical: 5
                                            }}
                                            onPress={() => { Actions.Steps({ steps: data.routes[item].steps }) }}   >
                                            <View style={{
                                                flex: 1, justifyContent: "center",
                                                alignItems: "center", padding: 12, borderColor: "#ffbbcb", borderWidth: 1
                                            }}>
                                                <Image
                                                    style={{ flex: 2, resizeMode: "contain", }}
                                                    source={{ uri: data.routes[item].imageUrl }} />
                                            </View>
                                            <View style={{ flex: 3, flexDirection: "column", marginLeft: 2 }}>
                                                <Text style={{ color: "#000", fontSize: 14, fontWeight: "700", flex: 1, }}
                                                >{data.routes[item].title} </Text>
                                                <View style={{ flex: 1, flexDirection: "row" }}>

                                                    <View style={{ flexDirection: "row" }}>
                                                        {[...Array(3)].map((x, i) =>
                                                            <Icon name={"star"} size={20} key={i} style={{ marginHorizontal: 1 }} />
                                                        )}
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        {[...Array(2)].map((x, i) =>
                                                            <Icon name={"star-o"} size={20} key={i} style={{ marginHorizontal: 1 }} />
                                                        )}
                                                    </View>
                                                </View>

                                                <Text style={{ color: "#000", fontSize: 12, flex: 4, marginTop: 3, marginLeft: 2 }}
                                                >{data.routes[item].description}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                }}

                            />
                            :
                            <Text> Please Wait </Text>
                    }


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
        backgroundColor: '#ecf0f1',
      },
})
export default Roots