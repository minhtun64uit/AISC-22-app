import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useRef, useState, useEffect } from "react";
// import { CheckBox } from "react-native-elements";
// import CheckBox from "@react-native-community/checkbox";
// import { Checkbox } from "react-native-paper";
import Checkbox from "expo-checkbox";
import { useSwipe } from "../hooks/useSwipe";
import { BackHandler } from 'react-native';

const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Comp {...props}>{children}</Comp>
        </TouchableWithoutFeedback>
    );
};
const DismissKeyboardView = DismissKeyboardHOC(View);

export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    //const [isPasswordSecure, setIsPasswordSecure] = useState(true);

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

    function onSwipeLeft() {
        //navigation.goBack();
    }

    function onSwipeRight() {
        // console.log("SWIPE_RIGHT");
        navigation.goBack();
    }

    formValidation = async () => {
        setLoading(true);
        let errorFlag = false;

        // input validation
        if (username.length == 0) {
            errorFlag = true;
            setUsernameErrorMessage("B???t bu???c nh???p t??n ????ng nh???p.");
        }

        if (password.length == 0) {
            errorFlag = true;
            setPasswordErrorMessage("B???t bu???c nh???p m???t kh???u.");
        } else if (password.length < 8 || password.length > 20) {
            errorFlag = true;
            setPasswordErrorMessage("M???t kh???u ph???i ch???a t???i thi???u 8 k?? t??? v?? t???i ??a 20 k?? t???.");
        } else if (password !== confirmPassword) {
            errorFlag = true;
            setConfirmPasswordErrorMessage("M???t kh???u v?? m???t kh???u x??c nh???n ph???i tr??ng kh???p.");
        }

        if (errorFlag) {
            // console.log("errorFlag");
            // console.log(passwordErrorMessage);
            //console.log(passwordErrorMessage.length);
            //console.log(confirmPasswordErrorMessage);
            /** Call Your API */
        } else {
            setLoading(false);

            // console.log(passwordErrorMessage);
            // console.log(errorFlag);

            navigation.navigate("SignIn");
        }
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} enabled keyboardVerticalOffset={Platform.select({ ios: 20, android: 200 })}>
            <View>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Image style={styles.backIcon} source={require("../assets/icons/back.png")}></Image>
                </TouchableOpacity>
            </View>
            <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <DismissKeyboardView>
                    <Image style={styles.logo} source={require("../assets/images/logo.png")}></Image>
                    <Image style={styles.image} source={require("../assets/images/sign-up.png")}></Image>
                    <Text style={styles.title}>????ng k??</Text>

                    <View style={styles.card}>
                        <View style={styles.form}>
                            <View style={styles.formControl}>
                                <Image style={styles.icon} source={require("../assets/icons/user.png")}></Image>
                                <TextInput
                                    style={styles.input}
                                    placeholder="T??n ????ng nh???p"
                                    value={username}
                                    returnKeyType="next"
                                    onSubmitEditing={() => ref_input2.current.focus()}
                                    onChangeText={(text) => {
                                        setUsername(text);
                                        setUsernameErrorMessage("");
                                    }}
                                ></TextInput>
                            </View>
                        </View>
                    </View>
                    {usernameErrorMessage.length > 0 && <Text style={styles.textDanger}>{usernameErrorMessage}</Text>}

                    <View style={styles.card}>
                        <View style={styles.form}>
                            <View style={styles.formControl}>
                                <Image style={styles.icon} source={require("../assets/icons/lock.png")}></Image>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    placeholder="M???t kh???u"
                                    returnKeyType="next"
                                    onSubmitEditing={() => ref_input3.current.focus()}
                                    ref={ref_input2}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        setPasswordErrorMessage("");
                                    }}
                                    value={password}
                                ></TextInput>
                            </View>
                        </View>
                    </View>
                    {passwordErrorMessage.length > 0 && <Text style={styles.textDanger}>{passwordErrorMessage}</Text>}

                    <View style={styles.card}>
                        <View style={styles.form}>
                            <View style={styles.formControl}>
                                <Image style={styles.icon} source={require("../assets/icons/lock.png")}></Image>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    placeholder="X??c nh???n m???t kh???u"
                                    returnKeyType="next"
                                    // onSubmitEditing={() => ref_input4.current.focus()}
                                    ref={ref_input3}
                                    onChangeText={(text) => {
                                        setConfirmPassword(text);
                                        setConfirmPasswordErrorMessage("");
                                    }}
                                    value={confirmPassword}
                                ></TextInput>
                            </View>
                        </View>
                    </View>

                    {confirmPasswordErrorMessage.length > 0 && <Text style={styles.textDanger}>{confirmPasswordErrorMessage}</Text>}

                    {/* <View style={styles.card}>
                        <View style={styles.form}>
                            <View style={styles.formControl}>
                                <Image style={styles.icon} source={require("../assets/icons/email.png")}></Image>
                                <TextInput
                                    style={styles.input}
                                    placeholder="?????a ch??? email"
                                    keyboardType="email-address"
                                    ref={ref_input4}
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                ></TextInput>
                            </View>
                        </View>
                    </View> */}

                    {/* <View style={styles.checkboxContainer}>
                        <Checkbox disable={false} value={isSelected} onValueChange={setSelection} style={styles.checkbox} />
                        <View style={styles.row}>
                            <Text style={styles.label}>?????ng ?? v???i</Text>
                            <TouchableOpacity>
                                <Text style={styles.policy}>ch??nh s??ch</Text>
                            </TouchableOpacity>
                            <Text style={styles.label}>c???a Brili?</Text>
                        </View>
                    </View> */}
                    {/* {isSelected && ( */}
                        <TouchableOpacity
                            style={styles.loginBtn}
                            // onPress={() => navigation.navigate("SignIn")}
                            onPress={() => formValidation()}
                        >
                            <Text style={styles.loginText}>????ng k??</Text>
                        </TouchableOpacity>
                    {/* )}
                    {!isSelected && (
                        <TouchableOpacity style={styles.loginBtnOff}>
                            <Text style={styles.loginText}>????ng k??</Text>
                        </TouchableOpacity>
                    )} */}

                    <View style={styles.formControl3}>
                        <Text style={styles.ask}>???? c?? t??i kho???n?</Text>
                        <TouchableOpacity>
                            <Text style={styles.signIn} onPress={() => navigation.navigate("SignIn")}>
                                {" "}
                                ????ng nh???p
                            </Text>
                        </TouchableOpacity>
                    </View>
                </DismissKeyboardView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // inner: {
    //   padding: 24,
    //   flex: 1,
    //   // justifyContent: "space-around",
    // },
    back: {
        width: 40,
    },
    backIcon: {
        width: 40,
        height: 40,
        marginTop: 48,
    },
    eyeIcon: {
        marginTop: 8,
    },
    icon: {
        width: 32,
        height: 32,
    },
    logo: {
        width: 48,
        height: 48,
        marginTop: 12,
        marginLeft: 20,
    },
    image: {
        width: 260,
        height: 180,
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        //marginTop: -32,
    },
    title: {
        marginLeft: "auto",
        marginRight: "auto",
        color: "#171586",
        fontSize: 34,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 12,
    },
    card: {
        backgroundColor: "White",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        height: 40,
    },
    form: {},
    formControl: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    input: {
        width: 280,
        height: 40,
        fontSize: 22,
        paddingHorizontal: 4,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },

    input2: {
        width: 280,
        height: 40,
        color: "#6a4595",
        fontSize: 22,
        paddingHorizontal: 4,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },

    loginBtn: {
        width: "80%",
        height: 56,
        marginTop: 56,
        marginBottom: 32,
        backgroundColor: "#1868DF",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 16,
    },
    loginBtnOff: {
        width: 200,
        height: 52,
        marginTop: 12,
        marginBottom: 16,
        backgroundColor: "#A4A6A9",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 12,
        fontWeight: "600",
    },
    loginText: {
        fontSize: 24,
        color: "#ffffff",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 12,
    },
    formControl1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: -8,
    },
    line: {
        width: 60,
        height: 1,
        backgroundColor: "#777D84",
    },
    lineText: {
        fontSize: 12,
        color: "#777D84",
        textAlign: "center",
        marginTop: 24,
    },
    formControl2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 32,
    },
    formControl3: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 44,
        //alignItems: "center",
    },
    signIn: {
        color: "#1868DF",
    },
    // checkboxContainer: {
    //     flexDirection: "row",
    //     marginLeft: 32,
    //     marginTop: 32,
    //     marginBottom: 12,
    // },
    // checkbox: {
    //     alignSelf: "center",
    // },
    label: {
        marginTop: 8,
        marginLeft: 4,
        marginBottom: 8,
    },
    textDanger: {
        color: "#dc3545",
        marginLeft: 100,
        marginRight: 12,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    policy: {
        marginTop: 8,
        marginLeft: 4,
        marginBottom: 4,
        color: "#1868DF",
    },
});
