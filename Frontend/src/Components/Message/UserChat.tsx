import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useLoadUserData } from "../../features/user/userSlice";
import { MessageServiceInstance } from "../../services/MessageService";

export default function UserChat({ route }: any) {
  useLoadUserData();
  const currentUser = useSelector((state: any) => state.User.user);
  console.log("currentUser in user chat", currentUser);

  const { user } = route.params;
  console.log("user in user chat", user);
  // Reference to ScrollView
  const scrollViewRef = useRef<ScrollView>(null);

  const currentUserId = currentUser?._id;
  const anotherUserId = user?._id;
  // const socket = io("http://192.168.81.139:3000");
  const socket = io("http://192.168.190.139:3000");
  const [messages, setMessages] = useState<any>();
  console.log("messages in user chat", messages);

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const messageObj = {
      currentUser: currentUserId,
      anotherUser: anotherUserId,
      sender: currentUser?._id,
      message: message,
    }; // Mark the message as sent by "me"
    socket.emit("sendMessage", messageObj); // Send message to server
    setMessage("");
  };

  useEffect(() => {
    socket.on("receiveMessage", (messageData) => {
      console.log("messageData in user chat", messageData);
      setMessages(messageData.messages);
      // Scroll to the end when a new message is received
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      socket.off("receiveMessage"); // Clean up the listener on component unmount
    };
  }, []);

  const fetchMessages = async () => {
    const data = {
      anotherUserId: anotherUserId,
      currentUserId: currentUserId,
    };
    try {
      const res = await MessageServiceInstance.getMessages(data);
      console.log("res in user chat", res);
      if (res) {
        setMessages(res.messages.messages);
      }
    } catch (error) {
      console.log("could not get the messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: user?.profilePic,
              }}
              style={styles.userImage}
            />
            <View>
              <Text style={styles.userName}>{user?.username}</Text>
              <Text style={styles.userStatus}>Online</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <MaterialIcons name="call" size={24} color="white" />
          <FontAwesome name="video-camera" size={24} color="white" />
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef} // Attach ref to ScrollView
        style={styles.messageContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages?.length > 0 ? (
          <View style={styles.messageWrapper}>
            {messages.map((msg: any, i: any) => (
              <View
                key={i}
                style={[
                  styles.message,
                  msg.sender?._id == currentUser?._id
                    ? styles.userMessage
                    : styles.otherUserMessage,
                ]}
              >
                {msg.sender?._id == currentUser?._id ? (
                  <>
                    <Text style={styles.userMessageText}>{msg.message}</Text>
                    <Image
                      source={{
                        uri: msg.sender?.profilePic,
                      }}
                      style={styles.userImageSmall}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      source={{
                        uri: msg.sender?.profilePic,
                      }}
                      style={styles.otherUserImageSmall}
                    />
                    <Text style={styles.otherUserMessageText}>
                      {msg.message}
                    </Text>
                  </>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 600,
              // borderWidth:2,
              // borderColor:"blue"
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: 30,
              }}
            >
              No messages yet please start conversation
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="camera" size={24} color="white" />
          <TextInput
            style={styles.textInput}
            placeholder="Message..."
            placeholderTextColor={"white"}
            value={message}
            onChangeText={(value) => setMessage(value)}
          />
        </View>
        <View style={styles.iconContainer}>
          {message.length > 0 ? (
            <TouchableOpacity style={{ paddingHorizontal: 20 }}>
              <FontAwesome
                name="paper-plane"
                size={24}
                color="white"
                onPress={handleSendMessage}
              />
            </TouchableOpacity>
          ) : (
            <>
              <FontAwesome name="microphone" size={24} color="white" />
              <FontAwesome name="image" size={24} color="white" />
              <MaterialCommunityIcons
                name="sticker-emoji"
                size={24}
                color="white"
              />
              <FontAwesome name="plus" size={24} color="white" />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    paddingTop: 30,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  userName: {
    color: "white",
  },
  userStatus: {
    color: "white",
    fontSize: 13,
  },
  headerRight: {
    flexDirection: "row",
    gap: 15,
    marginRight: 10,
  },
  messageContainer: {
    marginTop: 20,
    maxHeight: 600,
  },
  messageWrapper: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    // borderWidth: 2,
    // borderColor: "blue",
    // minHeight: 300,
  },
  userMessage: {
    // borderWidth: 2,
    // borderColor: "white",
    justifyContent: "flex-end",
    marginRight: 25,
    gap: 10,
  },
  userMessageText: {
    color: "white",
    backgroundColor: "#212121",
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    marginLeft: 10,
  },
  otherUserMessage: {
    justifyContent: "flex-start",
    gap: 10,
  },
  otherUserMessageText: {
    color: "black",
    backgroundColor: "white",
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    marginRight: 10,
  },
  otherUserImageSmall: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  userImageSmall: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#393939",
    position: "absolute",
    bottom: 20,
    width: "95%",
    borderRadius: 20,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  textInput: {
    color: "white",
    // borderWidth: 2,
    // borderColor: "blue",
    paddingRight: 80,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
