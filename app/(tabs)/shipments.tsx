import { useCallback, useRef, useState } from "react";
import { Platform, StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { debounce } from "lodash";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  useGetShipmentListQuery,
  useGetShipmentStatusListQuery,
} from "@/store/services/api";
import Header from "@/components/shipments/Header";
import Button from "@/components/Button";
import { AddScanIcon, FilterIcon } from "@/assets/icons";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import Shipments from "@/components/shipments/Shipments";
import ShipmentStatusFilters from "@/components/shipments/ShipmentStatusFilters";
import FullLoader from "@/components/Preloader/FullLoader";
import { TextInput } from "react-native-gesture-handler";
import { ThemedView } from "@/components/ThemedView";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import Greeting from "@/components/shipments/Greeting";

export default function ShipmentsScreen() {
  const router = useRouter();
  const color = useColorScheme();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [selectedStatusFilters, setSelectedStatusFilters] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const debouncer = useCallback(debounce(setDebouncedSearchValue, 500), []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data, error, isLoading, refetch, isFetching } =
    useGetShipmentListQuery({
      filters: {
        barcode: ["like", `%${debouncedSearchValue}%`],
        status: ["in", statusFilters],
      },
    });
    const {
      data: statuses,
      error: statusError,
      isLoading: statusIsLoading,
    } = useGetShipmentStatusListQuery();

  if (isLoading || statusIsLoading) {
    return <FullLoader />;
  }

  if (error || !data?.message || statusError || !statuses?.message) {
    return (
      <SafeAreaView>
        <Text>An Error Occured! </Text>
      </SafeAreaView>
    );
  }

  const onSearchValueChange = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
    if (newSearchValue !== searchValue) {
      debouncer(newSearchValue);
    }
  };

  const onSelectStatusFilter = (status: string) => {
    if (selectedStatusFilters.includes(status)) {
      setSelectedStatusFilters((prev) =>
        prev.filter((item) => item !== status)
      );
    } else {
      setSelectedStatusFilters((prev) => [...prev, status]);
    }
  };

  const onSelectedStatusFilters = () => {
    setStatusFilters(selectedStatusFilters);
    handleCloseBottomSheet();
  };

  const onCancelFiltering = () => {
    setSelectedStatusFilters([]);
    setStatusFilters([]);
    handleCloseBottomSheet();
  };
  const shipments = data.message;
  const shipmentStatuses = statuses.message;
  const handleCloseBottomSheet = () => bottomSheetRef.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRef.current?.expand();

  return (
    <ThemedView lightColor="#fff" style={styles.container}>
      <Header />
      <Greeting />
      <ThemedView darkColor="#303030" lightColor={Colors.lilac100} style={[styles.inputContainer,  isFocused && { borderColor: Colors.primary, borderWidth: 2 }]}>
        <AntDesign name="search1" size={24} color={Colors.lilac400} />
        <TextInput
          value={searchValue}
          onChangeText={onSearchValueChange}
          placeholder="Search"
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </ThemedView>
      <View style={styles.btnsContainer}>
        <Button
          title="Filters"
          iconLeft={<FilterIcon />}
          onPress={handleOpenBottomSheet}
          containerStyle={[styles.btn, {backgroundColor: color === "dark" ? "#303030" : Colors.lilac100}]}
          textStyle={[styles.btnText, {color: color === "dark" ? "white" : Colors.lilac600}]}
        />
        <Button
          title="Add Scan"
          iconLeft={<AddScanIcon />}
          onPress={() => {router.replace("/scan")}}
          containerStyle={styles.addScanBtn}
          textStyle={styles.addScanText}
        />
      </View>

      <Shipments
        shipments={shipments}
        refetch={refetch}
        isRefetching={isFetching}
      />

      <CustomBottomSheet
        ref={bottomSheetRef}
        snaps={["40%"]}
        title="Filters"
        headerBtnEndText="Done"
        headerBtnEndAction={onSelectedStatusFilters}
        showHeaderBorder
        headerBtnStartText="Cancel"
        headerBtnStartAction={onCancelFiltering}
      >
        <ShipmentStatusFilters
          statuses={shipmentStatuses}
          selectedStatusFilters={selectedStatusFilters}
          onSelectStatusFilter={onSelectStatusFilter}
        />
      </CustomBottomSheet>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginVertical: 10,
    borderColor: Colors.lilac200, 
    borderWidth: 1,
  },
  input: {
    fontSize:18,
    color: Colors.primary,
    paddingLeft: 8,
  },
  btnsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    position: "relative",
  },
  btn: {
    flex: 1,
    paddingVertical: 15,
    flexDirection: "row",
  },
  btnText: {
    paddingLeft: 8
  },
  addScanBtn: {
    flex: 1,
    paddingVertical: 15,
    flexDirection: "row",
    backgroundColor: Colors.primary,
  },
  addScanText: {
    color: "white",
    paddingLeft: 8
  }
});
