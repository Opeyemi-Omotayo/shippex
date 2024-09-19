import { StyleSheet, View, Text } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { ShipmentStatus } from "@/types";
import { SHIPMENT_STATUS_TITLE } from "@/constants/Title";
import { Colors } from "@/constants/Colors";

interface ShipmentStatusFiltersProps {
  statuses: ShipmentStatus[];
  selectedStatusFilters: string[];
  onSelectStatusFilter: (status: string) => void;
}

const ShipmentStatusFilters = ({
  statuses,
  selectedStatusFilters,
  onSelectStatusFilter,
}: ShipmentStatusFiltersProps) => {
  const isStatusSelected = (status: string) => selectedStatusFilters.includes(status);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{SHIPMENT_STATUS_TITLE.toUpperCase()}</Text>
      <View style={styles.statusBtnsContainer}>
        {statuses.map((status, index) => {
          const isSelected = isStatusSelected(status.name);
          return (
            <Button
              title={status.name}
              key={`${status.idx}-${index}`}
              onPress={() => onSelectStatusFilter(status.name)}
              containerStyle={[styles.statusBtn, isSelected && styles.statusBtnSelected]}
              textStyle={[
                styles.statusBtnText,
                isSelected && styles.statusBtnSelectedText,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 14,
    padding: 14,
  },
  title: {
    marginBottom: 16,
    color: Colors.lilac600,
    fontWeight: "500",
  },
  statusBtnsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statusBtn: {
    width: "auto",
    backgroundColor: Colors.lilac100,
    padding:10
  },
  statusBtnText: {
    fontSize: 14,
    fontWeight: "400",
    textTransform: "capitalize",
    color: Colors.lilac600
  },
  statusBtnSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  statusBtnSelectedText: {
    color: Colors.primary,
  },
});

export default ShipmentStatusFilters;
