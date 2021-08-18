// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { createAppContainer } from "react-navigation";
// import { createBottomTabNavigator } from "react-navigation-tabs";

// import FacebookScreen from "./screens/FacebookScreen";
// import InstagramScreen from "./screens/InstagramScreen";

// export default class App extends React.Component {
//   render() {
//     return( <AppContainer />);
//   }
// }

// const TabNavigator = createBottomTabNavigator({
//   Facebook: { screen: FacebookScreen },
//   Instagram: { screen: InstagramScreen }
// });

// const AppContainer = createAppContainer(TabNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "red",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    }
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      /*status === "granted" is true when user has granted permission
      status === "granted" is false when user has not granted the permission*/
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false,
    })
  }
  handleBarCodeScanned = async ({ type, data }) => {
    const { buttonState } = this.state

    if (buttonState !== 'normal') {
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
      });
    }
  }
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== "normal" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <View>
            <Image
              source={require('./barcode.jpg')}
              style={{width:200, height: 200}}/>
            <Text style={{ textAlign: 'center', fontSize: 20, textDecorationLine: 'underline' }}>Request Camera Permission</Text>
          </View>
          <View style={styles.inputView}>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermission()
              }}>
              <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputView: {
    flexDirection: 'row',
    margin: 20
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontSize: 32,
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#1C90E3',
    width: 350,
    borderWidth: 1.5,
  }
});

