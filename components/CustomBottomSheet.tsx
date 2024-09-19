import { View, StyleSheet, Text, TouchableOpacity, useColorScheme } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { Colors, primary } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
export type Ref = BottomSheet;

interface Props {
  title?: string;
  snaps?: string[];
  children?: React.ReactNode;
  headerBtnEndText?: string;
  headerBtnEndAction?: () => void;
  showHeaderBorder?: boolean;
  headerBtnStartText?: string;
  headerBtnStartAction?: () => void;
}

const CloseBtn = () => {
  const { close } = useBottomSheet();
  return (
    <TouchableOpacity style={styles.btn} onPress={() => close()}>
      <Text style={styles.btnText}>Cancel</Text>
    </TouchableOpacity>
  );
};

const CustomBottomSheet = forwardRef<Ref, Props>(
  (
    {
      children,
      title,
      headerBtnEndText,
      headerBtnEndAction,
      showHeaderBorder,
      headerBtnStartText,
      headerBtnStartAction,
      snaps = ["25", "50", "75"],
      ...props
    },
    ref,
  ) => {
    const snapPoints = useMemo(() => snaps, [snaps]);
    const colorScheme = useColorScheme();
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        {...props}
      >
        <BottomSheetView style={[styles.contentContainer,{ backgroundColor: colorScheme === 'dark' ? "#151718" : 'white', borderTopLeftRadius: colorScheme === 'dark' ? 15 : 0, borderTopRightRadius: colorScheme === 'dark' ? 15 : 0  }]}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <View
            style={[
              styles.headerContainer,
              {
                borderBottomWidth: showHeaderBorder ? 0.5 : 0,
                borderBottomColor: Colors.lilac600,
              },
            ]}
          >
            {headerBtnStartText && headerBtnStartAction ? (
              <TouchableOpacity style={styles.btn} onPress={headerBtnStartAction}>
                <Text style={styles.btnText}>{headerBtnStartText}</Text>
              </TouchableOpacity>
            ) : (
              <CloseBtn />
            )}
            {headerBtnEndText && headerBtnEndAction && (
              <TouchableOpacity style={styles.btn} onPress={headerBtnEndAction}>
                <Text style={styles.btnText}>{headerBtnEndText}</Text>
              </TouchableOpacity>
            )}
          </View>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
CustomBottomSheet.displayName = "CustomBottomSheetContext";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 10
  },
  headerContainer: {
    width: "100%",
    paddingTop: 5,
    paddingBottom: 14,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    position: "absolute",
    top: 2,
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600"
  },
  btn: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  btnText: {
    color: primary,
    fontSize: 17,
    marginLeft: 5,
  },
});

export default CustomBottomSheet;
