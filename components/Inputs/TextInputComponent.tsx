import { TextInput, TextInputProps, StyleSheet, View, Text, useColorScheme } from 'react-native';
import React, { FC, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Colors, primary } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';

interface TextInputPropsExtended extends TextInputProps {
  errorText?: string;
  title?: string;
  whiteBg?: boolean;
  rightText?: string;
  onTextPress?: () => void;
  value: string;
}

const TextInputComponent: FC<TextInputPropsExtended> = ({
  value,
  onChangeText,
  errorText,
  title,
  multiline,
  onFocus,
  onBlur,
  whiteBg,
  rightText,
  onTextPress,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <>
        <Animatable.View
      animation={!!errorText ? 'shake' : undefined} 
      duration={500}
      style={[styles.container, focus && styles.focusedStyle, !!errorText && styles.errorStyle, {backgroundColor: colorScheme === "dark" ? "#303030" : "#f1f1f1"}]}
    >
      {value.length > 0 && <ThemedText lightColor='gray' style={styles.text}>Username / Email</ThemedText>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          multiline && styles.multiline,
          whiteBg && styles.whiteBg
        ]}
        placeholderTextColor="#8e8e8e"
        onFocus={e => {
          onFocus && onFocus(e);
          setFocus(true);
        }}
        onBlur={e => {
          onBlur && onBlur(e);
          setFocus(false);
        }}
        multiline={multiline}
        {...rest}
      />
   </Animatable.View>
          {errorText && <Text style={styles.errorText}>{`* ${errorText}`}</Text>}
</>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    color: '#000',
  },
  rightText: {
    fontSize: 13,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  text: {
    paddingLeft: 10,
    fontSize: 14
  },
  input: {
    fontSize: 14,
    color: Colors.primary,
    paddingHorizontal: 10,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  focusedStyle: {
    borderColor: primary,
    borderWidth: 1,
  },
  errorStyle: {
    borderColor: 'red',
    borderWidth: 1,
  },
  whiteBg: {
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 11,
    color: 'red',
    marginTop: 4,
    marginLeft: 4,
  },
});
