import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  ProfileIcon,
  ProfileOutlineIcon,
  ScanIcon,
  ScanOutlineIcon,
  ShipmentIcon,
  ShipmentOutlineIcon,
  WalletIcon,
  WalletOutlineIcon,
} from "@/assets/icons";

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "white": Colors.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="shipments"
        options={{
          title: "Shipments",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ShipmentIcon color={color} />
            ) : (
              <ShipmentOutlineIcon color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ScanIcon color={color} />
            ) : (
              <ScanOutlineIcon color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <WalletIcon color={color} />
            ) : (
              <WalletOutlineIcon color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ProfileIcon color={color} />
            ) : (
              <ProfileOutlineIcon color={color} />
            ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
