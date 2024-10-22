// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   ScrollView,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import Footer from "../Footer";
// import Icons from "react-native-vector-icons/Entypo";
// import AntDesignIcon from "react-native-vector-icons/AntDesign";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import FeatherIcon from "react-native-vector-icons/Feather";
// import { images } from "../../Utils/imagedata";
// import { useSelector } from "react-redux";

// export default function Posts() {
//   const user = useSelector((state: any) => state.User.user);
//   console.log("user in posts", user);

//   const [images, setImages] = useState<[]>([]);
//   if (user) {
//     useEffect(() => {
//       setImages(user.posts);
//     },[user]);
//   }
//   return (
//     <View>
//       <ScrollView style={styles.container}>
//         {/* Post Container */}
//         {images.map((item, i) => (
//           <View style={styles.postContainer} key={i}>
//             {/* Post Header */}
//             <View style={styles.postHeader}>
//               <View style={styles.profileInfo}>
//                 <Image
//                   source={{
//                     uri: item.image,
//                   }}
//                   style={styles.avatar}
//                 />
//                 <View style={styles.userDetails}>
//                   <Text style={styles.username}>{user.username}</Text>
//                   <Text style={styles.location}>{item.location}</Text>
//                 </View>
//               </View>
//               <Icons name="dots-three-vertical" color={"white"} size={20} />
//             </View>

//             {/* Post Image */}
//             <View style={styles.postImageWrapper}>
//               <Image
//                 source={{
//                   uri: item.image,
//                 }}
//                 style={styles.postImage}
//               />
//             </View>

//             {/* Like, Comment, Share, Save Section */}
//             <View style={styles.actionIcons}>
//               <View style={styles.leftIcons}>
//                 <Pressable>
//                   <AntDesignIcon name="hearto" color={"white"} size={24} />
//                 </Pressable>
//                 <Pressable>
//                   <FontAwesomeIcon name="comment-o" color={"white"} size={24} />
//                 </Pressable>
//                 <Pressable>
//                   <FeatherIcon name="send" color={"white"} size={24} />
//                 </Pressable>
//               </View>
//               <Pressable>
//                 <FeatherIcon name="bookmark" color={"white"} size={24} />
//               </Pressable>
//             </View>

//             {/* Post Info */}
//             <View style={styles.postInfo}>
//               <Text style={styles.likesText}>1,024 likes</Text>
//               <Text style={styles.postDescription}>
//                 <Text style={styles.username}>{user.username} </Text>
//                 {item.caption}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//       <Footer />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     minHeight: "100%",
//     backgroundColor: "black",
//     paddingTop: 50,
//   },
//   postContainer: {
//     marginBottom: 20,
//     borderColor: "#333",
//     borderWidth: 1,
//   },
//   postHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//   },
//   profileInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   userDetails: {
//     justifyContent: "center",
//   },
//   username: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   location: {
//     color: "gray",
//     fontSize: 12,
//   },
//   postImageWrapper: {
//     width: "100%",
//     height: 400,
//   },
//   postImage: {
//     width: "100%",
//     height: "100%",
//   },
//   actionIcons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//   },
//   leftIcons: {
//     flexDirection: "row",
//     gap: 15,
//   },
//   postInfo: {
//     padding: 10,
//   },
//   likesText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   postDescription: {
//     color: "white",
//     marginTop: 5,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Icons from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";

export default function Posts() {
  const user = useSelector((state: any) => state.User.user);
  const [images, setImages] = useState<[]>([]);

  useEffect(() => {
    if (user && user.posts) {
      setImages(user.posts);
    }
  }, [user]); // Only run when 'user' changes

  return (
    <View>
      <ScrollView style={styles.container}>
        {/* Post Container */}
        {images.map((item: any, i: number) => (
          <View style={styles.postContainer} key={i}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.profileInfo}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={styles.userDetails}>
                  <Text style={styles.username}>{user.username}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                </View>
              </View>
              <Icons name="dots-three-vertical" color={"white"} size={20} />
            </View>

            {/* Post Image */}
            <View style={styles.postImageWrapper}>
              <Image source={{ uri: item.image }} style={styles.postImage} />
            </View>

            {/* Like, Comment, Share, Save Section */}
            <View style={styles.actionIcons}>
              <View style={styles.leftIcons}>
                <Pressable>
                  <AntDesignIcon name="hearto" color={"white"} size={24} />
                </Pressable>
                <Pressable>
                  <FontAwesomeIcon name="comment-o" color={"white"} size={24} />
                </Pressable>
                <Pressable>
                  <FeatherIcon name="send" color={"white"} size={24} />
                </Pressable>
              </View>
              <Pressable>
                <FeatherIcon name="bookmark" color={"white"} size={24} />
              </Pressable>
            </View>

            {/* Post Info */}
            <View style={styles.postInfo}>
              <Text style={styles.likesText}>1,024 likes</Text>
              <Text style={styles.postDescription}>
                <Text style={styles.username}>{user.username} </Text>
                {item.caption}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "black",
    paddingTop: 50,
  },
  postContainer: {
    minHeight: 200,
    marginBottom: 20,
    borderColor: "#333",
    borderWidth: 1,
    margin: 5,
    // padding: 5,
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
  userDetails: {
    justifyContent: "center",
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  location: {
    color: "gray",
    fontSize: 12,
  },
  postImageWrapper: {
    width: "100%",
    height: 400,
    // borderWidth:2,
    // borderColor:"blue"
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  leftIcons: {
    flexDirection: "row",
    gap: 15,
  },
  postInfo: {
    padding: 10,
  },
  likesText: {
    color: "white",
    fontWeight: "bold",
  },
  postDescription: {
    color: "white",
    marginTop: 5,
  },
});
