import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, Image, StyleSheet, Animated, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import { primary } from "@/constants/Colors";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import Login from "./login";

const { width } = Dimensions.get("window"); 

const Onboarding = () => {
  const [stage, setStage] = useState(1); 
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const logoScale = useRef(new Animated.Value(1)).current; 
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (stage === 1) {
      setTimeout(() => {
        setStage(2); 
      }, 1500); 
    } else if (stage === 2) {
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: width / 150, 
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setStage(3); 
      });
    }
  }, [stage]);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", primary], 
  });

  if (stage === 1) {
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

  if (stage === 2) {
    return (
      <Animated.View
        style={[
          styles.stageContainer,
          { backgroundColor: interpolatedBackgroundColor },
        ]}
      >
        <Animated.Image
          source={require("../../assets/images/icon1.png")}
          style={[
            styles.logoIcon,
            {
              transform: [{ scale: logoScale }], 
            },
          ]}
          resizeMode="contain"
        />
      </Animated.View>
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
  stageContainer: {
    flex: 1,
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
  logoIcon: {
    width: 150,
    height: 150,
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
