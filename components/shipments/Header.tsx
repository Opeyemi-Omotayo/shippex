import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { BellIcon } from "@/assets/icons";
import { Colors } from "../../constants/Colors";
import { ThemedView } from "../ThemedView";

const userImage = require("@/assets/images/user.png");
const logo = require("@/assets/images/shippex-coloured.png");

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={userImage} style={styles.avatar} />
      </View>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.notificationBtnContainer}>
        <ThemedView lightColor={Colors.lilac100} darkColor="#303030" style={styles.notificationBtn}>
          <BellIcon />
        </ThemedView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 16,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 93,
    height: 16,
  },
  notificationBtnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
