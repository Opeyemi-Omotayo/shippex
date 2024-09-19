import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  Easing,
  ViewStyle,
  useColorScheme,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Shipment as ShipmentType } from "@/types";
import { Colors } from "@/constants/Colors";
import { API_SHIPMENT_LIST_DOCTYPE } from "@/constants/Api";
import { ExpandIcon } from "@/assets/icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tag, { TagVariant } from "../Tag";
import Button from "../Button";
import CheckBox from "../CheckBox";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface ShipmentProps {
  shipment: ShipmentType;
  markAll: boolean;
}

const status: { [key: string]: TagVariant } = {
  "New ShipmentTT": "received",
  "pup": "delivered",
  "test status": "cancelled",
};

const Shipment = ({ shipment, markAll }: ShipmentProps) => {
  const [checked, setChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const color = useColorScheme();
  const heightAnim = useRef(new Animated.Value(0)).current;
  
  const toggleMarkBtn = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [expanded, heightAnim]);

  const heightInterpolate = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    height: heightInterpolate,
    overflow: "hidden" as "hidden",
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const statusColor = status[shipment.status] || "received";

  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: checked || markAll ? 1 : 0,
          borderRadius: 10,
          borderColor: color === "dark" ? "gray" : Colors.primary,
        },
      ]}
    >
      <ThemedView
        darkColor="#303030"
        lightColor={Colors.lilac100}
        style={[
          styles.cardcontainer,
          {
            borderBottomStartRadius: expanded ? 0 : 10,
            borderBottomEndRadius: expanded ? 0 : 10,
          },
        ]}
      >
        <View style={styles.section}>
          <CheckBox
            onPress={toggleMarkBtn}
            title=""
            isChecked={checked || markAll}
            style={styles.checkbox}
          />
          <View style={styles.boxImageContainer}>
            <Image
              source={require("@/assets/images/box.png")}
              style={styles.boxImage}
            />
          </View>
          <View style={styles.details}>
            <Text
              style={[
                styles.detailsAssignment,
                { color: color === "dark" ? "#d4d4d4" : Colors.lilac700 },
              ]}
            >
              {API_SHIPMENT_LIST_DOCTYPE}
            </Text>
            <ThemedText style={styles.barcode}>{shipment.barcode.slice(0,12)}</ThemedText>
            <View style={styles.detailsCitiesContainer}>
              <Text
                style={[
                  styles.detailsCities,
                  { color: color === "dark" ? "#d4d4d4" : Colors.lilac500 },
                ]}
              >
                {shipment.origin_city.length > 5
                  ? `${shipment.origin_city.slice(0, 5)}...`
                  : shipment.origin_city}
              </Text>
              <MaterialCommunityIcons
                name="arrow-right"
                color={Colors.primary}
              />
              <Text style={[styles.detailsCities,{ color: color === "dark" ? "#d4d4d4" : Colors.lilac500 },]}>
                {shipment.destination_city.length > 5
                  ? `${shipment.destination_city.slice(0, 5)}...`
                  : shipment.destination_city}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.section]}>
          <Tag variant={statusColor} style={styles.tag} />
          <Pressable style={styles.expandIconContainer} onPress={toggleExpand}>
            <View
              style={[
                styles.expandIcon,
                {
                  backgroundColor: expanded ? Colors.blue200 : "white",
                },
              ]}
            >
              <ExpandIcon
                color={expanded ? "white" : Colors.blue600}
                width={16}
                height={16}
              />
            </View>
          </Pressable>
        </View>
      </ThemedView>
      {expanded && (
        <Animated.View
          style={[
            styles.expandedContent,
            animatedStyle,
            { backgroundColor: color === "dark" ? "#121212" : Colors.lilac50 },
          ]}
        >
          <View style={styles.expandedContent}>
            <View style={styles.expandedContentRow}>
              <View>
                <Text
                  style={[
                    styles.expandedContentTitle,
                    { color: color === "dark" ? "#d4d4d4" : Colors.primary },
                  ]}
                >
                  Origin
                </Text>
                <Text
                  style={[
                    styles.expandedContentCity,
                    { color: color === "dark" ? "#d4d4d4" : Colors.lilac700 },
                  ]}
                >
                  {shipment.origin_city}
                </Text>
                <Text
                  style={[
                    styles.expandedContentAddress,
                    { color: color === "dark" ? "#d4d4d4" : Colors.lilac500 },
                  ]}
                >
                  {shipment.origin_country}
                </Text>
              </View>
              <View>
                <MaterialCommunityIcons
                  name="arrow-right"
                  color={Colors.primary}
                  size={30}
                />
              </View>
              <View>
                <Text
                  style={[
                    styles.expandedContentTitle,
                    { color: color === "dark" ? "#d4d4d4" : Colors.primary },
                  ]}
                >
                  Destination
                </Text>
                <Text
                  style={[
                    styles.expandedContentCity,
                    { color: color === "dark" ? "#d4d4d4" : Colors.lilac700 },
                  ]}
                >
                  {shipment.destination_city}
                </Text>
                <Text
                  style={[
                    styles.expandedContentAddress,
                    { color: color === "dark" ? "#d4d4d4" : Colors.lilac500 },
                  ]}
                >
                  {shipment.destination_country}
                </Text>
              </View>
            </View>
            <View style={styles.expandedContentBtnsContainer}>
              <Button
                title="Call"
                containerStyle={[
                  styles.expandedContentBtn,
                  {
                    backgroundColor: Colors.blue200,
                  },
                ]}
                textStyle={styles.btnText}
                iconLeft={
                  <MaterialCommunityIcons
                    name="phone"
                    color="white"
                    size={24}
                  />
                }
              />
              <Button
                title="WhatsApp"
                containerStyle={[
                  styles.expandedContentBtn,
                  {
                    backgroundColor: Colors.green500,
                  },
                ]}
                textStyle={styles.btnText}
                iconLeft={
                  <MaterialCommunityIcons
                    name="whatsapp"
                    color="white"
                    size={24}
                  />
                }
              />
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  cardcontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    flex: 0,
    width: 24,
  },
  details: {
    marginLeft: 5,
  },
  detailsAssignment: {
    fontSize: 13,
  },
  detailsCities: {
    textTransform: "capitalize",
    fontSize: 13,
  },
  barcode: {
    fontSize: 15,
    fontWeight: "600"
  },
  detailsCitiesContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    gap: 4,
  },
  boxImageContainer: {
    flex: 0,
    justifyContent: "center",
  },
  boxImage: {
    width: 40,
    height: 40,
  },
  tag: {
    borderWidth: 1,
    borderColor: "white",
  },
  expandIconContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  expandIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  expandedContent: {
    padding: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  expandedContentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  expandedContentTitle: {
    fontSize: 12,
  },
  expandedContentCity: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  expandedContentAddress: {
    fontSize: 12,
  },
  expandedContentBtnsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-end",
    paddingTop: 10,
  },
  expandedContentBtn: {
    width: "auto",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default Shipment;
