import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  Animated,
  Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import OcticonsIcons from "react-native-vector-icons/Octicons";
import FeatherIcons from "react-native-vector-icons/Feather";
import { images } from "../../Utils/imagedata";

interface PostData {
  likes: number;
  views: number;
  comments: number;
  liked: boolean;
  saved: boolean;
  userComment: string;
}
export default function Feed() {
  const [posts, setPosts] = useState<PostData[]>(
    [...Array(images.length)].map(() => ({
      likes: 120,
      views: 350,
      comments: 15,
      liked: false,
      saved: false,
      userComment: "",
    }))
  );

  const animatedValues = useRef(posts.map(() => new Animated.Value(1))).current;

  const toggleLike = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].liked = !updatedPosts[index].liked;
    updatedPosts[index].likes += updatedPosts[index].liked ? 1 : -1;
    setPosts(updatedPosts);

    // Animate the like button
    Animated.timing(animatedValues[index], {
      toValue: 1.2,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const toggleSave = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].saved = !updatedPosts[index].saved;
    setPosts(updatedPosts);
  };

  const handleCommentChange = (text: string, index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].userComment = text;
    setPosts(updatedPosts);
  };

  const submitComment = (index: number) => {
    const updatedPosts = [...posts];
    if (updatedPosts[index].userComment.trim()) {
      updatedPosts[index].comments += 1;
      updatedPosts[index].userComment = "";
      setPosts(updatedPosts);
      Keyboard.dismiss(); // Close the keyboard after submitting
    }
  };

  return (
    <ScrollView style={styles.postWrapper}>
      {posts.map((post, i) => (
        <View style={styles.postContainer} key={i}>
          {/* Header */}
          <View style={styles.postHeader}>
            <View style={styles.profileInfo}>
              <Image
                style={styles.avatar}
                source={{
                  // uri: "https://res.cloudinary.com/manish19/image/upload/v1726506341/ftedkmcuqzwy97jwjdqu.jpg",
                  uri: "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
                }}
              />
              <Text style={styles.username}>Manish keer</Text>
            </View>
            <EntypoIcon name="dots-three-vertical" size={18} color={"white"} />
          </View>

          {/* Post Image */}
          <View style={styles.postImageWrapper}>
            <Image style={styles.postImage} source={images[i]} />
          </View>

          {/* Action Icons */}
          <View style={styles.postActionsWrapper}>
            <View style={styles.leftIcons}>
              <Pressable
                onPress={() => toggleLike(i)}
                style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
              >
                <Animated.View
                  style={{ transform: [{ scale: animatedValues[i] }] }}
                >
                  <AntDesignIcon
                    name={post.liked ? "heart" : "hearto"}
                    color={post.liked ? "red" : "white"}
                    size={24}
                  />
                </Animated.View>
              </Pressable>

              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <OcticonsIcons name="comment" color={"white"} size={24} />
              </Pressable>

              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <FeatherIcons name="share" color={"white"} size={24} />
              </Pressable>
            </View>

            <Pressable
              onPress={() => toggleSave(i)}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <FeatherIcons
                name={post.saved ? "bookmark" : "bookmark"}
                color={post.saved ? "yellow" : "white"}
                size={24}
              />
            </Pressable>
          </View>

          {/* Like and View Count */}
          <View style={styles.postInfoWrapper}>
            <Text style={styles.postInfoText}>{post.likes} likes</Text>
            <Text style={styles.postInfoText}>{post.views} views</Text>
          </View>

          {/* Comment Count */}
          <Text style={styles.commentCount}>{post.comments} comments</Text>

          {/* Comment Input */}
          <View style={styles.commentInputWrapper}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="gray"
              value={post.userComment}
              onChangeText={(text) => handleCommentChange(text, i)}
              onSubmitEditing={() => submitComment(i)}
            />
          </View>

          {/* Post Description */}
          <Text style={styles.postDescription}>
            <Text style={styles.username}>Manish keer </Text>
            Enjoying the view! #travel #landscape
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postWrapper: {
    flex: 1,
    backgroundColor: "black", // Black background for Instagram-like look
  },
  postContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "black", // Slightly lighter background for the post
    shadowColor: "#000", // Shadow for depth effect
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // Shadow for Android
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "white",
    fontWeight: "bold",
  },
  postImageWrapper: {
    width: "100%",
    height: 350,
  },
  postImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  postActionsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  leftIcons: {
    flexDirection: "row",
    gap: 15,
  },
  postInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  postInfoText: {
    color: "white",
  },
  commentCount: {
    color: "white",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  commentInputWrapper: {
    padding: 10,
  },
  commentInput: {
    color: "white",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#333", // Dark background for input
  },
  postDescription: {
    color: "white",
    padding: 10,
  },
});
