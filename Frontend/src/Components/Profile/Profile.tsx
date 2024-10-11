import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EntypoIcons from "@expo/vector-icons/Entypo";
import Footer from "../Footer";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { NavigationProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useLoadProfileData } from "../../features/Profile/ProfileSlice";
import { images } from "../../Utils/imagedata";

const posts = images;
const reels = images;
const tagged = images;

export default function Profile() {
  useLoadProfileData();
  const profileData = useSelector((state: any) => state.Profile.profileData);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState("Posts");

  const renderPost = ({ item }: { item: { id: number; uri: string } }) => (
    <TouchableOpacity
      style={styles.postWrapper}
      onPress={() => navigation.navigate("Post")}
    >
      <Image source={{ uri: item.uri }} style={styles.postImage} />
    </TouchableOpacity>
  );

  const getData = () => {
    switch (activeTab) {
      case "Posts":
        return posts;
      case "Reels":
        return reels;
      case "Tagged":
        return tagged;
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.profileUsername}>Manish Keer</Text>
        <EntypoIcons name="chevron-small-down" color={"white"} size={28} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileInfo}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://res.cloudinary.com/manish19/image/upload/v1726506341/ftedkmcuqzwy97jwjdqu.jpg",
          }}
        />
        <View style={styles.statsWrapper}>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>120</Text>
            <Text style={styles.statsLabel}>Posts</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>5k</Text>
            <Text style={styles.statsLabel}>Followers</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>500</Text>
            <Text style={styles.statsLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.bioContainer}>
        {profileData && (
          <>
            {profileData.username && (
              <Text style={styles.bio}>{profileData.username}</Text>
            )}
            {profileData.name && (
              <Text style={styles.bio}>{profileData.name}</Text>
            )}
            {profileData.Pronoun && (
              <Text style={styles.bio}>{profileData.Pronoun}</Text>
            )}
            {profileData.bio && (
              <Text style={styles.bio}>{profileData.bio}</Text>
            )}
          </>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.archiveButton}>
          <Ionicons name="archive-outline" size={18} color="white" />
          <Text style={styles.buttonText}>Go to Archive</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("Posts")}
          style={activeTab === "Posts" ? styles.activeTab : styles.tab}
        >
          <Ionicons name="grid-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Reels")}
          style={activeTab === "Reels" ? styles.activeTab : styles.tab}
        >
          <Ionicons name="play-circle-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Tagged")}
          style={activeTab === "Tagged" ? styles.activeTab : styles.tab}
        >
          <Ionicons name="person-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Posts/Reels/Tagged Grid */}
      <FlatList
        data={getData()}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}  // Convert id to string for keyExtractor
        numColumns={3}
        style={styles.postsContainer}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "black",
    paddingTop: 10,
  },
  header: {
    marginTop: 43,
    flexDirection: "row",
    alignItems: "center",
  },
  profileUsername: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 14,
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  statsWrapper: {
    flexDirection: "row",
  },
  statsContainer: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  statsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  statsLabel: {
    fontSize: 14,
    color: "gray",
  },
  bioContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  bio: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  editProfileButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: "center",
    marginRight: 10,
  },
  archiveButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 5,
    paddingVertical: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tab: {
    alignItems: "center",
    padding: 10,
  },
  activeTab: {
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  postsContainer: {
    minHeight: 200,
  },
  postWrapper: {
    width: "33%",
    margin: 3,
    borderRadius: 4,
  },
  postImage: {
    width: "100%",
    height: 140,
    borderRadius: 4,
  },
});
