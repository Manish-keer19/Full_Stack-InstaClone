import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

const Footer: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Type-safe navigation

  return (
    <View style={styles.footer}>
      {/* Home Icon - Navigates to Home Screen */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="home-outline" size={30} color="white" />
      </TouchableOpacity>

      {/* Add Icon - Navigates to Add Post Screen */}
      <TouchableOpacity onPress={() => navigation.navigate("AddPost")}>
        <Ionicons name="add-circle-outline" size={30} color="white" />
      </TouchableOpacity>

      {/* Play Icon - Navigates to Video or Reels Screen */}
      <TouchableOpacity onPress={() => navigation.navigate("Reels")}>
        <Ionicons name="play-outline" size={30} color="white" />
      </TouchableOpacity>

      {/* Profile Icon - Navigates to Profile Screen */}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    backgroundColor: "black",
    borderTopWidth: 1,
    borderTopColor: "pink",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default Footer;
