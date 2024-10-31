import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function AllStories({ stories = [], onNextStory }: any) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  //   const storyRef = useRef(null);

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      onNextStory && onNextStory(currentStoryIndex + 1);
    } else {
      setCurrentStoryIndex(0); // Reset to the first story if it’s the last
    }
  };

  const renderStoryItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={styles.storyContainer}
      onPress={() => {
        setCurrentStoryIndex(index);
        handleNextStory();
      }}
    >
      <Image source={{ uri: item.imageUri }} style={styles.storyImage} />
      <Text style={styles.storyText}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {stories.length > 0 ? (
        <FlatList
          ref={storyRef}
          data={stories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderStoryItem}
          contentContainerStyle={styles.storiesList}
        />
      ) : (
        <View style={styles.noStoryContainer}>
          <AntDesign name="frowno" size={64} color="#ccc" />
          <Text style={styles.noStoryText}>No stories available</Text>
          <Text style={styles.addStoryText}>
            Tap + to add your first story!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#000",
  },
  storiesList: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  storyContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#ff8501",
  },
  storyText: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  noStoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  noStoryText: {
    color: "#ccc",
    fontSize: 18,
    marginTop: 10,
  },
  addStoryText: {
    color: "#ff8501",
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
});
