import React, { useRef, useCallback, useState, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View, Image, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import Button from "@/components/Button";
import { primary } from "@/constants/Colors";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import Login from "./login";

const Onboarding = () => {
  const [animationDone, setAnimationDone] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    setTimeout(() => {
      setAnimationDone(true);
    }, 1600);
  }, []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  if (!animationDone) {
    return (
      <View style={styles.whiteContainer}>
        <Animatable.View animation="zoomIn" duration={1500}>
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
        animation="lightSpeedIn"
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
          onPress={openBottomSheet}
          containerStyle={styles.btnContainer}
          textStyle={styles.btnText}
        />
      </Animatable.View>
      <CustomBottomSheet ref={bottomSheetRef} snaps={["90%"]}>
        <Login />
      </CustomBottomSheet>
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
    paddingHorizontal: 20,
  },
  largeIcon: {
    width: 150,
    height: 230,
  },
  smallIcon: {
    width: 150,
    height: 36,
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
