import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = '';

class Maps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coordinates: [],
      origin: "",
      isModalVisible: false,
      destination: ""
    };

    this.mapView = null;
    this.origin = ""
  }
  componentDidMount() {
    const getLocation = (position) => {
      let UpdatedLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.origin = UpdatedLocation;
      console.log("origin ==>", this.origin)
    }

    const location = Expo.Location.watchPositionAsync({
      enableHighAccuracy: true,
      timeInterval: 3000,
      distanceInterval: 2
    }, getLocation);
    console.log('location', location)
  }
  componentWillMount() {
    this._getLocationAsync()
  }

  _getLocationAsync = async () => {
    let { coordinates } = this.state
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let NavLocation = await Expo.Location.geocodeAsync('Port of Hamburg, Hamburg, Germany')
    let CurrentLocation = await Expo.Location.getCurrentPositionAsync({});
    let NavObj = {
      latitude: NavLocation[0].latitude,
      longitude: NavLocation[0].longitude
    }
    let CurrentObj = {
      latitude: CurrentLocation.coords.latitude,
      longitude: CurrentLocation.coords.longitude
    }
    this.origin = CurrentObj;
    this.state.coordinates.push(NavObj)
    this.state.coordinates.push(CurrentObj)
    this.setState({
      destination: NavObj,
      coordinates: this.state.coordinates
    })
  };

  render() {
    return (
      <View style={styles.container}>
        {this.origin == "" || this.state.destination == "" ?
          <Text>Loading...</Text>
          :
          <MapView
            initialRegion={{
              latitude: this.origin.latitude,
              longitude: this.state.origin.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={StyleSheet.absoluteFill}
            ref={c => this.mapView = c}
            loadingEnabled={true}
          >
            {this.origin == "" ?
              null :
              <MapView.Marker coordinate={this.origin}>
                <Image
                  style={{ width: 70, height: 70 }}
                  source={require('../assets/img/marker2.png')}
                />
              </MapView.Marker>
            }
            {this.state.destination == "" ?
              null :
              <MapView.Marker coordinate={this.state.destination}>
                <Image
                  style={{ width: 120, height: 100 }}
                  source={require('../assets/img/logo.png')}
                />
              </MapView.Marker>
            }
            {(this.state.coordinates.length >= 2) && (
              <MapViewDirections
                origin={this.origin}
                // waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : null}
                destination={this.state.destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
                onStart={(params) => {
                  console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={result => {
                  console.log(`Distance:${result.distance}km`)
                  console.log(`Duration:${result.duration}min`)

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: (width / 20),
                      bottom: (height / 20),
                      left: (width / 20),
                      top: (height / 20),
                    }
                  });
                }}
                onError={(errorMessage) => {
                  console.log('GOT AN ERROR');
                }}
              />
            )}
          </MapView>
        }
        <Button onPress={()=>Actions.Thankyou()} style={{width: "100%" ,position: 'absolute',bottom: 4,backgroundColor: '#fe5960'}} full>
          <Text style={{color: '#fff'}}>Next Step</Text>
        </Button>
      </View>
    );
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
});
export default Maps;
