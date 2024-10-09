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
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");

  // Function to pick an image from the user's system
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to handle the post submission
  const handlePost = () => {
    if (!image || !caption) {
      alert("Please select an image and add a caption");
      return;
    }
    // Here, you can handle the post submission logic (e.g., send data to backend)
    alert("Post submitted successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Post</Text>

      {/* Image Preview */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Select an image</Text>
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
    flex: 1,
    backgroundColor: "#000", // Black background for a sleek look
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePreview: {
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
    borderColor: "#333",
    borderRadius: 10,
    padding: 10,
    color: "white",
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#1a1a1a",
  },
  postButton: {
    backgroundColor: "#1a73e8", // Nice blue color for the button
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
