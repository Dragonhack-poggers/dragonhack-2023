import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
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
  const [color, setColor] = useState<PetColors>(PetColors.GREEN); // out
  const [name, setName] = useState(""); // out

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chosenResponse, setChosenResponse] = useState<Array<String>>();

  const { createPet } = useAppStore();

  const handleTextChange = (newText: string) => {
    setText(newText);
    setCount(newText.length);
  };

  const handleMenuClick = async () => {
    // Open modal for filters/parameters
  }

  const handleGenerateButtonClick = async () => {
    setIsLoading(true);
    console.log("generate")
    //const prompt = 'Give me relationship advice, give me 3 advices';
    const model = 'gpt-4';
    const maxTokens = 200;

    const openaiEndpoint = 'https://openai-api.meetings.bio/api/openai/chat/completions';
    const apiKey2 = 'je4DnpKkAMEutcMQ51IszBh0w2jfeW';
    const apiKey = 'YpPZjNhlC258MzkDTmWol6ZuqWTDgi';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      messages: [{ role: "user", content: text }],
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

  const onSubmit = async () => {
    /*const ok = await createPet({ name, color });
    if (ok) {
      navigation.navigate("Home");
    }*/
  };

  return (
    <Background>
      {isLoading &&
        <View style={{ flex: 1, position: "absolute", backgroundColor: "rgba(100,100,100,0.8)", height: "100%", width: "100%", zIndex: 10, alignItems: "center" }} >
          <Image style={{ flex: 1, position: "absolute" }} source={GIF_ANIMATION} resizeMode="contain" />
        </View>}
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
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 18,
    paddingVertical: 18,
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
