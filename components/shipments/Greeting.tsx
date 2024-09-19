import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

const Greeting = () => {
  return (
    <View style={styles.container}>
      <ThemedText darkColor="#d4d4d4" lightColor="grey" style={styles.helloText}>
        Hello,
      </ThemedText>
      <ThemedText style={styles.person}>Ibrahim Shaker</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  helloText: {
    fontSize: 16,
    paddingBottom: 4,
  },
  person: {
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 30
  },
});

export default Greeting;
