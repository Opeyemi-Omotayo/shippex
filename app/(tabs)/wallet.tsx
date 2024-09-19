import { StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import * as Animatable from "react-native-animatable";

const Wallet = () => {
  return (
    <ThemedView lightColor="#fff" style={styles.container}>
      <Animatable.View
        animation="rubberBand"
        duration={4000}
        iterationCount="infinite"
      >
        <ThemedText style={styles.text}>Wallet is coming soon!</ThemedText>
      </Animatable.View>
    </ThemedView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
