import { TextInput, TextInputProps, StyleSheet, View, Text } from 'react-native';
import React, { FC, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { primary } from '@/constants/Colors';

interface TextInputPropsExtended extends TextInputProps {
  errorText?: string;
  title?: string;
  whiteBg?: boolean;
  rightText?: string;
  onTextPress?: () => void;
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

  return (
    <Animatable.View
      animation={!!errorText ? 'shake' : undefined} 
      duration={500}
      style={styles.container}
    >
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {rightText && (
            <Text onPress={onTextPress} style={styles.rightText}>
              {rightText}
            </Text>
          )}
        </View>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          multiline && styles.multiline,
          focus && styles.focusedStyle,
          !!errorText && styles.errorStyle,
          whiteBg && styles.whiteBg,
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
      {errorText && <Text style={styles.errorText}>{`* ${errorText}`}</Text>}
    </Animatable.View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    justifyContent: 'center',
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
