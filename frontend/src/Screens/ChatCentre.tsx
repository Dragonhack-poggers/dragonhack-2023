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

const FontFamily = {
  aBeeZeeRegular: "ABeeZee_regular",
};
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

  const { createPet } = useAppStore();

  const handleTextChange = (newText: string) => {
    setText(newText);
    setCount(newText.length);
  };

  const handleMenuClick = async () => {
    // Open modal for filters/parameters
  }

  const handleGenerateButtonClick = async () => {
    // Call API to generate response
  }

  const onSubmit = async () => {
    const ok = await createPet({ name, color });
    if (ok) {
      navigation.navigate("Home");
    }
  };

  return (
    <Background>
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
    fontFamily: FontFamily.aBeeZeeRegular,
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
    fontFamily: FontFamily.aBeeZeeRegular,
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
