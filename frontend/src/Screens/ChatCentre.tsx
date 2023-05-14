import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Pressable, Dimensions, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import { theme } from "../theme";
import { PetColors } from "../data/types";
import PetColorPicker from "../components/PetColorPicker";
import Pet from "../components/Pet";
import { useAppStore } from "../store/app-store";
import { MainStackParams } from "../Main";
import { StackScreenProps } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Slider from '@react-native-community/slider';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get("window");
const GIF_ANIMATION = require("frontend/assets/loading.gif");
/* font sizes */
const FontSize = {
  size_lg: 18,
};
/* Colors */
const Color = {
  thistle: "#bfabbe",
};
/* border radiuses */
const Border = {
  br_11xl: 30,
};

type Props = StackScreenProps<MainStackParams, "ChatCentre">;

export type PetColorOption = {
  idx: number;
  color: PetColors;
};

const ChatCentre = ({ navigation }: Props) => {

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChosenResponse, setIsChosenResponse] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [chosenResponse, setChosenResponse] = useState<Array<String>>();

  const [isRizzEnabled, setIsRizzEnabled] = useState(false);
  const [isWeatherEnabled, setIsWeatherEnabled] = useState(false);
  const [weatheForecast, setWeatheForecast] = useState("Rainy");
  const [isJokesEnabled, setIsJokesEnabled] = useState(false);
  const [isEmojisEnabled, setIsEmojisEnabled] = useState(false);
  const [sarcasmLevel, setSarcasmLevel] = useState(5);

  const instructionBuilder = () => {
    const isRizz = isRizzEnabled ? "Make the message charming and seducing." : "";
    const weather = isWeatherEnabled ? "In the message you can refer the message with the current weather, which is " + weatheForecast : "";
    const isJoke = isJokesEnabled ? "Include a joke/jokes in the message." : "";
    const isEmoji = isEmojisEnabled ? "Include emoji/emojis in the message." : "";
    const sarcasm = sarcasmLevel > 0 ? "Sarcasm level of the message: " + sarcasmLevel + "/5" : "";
    const characterLimit = "Limit your response to 150 characters. And only make full sentences."

    const overallInstruction = isRizz + weather + isJoke + isEmoji + sarcasm + "Return response message based on my following input without headers: " + text + "." + characterLimit;
    return overallInstruction;
  }

  const handleTextChange = (newText: string) => {
    setText(newText);
    setCount(newText.length);
  };

  const handleMenuClick = async () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    console.log(weatheForecast)
  }, [weatheForecast]);

  const getWeather = async () => {
    const requestOptions = {
      method: 'GET'
    };

    await fetch("http://5.75.161.45:8080/WeatherForecast?latitude=41.19&longitude=14.66", requestOptions)
      .then(response => response.json())
      .then(result => setWeatheForecast(result.forecast))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    if (isWeatherEnabled) {
      getWeather();
    }
  }, [isWeatherEnabled]);

  const handleGenerateButtonClick = async () => {
    setIsChosenResponse(false);
    setIsLoading(true);
    console.log("generate")
    //const prompt = 'Give me relationship advice, give me 3 advices';
    const model = 'gpt-4';
    const maxTokens = 50;

    const openaiEndpoint = 'https://openai-api.meetings.bio/api/openai/chat/completions';
    const apiKey2 = 'je4DnpKkAMEutcMQ51IszBh0w2jfeW';
    const apiKey = 'YpPZjNhlC258MzkDTmWol6ZuqWTDgi';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    const textMessage = instructionBuilder();

    const data = {
      messages: [{ role: "user", content: textMessage }],
      model: model,
      max_tokens: maxTokens,
      n: 2,
    };

    axios
      .post(`${openaiEndpoint}`, data, {
        headers: headers,
      })
      .then((response) => {
        const array = []
        const answer = response.data.choices[0].message.content
        array.push(answer)
        const answer2 = response.data.choices[1].message.content
        array.push(answer2)
        setChosenResponse(array);
        console.log(answer, answer2);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  /*const renderCarouselItem = ({item, index}) => {
    return (
        <View style={styles.slide}>
            <Text style={styles.title}>{ item.title }</Text>
        </View>
    );
  }*/

  return (
    <Background>
      {(isLoading /*|| !isChosenResponse*/) &&
        <View style={{ flex: 1, position: "absolute", backgroundColor: "rgba(100,100,100,0.8)", height: "100%", width: "100%", zIndex: 10, alignItems: "center" }} >
          {isLoading && <Image style={{ flex: 1, position: "absolute" }} source={GIF_ANIMATION} resizeMode="contain" />}
          {!isChosenResponse && <View />}
        </View>}
      {modalVisible &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={{ flex: 1 }}
        >
          <View style={[styles.centeredView]}>
            <View style={[styles.modalView, { height: height, width: width, backgroundColor: "#3E347C" }]}>
              <View style={{ flex: 1, width: 300 }}>
                <View style={{ flex: 1, flexDirection: "row", backgroundColor: "rgba(255,255,255,0.2)", maxHeight: 100, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                  <Text style={{ color: "#FFFF", fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft: 20 }}>Rizz  🍆💦</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81688A' }}
                    thumbColor={isRizzEnabled ? '#7F528E' : '#f4f3f4'}
                    onValueChange={() => setIsRizzEnabled(previousState => !previousState)}
                    value={isRizzEnabled}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginLeft: 100 }} />
                </View>
                <View style={{ flex: 1, flexDirection: "row", marginBottom: 0, backgroundColor: "rgba(255,255,255,0.1)", maxHeight: 100 }}>
                  <Text style={{ color: "#FFFF", fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft: 20 }}>Weather ☔</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81688A' }}
                    thumbColor={isWeatherEnabled ? '#7F528E' : '#f4f3f4'}
                    onValueChange={() => setIsWeatherEnabled(previousState => !previousState)}
                    value={isWeatherEnabled}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginLeft: 90 }} />
                </View>
                <View style={{ flex: 1, flexDirection: "row", marginBottom: 0, backgroundColor: "rgba(255,255,255,0.2)", maxHeight: 100 }}>
                  <Text style={{ color: "#FFFF", fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft: 20 }}>Jokes 😂</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81688A' }}
                    thumbColor={isJokesEnabled ? '#7F528E' : '#f4f3f4'}
                    onValueChange={() => setIsJokesEnabled(previousState => !previousState)}
                    value={isJokesEnabled}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginLeft: 110 }} />
                </View>
                <View style={{ flex: 1, flexDirection: "row", marginBottom: 0, backgroundColor: "rgba(255,255,255,0.1)", maxHeight: 100 }}>
                  <Text style={{ color: "#FFFF", fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft: 20 }}>Emojis</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81688A' }}
                    thumbColor={isEmojisEnabled ? '#7F528E' : '#f4f3f4'}
                    onValueChange={() => setIsEmojisEnabled(previousState => !previousState)}
                    value={isEmojisEnabled}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginTop: 0, marginLeft: 130 }} />
                </View>
                <View style={{ flex: 1, flexDirection: "column", marginBottom: 0, backgroundColor: "rgba(255,255,255,0.2)", maxHeight: 160, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                  <Text style={{ color: "#FFFF", fontWeight: "bold", fontSize: 20, marginLeft: 20, marginTop: 40, maxHeight: 30 }}>Sarcasm level 😈</Text>
                  <Slider
                    style={{ width: 200, height: 40, alignSelf: "center", marginTop: 20 }}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#FFFFFF"
                    value={sarcasmLevel}
                    onValueChange={setSarcasmLevel}
                  />
                </View>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      }
      <View style={styles.chatScreen1}>
        <View style={[styles.vectorParent, styles.groupChildLayout]}>
          <Image
            style={[styles.groupChild, styles.groupPosition]}
            resizeMode="cover"
            source={require("frontend/assets/rectangle-11.png")}
          />
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Type your message here"
            value={text}
            onChangeText={handleTextChange}
            multiline={true}
          />
          <TouchableOpacity onPress={handleGenerateButtonClick}>
            <Image
              style={styles.groupItem}
              resizeMode="cover"
              source={require("frontend/assets/group-44.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleMenuClick}>
          <Image
            style={styles.menuIcon}
            resizeMode="cover"
            source={require("frontend/assets/menu-icon.png")}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{count}/300</Text>
      </View>
    </Background >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 18,
    paddingVertical: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#4A427C',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  formWrapper: {
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    width: "90%",
    alignItems: "center",
    gap: 16,
    paddingVertical: 10,
  },
  colorVariants: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 5,
    paddingBottom: 15,
  },
  pet: {
    minHeight: 250,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.b1,
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "500",
    textAlign: "left",
    width: "90%",
    marginTop: 20,
  },
  button: {
    backgroundColor: theme.colors.o2,
    borderRadius: 44,
    paddingHorizontal: 28,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
    lineHeight: 16,
    fontWeight: "600",
  },
  input: {
    height: 225,
    padding: 15,
    width: "100%",
    borderRadius: 35,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.colors.gray,
    fontSize: 18,
  },
  groupChildLayout: {
    height: 300,
    width: 295,
    position: "absolute",
  },
  groupPosition: {
    borderRadius: Border.br_11xl,
    left: 0,
    top: 0,
  },
  writeAMessageTypo: {
    width: 177,
    color: Color.thistle,
    left: 22,
    textAlign: "left",
    lineHeight: 27,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  groupLayout: {
    height: 214,
    width: 295,
    position: "absolute",
  },
  chatScreen1Child: {
    width: 375,
    left: 0,
    top: 0,
    position: "absolute",
    height: 812,
  },
  groupChild: {
    height: 300,
    width: 295,
    position: "absolute",
  },
  writeAMessage: {
    top: 25,
    height: 25,
  },
  groupItem: {
    top: 10,
    left: 120,
    width: 55,
    height: 55,
    position: "absolute",
  },
  vectorParent: {
    top: 129,
    left: 40,
  },
  groupInner: {
    borderRadius: Border.br_11xl,
    left: 0,
    top: 0,
  },
  responseFromChatgpt: {
    top: 18,
    height: 18,
  },
  vectorGroup: {
    top: 449,
    left: 40,
  },
  menuIcon: {
    top: 80,
    left: 40,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  inputText: {
    backgroundColor: "#fff",
    color: "purple",
    textAlignVertical: "top",
  },
  text: {
    top: 380,
    left: 250,
    color: "#bfabb5",
    width: 89,
    height: 36,
    textAlign: "left",
    lineHeight: 27,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  chatScreen1: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 812,
  },
});

export default ChatCentre;
