/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {StyleSheet, View,Text, Alert, Platform, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';



const App = () => {
  const [initialLocation, setInitialLocation] = useState(
    {
      latitude: 21,
      longitude: 105.7831569,
      latitudeDelta: 0.01,
      longitudeDelta: 0.0121,
    }
  )
  const [pin, setPin] = useState({
    latitude: 21.03620492,
    longitude: 105.7831569,
  })
  useEffect(() => {
    requestLocationPermission()
    
  });
  const [vido, setVido] = useState(21)
  const [kinhdo, setKinhdo] = useState(105.7831569)
  const componenDidMount = () =>{
    requestLocationPermission()
  }
  const locateCurrentPosition = () =>{
    Geolocation.getCurrentPosition(
      (position) =>{
        // console.log(JSON.stringify(position));
        // console.log(JSON.stringify(position.coords.longitude))
        setVido(position.coords.latitude)
        setKinhdo(position.coords.longitude)
      },
      (error)=>{Alert.alert(error.message)},
      {enableHighAccuracy: true}
    )
  }
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);

      if (response === 'granted') {
        locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      // console.log('Android: ' + response);

      if (response) {
        locateCurrentPosition();
      }
    }
  }
  console.log(vido,"vido")
  return (
    <View style={styles.container}>
      <MapView
      
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        region={{
          latitude: vido,
          longitude: kinhdo,
          latitudeDelta: 0.01,
          longitudeDelta: 0.0121,
        }}
       >

        <Marker 
        onPress={()=>componenDidMount()} 
        coordinate={pin}
        draggable={true}
        onDragStart={(e)=>{console.log('drag start', e.nativeEvent.coordinate)}}
        onDragEnd  ={(e)=>{
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }}
        >
          <Callout >
            <Text>BN</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
