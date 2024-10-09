import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { UserServiceInstance } from "../../services/Userservice";
import { setProfileData } from "../../features/Profile/ProfileSlice";

// Dummy data for posts and reels
const posts = [
  {
    id: "1",
    image:
      "https://res.cloudinary.com/manish19/image/upload/v1726505860/huur9oubvhlwi9sqw0go.jpg",
  },
  {
    id: "2",
    image:
      "https://res.cloudinary.com/manish19/image/upload/v1726505860/huur9oubvhlwi9sqw0go.jpg",
  },
  // Add more images as needed
];

const reels = [
  {
    id: "1",
    image:
      "https://res.cloudinary.com/manish19/image/upload/v1726506341/ftedkmcuqzwy97jwjdqu.jpg",
  },
  {
    id: "2",
    image:
      "https://res.cloudinary.com/manish19/image/upload/v1726506341/ftedkmcuqzwy97jwjdqu.jpg",
  },
  // Add more reel images as needed
];

const tagged = [
  {
    id: "1",
    image:
      "https://res.cloudinary.com/manish19/image/upload/v1726506341/ftedkmcuqzwy97jwjdqu.jpg",
  },
  {
    id: "2",
    image:
      "https://res.cloudinary.com/manish19/image/upload/v1726506341/ftedkmcuqzwy97jwjdqu.jpg",
  },
  // Add more tagged images
];

export default function Profile() {
  const dispatch = useDispatch();
  const profileData = useSelector((state: any) => state.Profile.profileData);
  console.log("Profile data is  is ", profileData);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState("Posts");

  const renderPost = ({ item }: { item: { id: string; image: string } }) => (
    <Image source={{ uri: item.image }} style={styles.postImage} />
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

  // const getuserdata = async () => {
  //   const data1 = {
  //     email: "manishkeer530@gmail.com",
  //   };
  //   try {
  //     const data = await UserServiceInstance.getUserData(data1);
  //     if (data) {
  //       console.log("data in profile", data.userdata.profile);
  //       dispatch(setProfileData(data.userdata.profile));
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // useEffect(() => {
  //   getuserdata();
  // }, []);

  return (
    <View style={styles.container}>
      {/* Header with username and icon */}
      <View
        style={{ marginTop: 43, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={styles.profileUsername}>Manish keer</Text>
        <EntypoIcons name="chevron-small-down" color={"white"} size={28} />
      </View>

      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          {/* User's Image */}
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://res.cloudinary.com/manish19/image/upload/v1726506341/ftedkmcuqzwy97jwjdqu.jpg",
              }}
            />
          </View>

          {/* Profile Stats */}
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
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          {profileData && (
            <>
              {profileData.username && (
                <Text style={styles.bio}>{profileData.username}</Text>
              )}
              {profileData.name && (
                <Text style={styles.bio}>{profileData.name}</Text>
              )}
              {profileData.bio && (
                <Text style={styles.bio}>{profileData.bio}</Text>
              )}
              {profileData.Pronoun && (
                <Text style={styles.bio}>{profileData.Pronoun}</Text>
              )}
            </>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.archiveButton}>
            <Ionicons name="archive-outline" size={18} color="white" />
            <Text style={styles.buttonText}>Go to Archive</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Section */}
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
        keyExtractor={(item) => item.id}
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
  profileUsername: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 14,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  statsContainer: {
    alignItems: "center",
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
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
  },
  bio: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  postsContainer: {
    minHeight: 200,
  },
  postImage: {
    width: "33%",
    height: 140,
    margin: 3,
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
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
});
