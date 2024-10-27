import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  BackHandler,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

// Define types for User, Comment, and Props
type User = {
  name: string;
  profilePic: string;
};

type SubComment = {
  id: number;
  text: string;
  user: User;
};

type Comment = {
  id: number;
  text: string;
  user: User;
  subComments: SubComment[];
};

interface CommentSectionProps {
  commentModal: boolean;
  setCommentModal: (value: boolean) => void;
  comment: any;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comment,
  commentModal,
  setCommentModal,
}) => {
  // console.log("comment is in comment section ", comment);
  const [commentText, setCommentText] = useState<string>("");
  const [subCommentText, setSubCommentText] = useState<string>("");
  const [comments, setComments] = useState<any[]>();
  console.log("comments in comment section ", comments);
  const [showSharebtn, setShowSharebtn] = useState<boolean>(false);
  const user = useSelector((state: any) => state.User.user);

  useEffect(() => {
    setComments(comment);
  }, [comment]);

  useEffect(() => {
    const backAction = () => {
      setCommentModal(false); // Close the modal
      setCommentText("");
      setShowSharebtn(false);
      return true; // Prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup event listener
  }, [setCommentModal]);

  const addComment = () => {};

  const addSubComment = (parentId: number) => {};

  return (
    commentModal && (
      <View style={styles.modalContainer}>
        <View style={styles.indicator}></View>

        <Text style={styles.title}>Comments</Text>

        <FlatList
          data={comments}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }: any) => (
            <View style={styles.commentContainer}>
              <Image
                style={styles.profilePic}
                source={{ uri: item?.user?.profilePic }}
              />
              <View style={styles.commentTextContainer}>
                <Text style={styles.username}>{item?.user?.username}</Text>
                <Text style={styles.commentText}>{item?.comment}</Text>
                <View>
                  <TouchableOpacity style={{}}>
                    <Text style={{ color: "#3897f0" }}>Reply</Text>
                  </TouchableOpacity>
                </View>
                {/* {item.subComments.length > 0 && (
                  <FlatList
                    data={item.subComments}
                    keyExtractor={(subItem) => subItem.id.toString()}
                    renderItem={({ item: subItem }) => (
                      <View style={styles.subCommentContainer}>
                        <Image
                          style={styles.subProfilePic}
                          source={{ uri: subItem.user.profilePic }}
                        />
                        <View style={styles.subCommentTextContainer}>
                          <Text style={styles.username}>
                            {subItem.user.name}
                          </Text>
                          <Text style={styles.subCommentText}>
                            {subItem.text}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                )} */}
              </View>
              <Ionicons name="heart-outline" size={20} color="white" />
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <Image style={styles.profilePic} source={{ uri: user?.profilePic }} />
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            placeholderTextColor="#888"
            value={commentText}
            onChangeText={(value) => {
              if (value == "") {
                setShowSharebtn(false);
              }
              setShowSharebtn(true);
              setCommentText(value);
            }}
          />
          {showSharebtn ? (
            <TouchableOpacity onPress={addComment}>
              <MaterialIcons
                name="send"
                size={30}
                color="#007AFF"
                style={styles.sendIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.stickerIcon}>
              <Ionicons name="happy-outline" size={28} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    backgroundColor: "#212121",
    height: "95%",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: "pink",
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
    gap: 15,
    // borderWidth:2,
    // borderColor:"yellow"
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentTextContainer: {
    flex: 1,
    marginLeft: 10,
    gap: 8,
  },
  username: {
    color: "#f9f9f9",
    fontSize: 14,
    fontWeight: "bold",
  },
  commentText: {
    color: "white",
    fontSize: 16,
  },
  replyButton: {
    marginTop: 5,
    backgroundColor: "#333",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  replyButtonText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  subCommentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
    marginLeft: 50, // Indent sub-comments
  },
  subProfilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  subCommentTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  subCommentText: {
    color: "white",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  input: {
    flex: 1,
    backgroundColor: "#333",
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  sendIcon: {
    marginLeft: 10,
  },
  stickerIcon: {
    marginLeft: 10,
  },
});

export default CommentSection;
