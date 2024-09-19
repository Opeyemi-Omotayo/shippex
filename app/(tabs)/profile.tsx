import { Text, StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetLoggedInUserQuery} from "@/store/services/api";
import FullLoader from "@/components/Preloader/FullLoader";
import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";

const userImage = require("@/assets/images/user.png");

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: user, error, isLoading } = useGetLoggedInUserQuery();

  if (isLoading) {
    return <FullLoader />;
  }

  if (error || !user?.message) {
    return (
      <SafeAreaView>
        <Text>An Error Occurred! </Text>
      </SafeAreaView>
    );
  }

  const handleLogout = async () => {
    setLoading(true);
    setTimeout(() => {
      Toast.show({
        type: "success",
        text2: "Bye, We hope to see you soon!",
      });
      router.replace("/");
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image source={userImage} style={styles.avatar} />
        </View>
        <View>
          <ThemedText style={styles.person}>{user?.message}</ThemedText>
          <ThemedText style={styles.type}>User</ThemedText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          loading={loading}
          containerStyle={styles.btn}
          textStyle={styles.btnText}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  person: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  type: {
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  btn: {
    backgroundColor: Colors.primary,
    width: "100%",
    paddingVertical: 18,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
});

export default Profile;
