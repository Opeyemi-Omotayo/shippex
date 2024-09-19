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
import * as Animatable from 'react-native-animatable';
import { primary } from "@/constants/Colors";

export interface InputProps extends TextInputProps {
  errorText?: string;
  title?: string;
  whiteBg?: boolean;
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
    <Animatable.View
      animation={!!errorText ? "shake" : undefined}
      duration={1000}
      iterationCount={1}
      style={styles.container}
    >
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.inputContainer, whiteBg && styles.whiteBg, {backgroundColor: colorScheme === "dark" ? "#303030" : "#f1f1f1"} ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.textInput,
            focus && styles.focusedInput,
            !!errorText && styles.errorInput,
            whiteBg && styles.whiteBg,
            {backgroundColor: colorScheme === "dark" ? "#303030" : "#f1f1f1"}
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
        <View style={styles.iconView}>
          <TouchableOpacity
            onPress={toggleShowPassword}
            style={styles.iconPressable}
          >
            {
              <Entypo
                name={showPassword ? "eye" : "eye-with-line"}
                size={20}
                color= {colorScheme === "dark" ? "white" : "black"}
              />
            }
          </TouchableOpacity>
        </View>
      </View>
      {errorText && (<Text style={styles.errorText}>* {errorText}</Text>)}
    </Animatable.View>
  );
};

export default PasswordInputComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 13,
    marginBottom: 8,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    flexDirection: "row",
    height: 50,
  },
  textInput: {
    color: primary,
    width: "85%",
    height: "100%",
    paddingHorizontal: 10,
    fontSize: 14,
    borderRadius: 4,
  },
  focusedInput: {
    borderColor: "#4A90E2",
    borderWidth: 1,
  },
  errorInput: {
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  whiteBg: {
    backgroundColor: "#FFFFFF",
  },
  iconView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconPressable: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 11,
    color: 'red',
    marginTop: 4,
    marginLeft: 4,
  },
});
