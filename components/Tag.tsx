import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export type TagVariant =
  | "received"
  | "delivered"
  | "cancelled"

interface TagProps {
  variant: TagVariant;
  title?: string;
  style?: object;
}

const titles = {
  received: "Received",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const Tag = ({ variant, title, style }: TagProps) => {
  const tagTitle = title || titles[variant];

  return (
    <View style={[styles.container, styles[variant], style]}>
      <Text style={[styles.title, styles[`${variant}Text`]]}>
        {tagTitle?.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
  },
  received: {
    backgroundColor: "#D9E6FD",
  },
  delivered: {
    backgroundColor: Colors.green100,
  },
  cancelled: {
    backgroundColor: Colors.red100
  },
  receivedText: {
    color: Colors.blue600,
  },
  deliveredText: {
    color: Colors.green600,
  },
  cancelledText: {
    color: Colors.red600,
  },
});

export default Tag;
