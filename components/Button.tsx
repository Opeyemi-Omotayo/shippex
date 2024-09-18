import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface ButtonProps {
  disabled?: boolean;
  title: string;
  onPress: () => void;
  loading?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: FC<ButtonProps> = ({
  disabled,
  title,
  onPress,
  loading,
  containerStyle,
  textStyle,
  ...rest
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.buttonContainer, containerStyle]}
      {...rest}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
