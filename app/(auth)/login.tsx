import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import TextInputComponent from "@/components/Inputs/TextInputComponent";
import Button from "@/components/Button";
import PasswordInputComponent from "@/components/Inputs/PasswordInput";
import { primary } from "@/constants/Colors";

const Login = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      url: "",
      password: "",
      username: "",
    },
  });

  const [isInputFilled, setIsInputFilled] = useState(false);

  // Use watch to monitor changes to the form values
  const formValues = watch();

  useEffect(() => {
    // Check if all fields are filled
    setIsInputFilled(
      formValues.url !== "" && formValues.username !== "" && formValues.password !== ""
    );
  }, [formValues]);

  const logUserIn = () => {
    alert("clicked");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
        Please enter your First, Last name and your phone number in order to register
        </Text>

        <View style={styles.space}>
          <Controller
            name="url"
            control={control}
            rules={{
              required: {
                message: "URL is required",
                value: true,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputComponent
                value={value}
                onBlur={onBlur}
                errorText={errors.url?.message}
                onChangeText={onChange}
                placeholder="URL"
              />
            )}
          />
        </View>

        <View style={styles.space}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: {
                message: "Username is required",
                value: true,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputComponent
                value={value}
                onBlur={onBlur}
                errorText={errors.username?.message}
                onChangeText={onChange}
                placeholder="Username"
              />
            )}
          />
        </View>

        <View style={styles.space}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                message: "Password is required",
                value: true,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInputComponent
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                errorText={errors.password?.message}
                placeholder="Password"
              />
            )}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleSubmit(logUserIn)}
          containerStyle={isInputFilled ? styles.btnEnabled : styles.btnDisabled}
          textStyle={isInputFilled ? styles.btnTextEnabled : styles.btnTextDisabled}
          disabled={!isInputFilled}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
  },
  space: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    color: '#757281',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 20,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  btnContainer: {
    paddingVertical: 17,
    borderRadius: 7,
  },
  btnEnabled: {
    backgroundColor: primary,
  },
  btnDisabled: {
    backgroundColor: '#D3D3D3', 
  },
  btnText: {
    fontSize: 16,
    paddingVertical: 10
  },
  btnTextEnabled: {
    color: '#FFFFFF', 
    paddingVertical: 8
  },
  btnTextDisabled: {
    color: '#A9A9A9',
    paddingVertical: 10 
  },
});
