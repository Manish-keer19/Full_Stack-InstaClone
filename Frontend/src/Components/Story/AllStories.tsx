// // import React, { useState, useRef } from "react";
// // import {
// //   View,
// //   Text,
// //   Image,
// //   StyleSheet,
// //   TouchableOpacity,
// //   FlatList,
// // } from "react-native";
// // import AntDesign from "react-native-vector-icons/AntDesign";
// // import { useSelector } from "react-redux";

// // export default function AllStories() {
// //   const { user } = useSelector((state: any) => state.User);
// //   const stories = {
// //     _id: "671ce3d547c38efe28d4c5b0",
// //     user: "67132fb18cb9126630acbb2a",
// //     stories: [
// //       {
// //         content:
// //           "https://res.cloudinary.com/manish19/image/upload/v1729946581/stories/enis7ybthzw95x90fn3f.jpg",
// //         mediaType: "image",
// //         createdAt: "2024-10-26T12:43:01.781Z",
// //         publicId: "stories/enis7ybthzw95x90fn3f",
// //         _id: "671ce3d547c38efe28d4c5b1",
// //       },
// //       {
// //         content:
// //           "https://res.cloudinary.com/manish19/image/upload/v1729946654/stories/zayootnqqx43fm1v1l9g.jpg",
// //         mediaType: "image",
// //         createdAt: "2024-10-26T12:44:15.521Z",
// //         publicId: "stories/zayootnqqx43fm1v1l9g",
// //         _id: "671ce41f47c38efe28d4c5ba",
// //       },
// //       {
// //         content:
// //           "https://res.cloudinary.com/manish19/image/upload/v1730362893/stories/klvry9fveihbu8kxnkdr.jpg",
// //         mediaType: "image",
// //         createdAt: "2024-10-31T08:21:35.577Z",
// //         publicId: "stories/klvry9fveihbu8kxnkdr",
// //         _id: "67233e0f5c2aa9504e50d9d6",
// //       },
// //       {
// //         content:
// //           "https://res.cloudinary.com/manish19/image/upload/v1730362974/stories/srgoeu8rprudhh2jwonj.png",
// //         mediaType: "image",
// //         createdAt: "2024-10-31T08:22:56.329Z",
// //         publicId: "stories/srgoeu8rprudhh2jwonj",
// //         _id: "67233e605c2aa9504e50d9e0",
// //       },
// //     ],
// //     __v: 0,
// //   };

// //   return (
// //     <View
// //       style={{
// //         width: "100%",
// //         height: "100%",
// //         backgroundColor: "#595959",
// //         paddingTop: 50,
// //       }}
// //     >
// //       <View
// //         style={{ width: "100%", height: 2, backgroundColor: "white" }}
// //       ></View>

// //       <View style={{ width: "100%", padding: 3 }}>
// //         <View
// //           style={{
// //             flexDirection: "row",
// //             // borderWidth: 2,
// //             // borderColor: "blue",
// //             alignItems: "center",
// //           }}
// //         >
// //           <View
// //             style={{
// //               flexDirection: "row",
// //               alignItems: "center",
// //               position: "relative",
// //             }}
// //           >
// //             <Image
// //               source={{ uri: user?.profilePic }}
// //               style={{ width: 50, height: 50, borderRadius: 50, marginTop: 4 }}
// //             />
// //             <View
// //               style={{
// //                 backgroundColor: "blue",
// //                 borderRadius: 50,
// //                 width: 15,
// //                 height: 15,
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 position: "absolute",
// //                 bottom: 4,
// //                 right: 5,
// //               }}
// //             >
// //               <AntDesign name="plus" size={15} color="white" />
// //             </View>
// //           </View>
// //           <Text
// //             style={{
// //               color: "white",
// //               marginLeft: 10,
// //               fontSize: 20,
// //               fontWeight: "bold",
// //             }}
// //           >
// //             {user.username}
// //           </Text>
// //           <Text style={{ color: "white", marginLeft: 10, fontSize: 15 }}>
// //             15s
// //           </Text>
// //         </View>
// //       </View>
// //       <View
// //         style={{
// //           width: "100%",
// //           height: "85%",
// //           // borderWidth: 2,
// //           // borderColor: "red",
// //           marginTop: 10,
// //           alignItems: "center",
// //         }}
// //       >
// //         <Image
// //           style={{ height: "90%", width: "95%", borderRadius: 4 }}
// //           source={{ uri: stories?.stories[2]?.content }}
// //         />
// //       </View>
// //       <View
// //         style={{
// //           width: "100%",
// //           height: "25%",
// //           backgroundColor: "black",
// //           flexDirection: "row",
// //           justifyContent: "space-between",
// //         }}
// //       >
// //         <View
// //           style={{
// //             flexDirection: "row",
// //             gap: 4,
// //             alignItems: "center",
// //             padding: 10,
// //           }}
// //         >
// //           <AntDesign name="left" size={24} color="white" />
// //           <Text style={{ color: "white", fontWeight: "bold" }}>
// //             Posting....
// //           </Text>
// //         </View>
// //         <AntDesign name="dotchart" size={24} color="white" />
// //       </View>
// //     </View>
// //   );
// // }

// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
// } from "react-native";
// import { useSelector } from "react-redux";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import { StoryServiceInstance } from "../../services/storyServices";

// const STORY_DURATION = 10000; // 10 seconds

// export default function AllStories() {
//   const { user } = useSelector((state: any) => state.User);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const progress = useRef(new Animated.Value(0)).current;
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const [stories, setStories] = useState<{}>();

//   // const stories = {
//   //   _id: "671ce3d547c38efe28d4c5b0",
//   //   user: "67132fb18cb9126630acbb2a",
//   //   stories: [
//   //     {
//   //       content:
//   //         "https://res.cloudinary.com/manish19/image/upload/v1729946581/stories/enis7ybthzw95x90fn3f.jpg",
//   //       mediaType: "image",
//   //       createdAt: "2024-10-26T12:43:01.781Z",
//   //       publicId: "stories/enis7ybthzw95x90fn3f",
//   //       _id: "671ce3d547c38efe28d4c5b1",
//   //     },

//   //     {
//   //       content:
//   //         "https://res.cloudinary.com/manish19/image/upload/v1730362893/stories/klvry9fveihbu8kxnkdr.jpg",
//   //       mediaType: "image",
//   //       createdAt: "2024-10-31T08:21:35.577Z",
//   //       publicId: "stories/klvry9fveihbu8kxnkdr",
//   //       _id: "67233e0f5c2aa9504e50d9d6",
//   //     },
//   //   ],
//   //   __v: 0,
//   // };

//   const fetchStories = async () => {
//     try {
//       // Fetch stories from your API
//       const res = await StoryServiceInstance.getStories(user._id);
//       if (res) {
//         setStories(res.story);
//       }
//     } catch (error) {
//       console.log("Error fetching stories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStories();
//   }, [user._id]);

//   // Auto-advance on each story change
//   useEffect(() => {
//     startProgressAnimation();

//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, [currentStoryIndex]);

//   const startProgressAnimation = () => {
//     Animated.timing(progress, {
//       toValue: 1,
//       duration: STORY_DURATION,
//       useNativeDriver: false,
//     }).start(({ finished }) => {
//       if (finished) {
//         handleNextStory();
//       }
//     });

//     if (timerRef.current) clearTimeout(timerRef.current);
//     timerRef.current = setTimeout(handleNextStory, STORY_DURATION);
//   };

//   const resetAnimation = () => {
//     progress.setValue(0);
//     if (timerRef.current) clearTimeout(timerRef.current);
//     startProgressAnimation();
//   };

//   const handleNextStory = () => {
//     if (currentStoryIndex + 1 < stories.stories.length) {
//       setCurrentStoryIndex(currentStoryIndex + 1);
//     } else {
//       setCurrentStoryIndex(0); // loop back to the first story
//     }
//     resetAnimation();
//   };

//   const handlePrevStory = () => {
//     if (currentStoryIndex - 1 >= 0) {
//       setCurrentStoryIndex(currentStoryIndex - 1);
//     } else {
//       setCurrentStoryIndex(stories.stories.length - 1); // go to the last story
//     }
//     resetAnimation();
//   };

//   const calculateTimeAgo = (createdAt: string) => {
//     const now = new Date();
//     const storyDate = new Date(createdAt);
//     const differenceInSeconds = Math.floor(
//       (now.getTime() - storyDate.getTime()) / 1000
//     );

//     if (differenceInSeconds < 60) return `${differenceInSeconds}s ago`;
//     const differenceInMinutes = Math.floor(differenceInSeconds / 60);
//     if (differenceInMinutes < 60) return `${differenceInMinutes}m ago`;
//     const differenceInHours = Math.floor(differenceInMinutes / 60);
//     if (differenceInHours < 24) return `${differenceInHours}h ago`;
//     const differenceInDays = Math.floor(differenceInHours / 24);
//     return `${differenceInDays}d ago`;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.progressContainer}>
//         {stories.stories.map((_, index) => (
//           <View key={index} style={styles.progressBarBackground}>
//             <Animated.View
//               style={[
//                 styles.progressBarFill,
//                 index === currentStoryIndex
//                   ? { flex: progress }
//                   : index < currentStoryIndex
//                   ? { flex: 1 }
//                   : { flex: 0 },
//               ]}
//             />
//           </View>
//         ))}
//       </View>

//       <View style={styles.header}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: user?.profilePic }} style={styles.profilePic} />
//           <View style={styles.addIcon}>
//             <AntDesign name="plus" size={12} color="white" />
//           </View>
//         </View>
//         <Text style={styles.username}>{user.username}</Text>
//         <Text style={styles.timeAgo}>
//           {calculateTimeAgo(stories.stories[currentStoryIndex].createdAt)}
//         </Text>
//       </View>

//       <View style={styles.storyImageContainer}>
//         <TouchableOpacity
//           style={styles.leftTouchableArea}
//           onPress={handlePrevStory}
//           activeOpacity={0.9}
//         />
//         <Image
//           style={styles.storyImage}
//           source={{ uri: stories.stories[currentStoryIndex].content }}
//         />
//         <TouchableOpacity
//           style={styles.rightTouchableArea}
//           onPress={handleNextStory}
//           activeOpacity={0.9}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#1e1e1e",
//     paddingTop: 50,
//   },
//   progressContainer: {
//     flexDirection: "row",
//     position: "absolute",
//     top: 40,
//     left: 10,
//     right: 10,
//     height: 2,
//     zIndex: 1,
//   },
//   progressBarBackground: {
//     flex: 1,
//     backgroundColor: "gray",
//     marginHorizontal: 2,
//     borderRadius: 2,
//   },
//   progressBarFill: {
//     height: 2,
//     backgroundColor: "white",
//     borderRadius: 2,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 8,
//   },
//   userInfo: {
//     position: "relative",
//   },
//   profilePic: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   addIcon: {
//     backgroundColor: "blue",
//     borderRadius: 50,
//     width: 15,
//     height: 15,
//     position: "absolute",
//     bottom: 4,
//     right: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   username: {
//     color: "white",
//     marginLeft: 10,
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   timeAgo: {
//     color: "gray",
//     marginLeft: 10,
//     fontSize: 15,
//   },
//   storyImageContainer: {
//     width: "100%",
//     height: "85%",
//     marginTop: 10,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   leftTouchableArea: {
//     flex: 1,
//     height: "100%",
//     // backgroundColor: "blue",
//     paddingLeft: 100,
//     position: "absolute",
//     left: 0,
//     zIndex: 10,
//   },
//   storyImage: {
//     height: "90%",
//     width: "95%",
//     borderRadius: 10,
//   },
//   rightTouchableArea: {
//     flex: 1,
//     height: "100%",
//     // backgroundColor: "blue",
//     paddingRight: 100,
//     position: "absolute",
//     zIndex: 10,
//     right: 0,
//   },
// });

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Pressable,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import { StoryServiceInstance } from "../../services/storyServices";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import StoryEditModal from "../Modal/StoryEditModal";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../Entryroute";

// const STORY_DURATION = 5000; // 10 seconds

export default function AllStories({ route }: any) {
  let { user, token } = useSelector((state: any) => state.User);
  const currentUser = user;
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const progress = useRef(new Animated.Value(0)).current;
  // const timerRef = useRef<NodeJS.Timeout | null>(null);
  // const [stories, setStories] = useState<any>(null);
  const [stories, setStories] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [storyEditModal, setStoryEditModal] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const anotherUser = route.params && route.params.user;
  if (anotherUser) {
    user = anotherUser;
  }

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await StoryServiceInstance.getStories(user._id);
      if (res) {
        console.log("Res is ", res);
        setStories(res.story);
      }
    } catch (error) {
      console.log("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  // const story = {
  //   story: {
  //     _id: "671ce3d547c38efe28d4c5b0",
  //     user: "67132fb18cb9126630acbb2a",
  //     stories: [
  //       {
  //         content:
  //           "https://res.cloudinary.com/manish19/image/upload/v1729946581/stories/enis7ybthzw95x90fn3f.jpg",
  //         mediaType: "image",
  //         createdAt: "2024-10-26T12:43:01.781Z",
  //         publicId: "stories/enis7ybthzw95x90fn3f",
  //         _id: "671ce3d547c38efe28d4c5b1",
  //       },
  //       {
  //         content:
  //           "https://res.cloudinary.com/manish19/image/upload/v1729946654/stories/zayootnqqx43fm1v1l9g.jpg",
  //         mediaType: "image",
  //         createdAt: "2024-10-26T12:44:15.521Z",
  //         publicId: "stories/zayootnqqx43fm1v1l9g",
  //         _id: "671ce41f47c38efe28d4c5ba",
  //       },
  //       {
  //         content:
  //           "https://res.cloudinary.com/manish19/image/upload/v1730362893/stories/klvry9fveihbu8kxnkdr.jpg",
  //         mediaType: "image",
  //         createdAt: "2024-10-31T08:21:35.577Z",
  //         publicId: "stories/klvry9fveihbu8kxnkdr",
  //         _id: "67233e0f5c2aa9504e50d9d6",
  //       },
  //       {
  //         content:
  //           "https://res.cloudinary.com/manish19/image/upload/v1730362974/stories/srgoeu8rprudhh2jwonj.png",
  //         mediaType: "image",
  //         createdAt: "2024-10-31T08:22:56.329Z",
  //         publicId: "stories/srgoeu8rprudhh2jwonj",
  //         _id: "67233e605c2aa9504e50d9e0",
  //       },
  //     ],
  //     __v: 0,
  //   },
  // };
  useEffect(() => {
    fetchStories();
    // setStories(story.story);
    // setLoading(false);
  }, [user._id]);

  const handleNextStory = async () => {
    if (currentStoryIndex + 1 < stories.stories.length) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setCurrentStoryIndex(0); // loop back to the first story
    }

    // Check if the user has watched the current story
    if (
      !stories.stories[currentStoryIndex].watchedBy.some(
        (user: any) => user._id === currentUser._id
      )
    ) {
      // await handleStoryWatched(); // Mark the story as watched if not watched already
      if (user._id !== currentUser._id) {
        await handleStoryWatched();
      } else {
        console.log("how can i view own story");
      }
      console.log("currenuserID is ", currentUser._id);
      console.log("sotry data is ", stories.stories[currentStoryIndex]);
      console.log("You have not watched this story");
    } else {
      console.log("You have already watched this story");
    }
  };

  const handlePrevStory = async () => {
    if (currentStoryIndex - 1 >= 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      setCurrentStoryIndex(stories.stories.length - 1); // go to the last story
    }

    // Check if the user has watched the current story
    if (
      !stories.stories[currentStoryIndex].watchedBy.some(
        (user: any) => user._id === currentUser._id
      )
    ) {
      if (user._id !== currentUser._id) {
        console.log("how can i view own story");
        await handleStoryWatched();
      } else {
        console.log("how can i view own story");
      }
      console.log("currenuserID is ", currentUser._id);
      console.log("sotry data is ", stories.stories[currentStoryIndex]);
      // await handleStoryWatched(); // Mark the story as watched if not watched already
      console.log("You have not watched this story");
    } else {
      console.log("You have already watched this story");
    }
  };

  const calculateTimeAgo = (createdAt: string) => {
    const now = new Date();
    const storyDate = new Date(createdAt);
    const differenceInSeconds = Math.floor(
      (now.getTime() - storyDate.getTime()) / 1000
    );

    if (differenceInSeconds < 60) return `${differenceInSeconds}s ago`;
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    if (differenceInMinutes < 60) return `${differenceInMinutes}m ago`;
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours < 24) return `${differenceInHours}h ago`;
    const differenceInDays = Math.floor(differenceInHours / 24);
    return `${differenceInDays}d ago`;
  };

  const handleStoryEdit = (item: any) => {
    console.log("story item is ", item);
    setStoryEditModal(true);
  };

  const handleStoryWatched = async () => {
    try {
      // Prepare data to send to the API
      const data = {
        token: token,
        userId: user._id, // Current user watching the story
        storyId: stories.stories[currentStoryIndex]._id, // Current story ID
        storyDocId: stories._id,
      };

      // Call the API to add the user to the story
      const response = await StoryServiceInstance.addUserToStory(data); // Calling the service function
      console.log("User added to story:", response);
    } catch (error) {
      console.error("Error watching story:", error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>
          Please wait, stories are loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {stories.stories.map((_: any, index: any) => (
          <View key={index} style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                index === currentStoryIndex
                  ? { flex: progress }
                  : index < currentStoryIndex
                  ? { flex: 1 }
                  : { flex: 0 },
              ]}
            />
          </View>
        ))}
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            navigation.navigate("UserProfile", {
              userId: user._id,
            });
          }}
        >
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user?.profilePic }}
              style={styles.profilePic}
            />
            <View style={styles.addIcon}>
              <AntDesign name="plus" size={12} color="white" />
            </View>
          </View>
          <Text style={styles.username}>{user.username}</Text>
        </TouchableOpacity>
        <Text style={styles.timeAgo}>
          {calculateTimeAgo(stories.stories[currentStoryIndex].createdAt)}
        </Text>
      </View>

      <View style={styles.storyImageContainer}>
        <TouchableOpacity
          style={styles.leftTouchableArea}
          onPress={handlePrevStory}
          activeOpacity={0.9}
        />
        <Image
          style={styles.storyImage}
          source={{ uri: stories.stories[currentStoryIndex].content }}
        />
        <TouchableOpacity
          style={styles.rightTouchableArea}
          onPress={handleNextStory}
          activeOpacity={0.9}
        />
      </View>

      {currentUser._id === user._id && (
        <Pressable
          style={{
            width: "100%",
            height: 70,
            // backgroundColor: "#494949",
            backgroundColor: "black",
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => handleStoryEdit(stories.stories[currentStoryIndex])}
          >
            <Image
              source={{ uri: user?.profilePic }}
              style={{ width: 35, height: 35, borderRadius: 50, margin: 10 }}
            />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              {user?.username}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              marginRight: 15,
            }}
          >
            <FontAwesome name="facebook" size={24} color="white" />
            <AntDesign name="star" size={24} color="white" />
            <MaterialIcons name="send" size={24} color="white" />
            <MaterialIcons name="more" size={24} color="white" />
          </View>
        </Pressable>
      )}

      <Modal
        visible={storyEditModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setStoryEditModal(false)}
      >
        <StoryEditModal
          storydata={{
            storyDocId: stories._id,
            story: stories.stories[currentStoryIndex],
          }}
          closeModal={() => setStoryEditModal(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1e1e1e",
    paddingTop: 50,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  progressContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    height: 2,
    zIndex: 1,
  },
  progressBarBackground: {
    flex: 1,
    backgroundColor: "gray",
    marginHorizontal: 2,
    borderRadius: 2,
  },
  progressBarFill: {
    height: 2,
    backgroundColor: "white",
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    //  borderWidth:2,
    // borderColor:"blue"
  },
  userInfo: {
    position: "relative",
    // borderWidth:2,
    // borderColor:"blue"
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
    //  borderWidth:2,
    // borderColor:"blue"
  },
  addIcon: {
    backgroundColor: "blue",
    borderRadius: 50,
    width: 15,
    height: 15,
    position: "absolute",
    bottom: 2,
    right: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    color: "white",
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  timeAgo: {
    color: "gray",
    marginLeft: 10,
    fontSize: 15,
  },
  storyImageContainer: {
    width: "100%",
    height: "85%",
    marginTop: 10,
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  leftTouchableArea: {
    flex: 1,
    height: "100%",
    paddingLeft: 100,
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  storyImage: {
    height: "90%",
    width: "95%",
    borderRadius: 10,
  },
  rightTouchableArea: {
    flex: 1,
    height: "100%",
    paddingRight: 100,
    position: "absolute",
    zIndex: 10,
    right: 0,
  },
});
