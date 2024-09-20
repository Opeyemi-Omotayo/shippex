import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { FC, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Animatable from "react-native-animatable";
import { primary } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";

export interface InputProps extends TextInputProps {
  errorText?: string;
  title?: string;
  whiteBg?: boolean;
  value: string;
}

const PasswordInputComponent: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  errorText,
  title,
  onFocus,
  onBlur,
  whiteBg,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();

  const toggleShowPassword = () => {
    setVisible(!visible);
    setShowPassword(!showPassword);
  };

  return (
    <>
     <Animatable.View
      animation={!!errorText ? "shake" : undefined}
      duration={500}
      style={[
        styles.container,
        focus && styles.focusedStyle,
        !!errorText && styles.errorStyle,
        { backgroundColor: colorScheme === "dark" ? "#303030" : "#f1f1f1" },
      ]}
    >
      {value.length > 0 && (
        <ThemedText lightColor='gray' style={styles.text}>Password</ThemedText>
      )}
      <View style={[styles.inputContainer, whiteBg && styles.whiteBg]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.textInput,
            whiteBg && styles.whiteBg,
            {
              backgroundColor:
                colorScheme === "dark" ? "#303030" : "#f1f1f1",
            },
          ]}
          placeholder={placeholder}
          onFocus={(e) => {
            onFocus && onFocus(e);
            setFocus(true);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            setFocus(false);
          }}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={visible}
          {...rest}
        />
      </View>
    </Animatable.View>
    {errorText && <Text style={styles.errorText}>* {errorText}</Text>}
    </>
  );
};

export default PasswordInputComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    borderRadius: 5,
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: primary,
    paddingVertical: 0,
  },
  text: {
    paddingLeft: 10,
    fontSize: 12,
  },
  focusedStyle: {
    borderColor: primary,
    borderWidth: 1,
  },
  errorStyle: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    fontSize: 11,
    color: "red",
    marginTop: 4,
    marginLeft: 4,
  },
  whiteBg: {
    backgroundColor: "#fff",
  },
  iconPressable: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
