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
import React, { useState, useRef, useEffect } from "react";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import OcticonsIcons from "react-native-vector-icons/Octicons";
import FeatherIcons from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";

interface PostData {
  likes: number;
  comments: number;
  liked: boolean;
  saved: boolean;
  userComment: string;
}

export default function Feed() {
  const user = useSelector((state: any) => state.User.user);
  const [posts, setPosts] = useState<any[]>([]);

  // console.log("posts in feed ", posts);

  useEffect(() => {
    if (user) {
      setPosts(user.posts);
    }
  }, [user]);

  return (
    <ScrollView style={styles.postWrapper}>
      {posts.map((post, i) => (
        <View style={styles.postContainer} key={i}>
          {/* Header */}
          <View style={styles.postHeader}>
            <View style={styles.profileInfo}>
              <Image style={styles.avatar} source={{ uri: post.image }} />
              <Text style={styles.username}>Manish Keer</Text>
            </View>
            <EntypoIcon name="dots-three-vertical" size={18} color={"white"} />
          </View>

          {/* Post Image */}
          <View style={styles.postImageWrapper}>
            <Image
              style={styles.postImage}
              source={{ uri: post.image }} // Image from post data
            />
          </View>

          {/* Action Icons */}
          <View style={styles.postActionsWrapper}>
            <View style={styles.leftIcons}>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
              >
                <AntDesignIcon
                  name={post.liked ? "heart" : "hearto"}
                  color={post.liked ? "red" : "white"}
                  size={24}
                />
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
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <FeatherIcons
                name={post.saved ? "bookmark" : "bookmark"}
                color={post.saved ? "yellow" : "white"}
                size={24}
              />
            </Pressable>
          </View>

          {/* Like and Comment Count */}
          <View style={styles.postInfoWrapper}>
            <Text style={styles.postInfoText}>{post?.likes?.length} likes</Text>
            <Text style={styles.postInfoText}>
              {post?.comment?.length} comments
            </Text>
          </View>

          {/* Post Caption */}
          <Text style={styles.postDescription}>
            <Text style={styles.username}>Manish Keer </Text>
            {post.caption}
          </Text>

          {/* Location */}
          <Text style={styles.postLocation}>{post.location}</Text>

          {/* Comment Input */}
          <View style={styles.commentInputWrapper}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="gray"
              value={post.userComment || ""}
            />
          </View>
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
    backgroundColor: "black",
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
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
  postDescription: {
    color: "white",
    padding: 10,
  },
  postLocation: {
    color: "gray",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  commentInputWrapper: {
    padding: 10,
  },
  commentInput: {
    color: "white",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#333",
  },
});
