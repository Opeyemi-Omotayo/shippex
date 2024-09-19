import { View, StyleSheet, FlatList } from "react-native";
import React, { memo, useState } from "react";
import { Shipment as ShipmentType } from "@/types";
import { SHIPMENT_TITLE } from "@/constants/Title";
import Shipment from "./Shipment";
import CheckBox from "../CheckBox";
import { primary } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";

interface ShipmentsProps {
  shipments: ShipmentType[];
  refetch: () => void;
  isRefetching: boolean;
}

const MemoizedShipment = memo(Shipment);

const Shipments = ({ shipments, refetch, isRefetching }: ShipmentsProps) => {
  const [markAll, setMarkAll] = useState(false);

  const toggleMarkBtn = () => {
    setMarkAll(!markAll);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ShipmentType;
    index: number;
  }) => <MemoizedShipment shipment={item} key={`${item.idx}-${index}`} markAll={markAll} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>{SHIPMENT_TITLE}</ThemedText>
        <CheckBox
          title={markAll ? "Unmark All" : "Mark All"}
          isChecked={markAll}
          onPress={toggleMarkBtn}
          style={styles.checkbox}
          textStyle={styles.checkboxText}
        />
      </View>
      {shipments.length === 0 ? (
        <ThemedText style={styles.empty}>No Shipments Found!</ThemedText>
      ) : (
        <FlatList
          data={shipments}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.idx}-${item.name}`}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  empty: {
    fontSize: 12,
    fontWeight: "400",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 15,
  },
  checkbox: {
    justifyContent: "flex-end",
  },
  checkboxText: {
    fontSize: 18,
    color: primary,
    fontWeight: "400",
  },
});

export default Shipments;
