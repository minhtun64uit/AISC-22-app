import {
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import React, { Component } from "react";

export default class WelcomeScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        ></Image>
        <Image
          style={styles.image}
          source={require("../assets/images/welcome.png")}
        ></Image>
        <Text style={styles.ask}>Bạn là ... ?</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.opt}>Người gặp khó khăn về thị lực</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.opt}>Tình nguyện viên</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 48,
    marginLeft: 20,
  },
  image: {
    width: 347,
    height: 247,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 32,
  },
  ask: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#0D7596",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  btn: {
    width: 332,
    height: 80,
    backgroundColor: "#195ABB",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
  },
  opt: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
});