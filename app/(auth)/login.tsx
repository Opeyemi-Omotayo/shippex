import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TextInputComponent from "@/components/Inputs/TextInputComponent";
import Button from "@/components/Button";
import PasswordInputComponent from "@/components/Inputs/PasswordInput";
import { primary } from "@/constants/Colors";
import { useLoginMutation } from "@/store/services/api";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Toast from "react-native-toast-message";
import { LoginData } from "@/types";

const Login = () => {
  const [logIn, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isInputFilled, setIsInputFilled] = useState(false);

  const formValues = watch();

  useEffect(() => {
    setIsInputFilled(formValues.username !== "" && formValues.password !== "");
  }, [formValues]);

  const logUserIn = async (data: LoginData) => {
    await logIn({
      usr: data.username,
      pwd: data.password,
    })
      .unwrap()
      .then((payload) => {
        router.replace("/(tabs)/shipments");
        Toast.show({
          type: "success",
          text2: payload.message,
        });
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text2: err.data.message || err.data.error,
        });
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ThemedView lightColor="#fff" style={styles.container}>
        <View style={styles.content}>
          <ThemedText style={styles.title}>Login</ThemedText>
          <ThemedText
            lightColor="#757281"
            darkColor="#dcdcdc"
            style={styles.subtitle}
          >
            Please enter your First, Last name and your phone number in order to
            register
          </ThemedText>
          <View style={styles.space}>
            <Controller
              name="username"
              control={control}
              rules={{
                required: {
                  message: "Username is required",
                  value: true,
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  value={value}
                  onBlur={onBlur}
                  errorText={errors.username?.message}
                  onChangeText={onChange}
                  placeholder="Username / Email"
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
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
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
            loading={isLoading}
            containerStyle={
              isInputFilled ? styles.btnEnabled : styles.btnDisabled
            }
            textStyle={
              isInputFilled ? styles.btnTextEnabled : styles.btnTextDisabled
            }
            disabled={!isInputFilled}
          />
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
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
    fontWeight: "700",
    marginBottom: 10,
    lineHeight: 35,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "500",
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
    paddingVertical: 18,
  },
  btnDisabled: {
    backgroundColor: "#D3D3D3",
  },
  btnText: {
    fontSize: 16,
    paddingVertical: 10,
  },
  btnTextEnabled: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  btnTextDisabled: {
    color: "#A9A9A9",
    fontSize: 16,
  },
});
