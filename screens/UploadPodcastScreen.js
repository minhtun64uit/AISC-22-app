import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  LexendExa_100Thin,
  LexendExa_200ExtraLight,
  LexendExa_300Light,
  LexendExa_400Regular,
  LexendExa_500Medium,
  LexendExa_600SemiBold,
  LexendExa_700Bold,
  LexendExa_800ExtraBold,
  LexendExa_900Black,
} from "@expo-google-fonts/lexend-exa";

import { useSwipe } from "../hooks/useSwipe";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);

export default function UploadPodcastScreen({ navigation }) {
  // const [image, setImage] = useState("");
  // const [audio, setAudio] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [des, setDes] = useState("");
  const [height, setHeight] = useState("");
  // const [audioErrorMessage, setAudioErrorMessage] = useState("");
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [topicErrorMessage, setTopicErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  const ref_input2 = useRef();

  const topics = ["Brili - Life", "Brili - Study", "Brili - Love"];

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

    // if (audio.length == 0) {
    //   errorFlag = true;
    //   setAudioErrorMessage("Ch??a t???i t???p ??m thanh.");
    // }

    if (title.length == 0) {
      errorFlag = true;
      setTitleErrorMessage("T??n t???p kh??ng ???????c ????? tr???ng.");
    }

    if (topic.length == 0) {
      errorFlag = true;
      setTopicErrorMessage("Ch??a ch???n ch??? ?????.");
    }

    if (errorFlag) {
      // console.log("errorFlag");
    } else {
      setLoading(false);
      navigation.navigate("MyPodcast1");
    }
  };

  let [fontsLoaded] = useFonts({
    LexendExa_100Thin,
    LexendExa_200ExtraLight,
    LexendExa_300Light,
    LexendExa_400Regular,
    LexendExa_500Medium,
    LexendExa_600SemiBold,
    LexendExa_700Bold,
    LexendExa_800ExtraBold,
    LexendExa_900Black,
  });
  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        enabled
        keyboardVerticalOffset={Platform.select({ ios: 20, android: 200 })}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={require("../assets/icons/back.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>Th??m m???i</Text>
        <ScrollView
          style={{ height: "100%" }}
          keyboardShouldPersistTaps="handled"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <View style={styles.content}>
            <TouchableOpacity onPress={toggleModal} style={styles.imageBox}>
              <Image
                style={styles.imageIcon}
                source={require("../assets/icons/image.png")}
              ></Image>
              <Text style={styles.imageText}>Th??m ???nh ch??? ?????</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
              <View style={styles.popup}>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.closeText}>????ng</Text>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity style={styles.micBox}>
                    <Image
                      style={styles.micIcon}
                      source={require("../assets/icons/cam.png")}
                    ></Image>
                    <Text style={styles.micText}>Ch???p ???nh tr???c ti???p</Text>
                  </TouchableOpacity>
                  <View style={styles.line2}></View>
                  <TouchableOpacity style={styles.upBox}>
                    <Text style={styles.upText}>T???i l??n t??? thi???t b???</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={toggleModal2} style={styles.audioBox}>
              <Image
                style={styles.audioIcon}
                source={require("../assets/icons/audio-add.png")}
              ></Image>
              <Text style={styles.audioText}>Th??m audio</Text>
            </TouchableOpacity>
            {/* {audioErrorMessage.length > 0 && (
          <Text style={styles.textDanger}>{audioErrorMessage}</Text>
        )} */}
            <Modal isVisible={isModalVisible2}>
              <View style={styles.popup}>
                <TouchableOpacity onPress={toggleModal2}>
                  <Text style={styles.closeText}>????ng</Text>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity style={styles.micBox}>
                    <Image
                      style={styles.micIcon}
                      source={require("../assets/icons/mic.png")}
                    ></Image>
                    <Text style={styles.micText}>Ghi ??m tr???c ti???p</Text>
                  </TouchableOpacity>
                  <View style={styles.line2}></View>
                  <TouchableOpacity style={styles.upBox}>
                    <Text style={styles.upText}>T???i l??n t??? thi???t b???</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={styles.line}></View>
            <View style={styles.info}>
              <View style={styles.formControl}>
                <Text style={styles.prop}>T??n t???p</Text>
                <TextInput
                  style={styles.input1}
                  onChangeText={(text) => {
                    setTitleErrorMessage("");
                    setTitle(text);
                  }}
                  value={title}
                  returnKeyType="next"
                  onSubmitEditing={() => ref_input2.current.focus()}
                ></TextInput>
              </View>
              {titleErrorMessage.length > 0 && (
                <Text style={styles.textDanger}>{titleErrorMessage}</Text>
              )}
              <View style={styles.formControl}>
                <Text style={styles.prop}>Ch??? ?????</Text>
                <SelectDropdown
                  data={topics}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color={"#444"}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  onSelect={(selectedItem, index) => {
                    // console.log(selectedItem, index);
                    setTopicErrorMessage("");
                    setTopic(index);
                  }}
                  defaultButtonText="Ch???n ch??? ?????"
                  buttonStyle={styles.dropdownBtn}
                  buttonTextStyle={styles.dropdownText}
                  rowTextStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdown}
                  selectedRowStyle={styles.dropdownSelectedRow}
                  selectedRowTextStyle={styles.dropdownSelectedText}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </View>
              {topicErrorMessage.length > 0 && (
                <Text style={styles.textDanger}>{topicErrorMessage}</Text>
              )}
              <View style={styles.formControl}>
                <Text style={styles.prop}>M?? t???</Text>
                <TextInput
                  style={[styles.input2, { height: Math.max(60, height) }]}
                  multiline={true}
                  //keyboardType=""
                  onChangeText={(text) => setDes(text)}
                  value={des}
                  onContentSizeChange={(event) =>
                    setHeight(event.nativeEvent.contentSize.height)
                  }
                  ref={ref_input2}
                ></TextInput>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.postBtn}
          onPress={() => formValidation()}
        >
          <Text style={styles.postText}>????ng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveBtn}
          //onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveText}>L??u b???n nh??p</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    width: 40,
  },
  backIcon: {
    width: 40,
    height: 40,
    marginTop: 48,
  },
  title: {
    marginTop: -32,
    fontSize: 20,
    fontWeight: "500",
    color: "#000000",
    marginLeft: 40,

    marginBottom: 8,
  },
  line: {
    width: 320,
    height: 1,
    backgroundColor: "#A0A0A0",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 32,
    marginBottom: 32,
  },
  imageBox: {
    marginTop: 20,
    width: 240,
    height: 240,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
    backgroundColor: "#E7E3E3",
  },
  imageIcon: {
    width: 30,
    height: 30,
    marginTop: 88,
    marginLeft: "auto",
    marginRight: "auto",
  },
  imageText: {
    marginTop: 16,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#A0A0A0",
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
  },
  audioBox: {
    marginTop: 20,
    width: 160,
    height: 44,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
    backgroundColor: "#000000",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderStyle: "dotted",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    // flexWrap: "wrap",
  },
  audioIcon: {
    width: 26,
    height: 26,
    marginTop: 8,
    // marginLeft: "auto",
    // marginRight: "auto",
  },
  audioText: {
    marginTop: 12,
    // marginLeft: "auto",
    // marginRight: "auto",
    color: "#ffffff",
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
  },
  prop: {
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    marginTop: 8,
  },
  input1: {
    width: 260,
    height: 36,
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 5,
    backgroundColor: "#CBC9C9",
    borderRadius: 12,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
  },

  input2: {
    width: 260,
    height: 60,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#CBC9C9",
    borderRadius: 12,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    marginBottom: 180,
  },

  formControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 24,
  },
  dropdown: {
    borderRadius: 8,
  },
  dropdownBtn: {
    width: 260,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#CBC9C9",
  },
  dropdownText: {
    fontWeight: "600",
  },
  dropdownSelectedRow: {
    backgroundColor: "#FFBE18",
  },
  dropdownSelectedText: {
    color: "#ffffff",
  },
  postBtn: {
    width: "100%",
    // marginLeft: "auto",
    // marginRight: "auto",
    paddingTop: 8,
    paddingBottom: 8,
    position: "absolute",
    bottom: 160,
    //bottom: "25%",
    backgroundColor: "#1868DF",
    borderRadius: 12,
    // right: 20,
  },
  postText: {
    color: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 20,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
  },
  saveBtn: {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 8,
    position: "absolute",
    bottom: 112,
    // bottom: "20%",
    // backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#1868DF",
    borderRadius: 12,
  },
  saveText: {
    color: "#1868DF",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 20,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    // borderWidth: 1,
    // borderColor: "#ffffff",
  },
  popup: {
    width: 360,
    height: 292,
    backgroundColor: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    padding: 20,
  },
  closeText: {
    color: "#1868DF",
    marginLeft: "auto",
    //marginRight: "auto",
    //fontSize: 12,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    textDecorationLine: "underline",
  },
  micBox: {
    marginTop: 20,
    width: 300,
    height: 142,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
    backgroundColor: "#1868DF",
  },
  micIcon: {
    width: 60,
    height: 60,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  micText: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
  },
  upBox: {
    // marginTop: 20,
    width: 300,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
    backgroundColor: "#CBC9C9",
  },
  upText: {
    marginTop: 12,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    // color: "#ffffff",
    // fontSize: 20,
  },
  line2: {
    width: 300,
    height: 1,
    backgroundColor: "#A0A0A0",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 12,
    marginBottom: 12,
  },
  textDanger: {
    color: "#dc3545",
    marginLeft: 132,
    marginRight: 12,
    marginTop: -20,
    marginBottom: 12,
  },
  content: {},
});

/*
    export default class PodcastScreen extends Component {
      render() {
        return (
          <View>
            <Text style={styles.title}>Podcast</Text>
            <View style={styles.formControl1}>
              <View style={styles.line}></View>
            </View>
          </View>
        );
      }
    }
    */
