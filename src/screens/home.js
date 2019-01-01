import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Button from './Button'
import Inbox from './Inbox'
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, ScrollView, FlatList,ActivityIndicator } from 'react-native';
import firebase from '../config/Firebase/Firebase'
import { Constants } from 'expo'

// var data = require('./test-project-87320-export.json');


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seacrh: "",
            data: ""
        }
    }

    componentDidMount() {
        firebase.database().ref('/').on('value', (data) => {
            console.log(data.val())
            this.setState({
                data: data.val()
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
                flex: 1,
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
                    <View style={{ flex: 2, marginHorizontal: '5%' }}>
                        <FlatList
                            data={Object.keys(data.city)}
                            style={{
                                flex: 1,
                            }}
                            renderItem={({ item }
                            ) => {
                                console.log(item)
                                return (
                                    <TouchableOpacity
                                        style={styles.containerStyle}
                                        onPress={() => { Actions.Roote({ Roote: item }) }}   >
                                        <Text style={{
                                            fontSize: 18, fontWeight: '600', marginLeft: '2%',
                                            marginVertical: '1%'
                                        }}>
                                            {data.city[item].name} </Text>
                                        <Text style={{ fontSize: 15, marginLeft: '2%', marginBottom: '2%' }}>
                                            {data.city[item].description}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                
                {/* <TouchableOpacity
                        style={{
                            height: 112, width: "95%", borderColor: "#bfdaf9",
                            borderWidth: 2, borderRadius: 7, backgroundColor: "#fff",
                            flexDirection: "row", borderColor: "#ffbbcb", borderWidth: 1
                        }}
                        onPress={() => { Actions.Menu() }}   >
                        <View style={{
                            flex: 1, justifyContent: "center",
                            alignItems: "center", padding: 12, borderColor: "#ffbbcb", borderWidth: 1
                        }}>
                            <Image
                                style={{ flex: 1, resizeMode: "contain", }}
                                source={require("./roadBabk.jpg")} />
                        </View>
                        <View style={{ flex: 3, flexDirection: "column", marginLeft: 2 }}>
                            <Text style={{ color: "#000", fontSize: 14, fontWeight: "700", flex: 1, }}
                            >Go To Menu </Text>
                            <Text style={{ color: "#000", fontSize: 10, fontWeight: "700", flex: 1 }}
                            >Go To Menu </Text>
                            <Text style={{ color: "#000", fontSize: 12, flex: 4, marginTop: 3, marginLeft: 2 }}
                            >dasddas dasdasda dsadsadas dasdasdsa dasdsadas  dasdasdasd  dsadsadas dsadsadsa
                            dasdasass </Text>
                        </View>
                    </TouchableOpacity> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        width: "100%",
        justifyContent: 'center',
        elevation: 7,
        height: 80,
        backgroundColor: "#fff",
        marginVertical: '2%',

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
      },
})
export default Home