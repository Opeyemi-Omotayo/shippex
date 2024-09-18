import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import Button from "@/components/Button";
import { primary } from "@/constants/Colors";

const Onboarding = () => {
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationDone(true);
    }, 1600);
  }, []);

  if (!animationDone) {
    return (
      <View style={styles.whiteContainer}>
        <Animatable.View animation="flipOutX" duration={1500}>
          <Image
            source={require("../../assets/images/icon1.png")}
            style={styles.largeIcon}
            resizeMode="contain"
          />
        </Animatable.View>
      </View>
    );
  }

  return (
    <View style={styles.blueContainer}>
      <Animatable.View
        animation="slideInRight"
        duration={1500}
        style={styles.iconTextContainer}
      >
        <Image
          source={require("../../assets/images/shippex.png")}
          style={styles.smallIcon}
        />
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        style={styles.buttonWrapper}
      >
        <Button
          title="Login"
          onPress={() => alert("clicked")}
          containerStyle={styles.btnContainer}
          textStyle={styles.btnText}
        />
      </Animatable.View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  blueContainer: {
    flex: 1,
    backgroundColor: primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  largeIcon: {
    width: 70,
    height: 70,
  },
  smallIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 17,
    paddingHorizontal: 80,
    borderRadius: 7,
  },
  btnText: {
    fontSize: 16,
    color: primary,
  },
});
