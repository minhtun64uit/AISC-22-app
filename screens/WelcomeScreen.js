import { TouchableOpacity, Button, Text, StyleSheet, View, Image } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSwipe } from "../hooks/useSwipe";

export default function WelcomeScreen({ navigation }) {
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

    function onSwipeLeft() {
        //navigation.goBack();
    }

    function onSwipeRight() {
        // console.log("SWIPE_RIGHT");
        navigation.goBack();
    }

    return (
        <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <TouchableOpacity style={styles.view}>
                <Image style={styles.logo} source={require("../assets/images/logo.png")}></Image>
                <Image style={styles.image} source={require("../assets/images/welcome.png")}></Image>
                <Text style={styles.ask}>Bạn là ... ?</Text>

                <View>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("SignIn")}>
                        <Text style={styles.opt}>Người gặp khó khăn về thị lực</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("SignInVolunteer")}>
                        <Text style={styles.opt}>Nhà tuyển dụng hoặc Tình nguyện viên</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 48,
        height: 48,
        marginTop: 60,
        marginLeft: 20,
    },
    image: {
        width: 347,
        height: 247,
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 60,
        marginBottom: 32,
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
        justifyContent: "center",
        marginTop: 8,
        marginLeft: 40,
        marginRight: 40,
    },
    view: {
        height: "100%",
    },
});
