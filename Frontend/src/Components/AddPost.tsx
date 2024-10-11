import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddPost() {
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");

  // Function to pick media (images or videos)
  const pickMedia = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
    }
  };

  // Function to handle the post submission
  const handlePost = () => {
    if (!mediaUri || !caption) {
      alert("Please select media and add a caption");
      return;
    }
    alert("Post submitted successfully!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }} // Replace with your profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.headerText}>Create New Post</Text>
      </View>

      {/* Media Preview */}
      <TouchableOpacity onPress={pickMedia} style={styles.mediaContainer}>
        {mediaUri ? (
          <Image source={{ uri: mediaUri }} style={styles.mediaPreview} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Select an image or video</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Caption Input */}
      <TextInput
        placeholder="Write a caption..."
        placeholderTextColor="gray"
        value={caption}
        onChangeText={setCaption}
        style={styles.captionInput}
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity onPress={handlePost} style={styles.postButton}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mediaContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  mediaPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "gray",
    fontSize: 16,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    color: "#000",
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  postButton: {
    backgroundColor: "#1a73e8", // Instagram-like blue color for the button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
