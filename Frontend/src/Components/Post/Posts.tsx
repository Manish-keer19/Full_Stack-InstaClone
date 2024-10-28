// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import Footer from "../Footer";
// import Icons from "react-native-vector-icons/Entypo";
// import AntDesignIcon from "react-native-vector-icons/AntDesign";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import FeatherIcon from "react-native-vector-icons/Feather";
// import { post } from "../../Utils/imagedata";
// import { useSelector } from "react-redux";

// export default function Posts() {
//   const user = useSelector((state: any) => state.User.user);
//   console.log("user in posts", user);

//   const [post, setpost] = useState<[]>([]);
//   if (user) {
//     useEffect(() => {
//       setpost(user.posts);
//     },[user]);
//   }
//   return (
//     <View>
//       <ScrollView style={styles.container}>
//         {/* Post Container */}
//         {post.map((item, i) => (
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
//                 <TouchableOpacity>
//                   <AntDesignIcon name="hearto" color={"white"} size={28} />
//                 </TouchableOpacity>
//                 <TouchableOpacity>
//                   <FontAwesomeIcon name="comment-o" color={"white"} size={28} />
//                 </TouchableOpacity>
//                 <TouchableOpacity>
//                   <FeatherIcon name="send" color={"white"} size={28} />
//                 </TouchableOpacity>
//               </View>
//               <TouchableOpacity>
//                 <FeatherIcon name="bookmark" color={"white"} size={28} />
//               </TouchableOpacity>
//             </View>

//             {/* Post Info */}
//             <View style={styles.postInfo}>
//               <Text style={styles.likesText}>1,028 likes</Text>
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
  ScrollView,
  Touchable,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Icons from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { UserServiceInstance } from "../../services/Userservice";
import { setUser, useLoadUserData } from "../../features/user/userSlice";
import CommentSection from "./CommentSection";

export default function Posts({ route }: any) {
  useLoadUserData();

  const dispatch = useDispatch();
  const [commentModal, setCommentModal] = useState(false);
  const [post, setpost] = useState<[]>([]);
  const anotheruser = route.params && route.params.user;
  let { user, token } = useSelector((state: any) => state.User);
  // console.log("user in posts", user);

  if (anotheruser) {
    user = anotheruser;
  }
  const [posts, setposts] = useState<[]>([]);
  const [userLikes, setUserLikes] = useState([]);

  console.log("post in posts", post);

  useEffect(() => {
    if (user && user.posts) {
      setposts(user.posts);

      let likes = user?.posts.map((item: any) => {
        if (item.likes == user._id) {
          return item;
        } else {
          return null;
        }
      });
      setUserLikes(likes);
      console.log("likes in posts", likes);
    }
  }, [user]); // Only run when 'user' changes

  const handleDeleteLike = async (postId: any) => {
    console.log("delete like pressed");
    console.log("post id is ", postId);
    const data = {
      postId,
      token,
    };
    try {
      const res = await UserServiceInstance.deleteLike(data);
      console.log("res is ", res);
      if (res) {
        dispatch(setUser(res.userdata));
      }
    } catch (error) {
      console.log("could not delete the like", error);
    }
  };
  const handleCreateLike = async (postId: any) => {
    console.log("create like pressed");
    console.log("post id is ", postId);
    const data = { postId, token };
    try {
      const res = await UserServiceInstance.createLike(data);
      console.log("res is ", res);
      if (res) {
        console.log("user liked successfully");
        dispatch(setUser(res.userdata));
      }
    } catch (error) {
      console.log("could not create the like", error);
    }
  };

  const handleshowCommentModal = (item: any) => {
    console.log("item is ", item);
    setpost(item);
    setCommentModal(true);
  };

  return (
    <View>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        {/* Post Container */}
        {posts.map((item: any, i: number) => (
          <View style={styles.postContainer} key={i}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.profileInfo}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={styles.userDetails}>
                  <Text style={styles.username}>{user?.username}</Text>
                  <Text style={styles.location}>{item?.location}</Text>
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
                {userLikes[i] ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 7,
                    }}
                    onPress={() => {
                      handleDeleteLike(item._id);
                    }}
                  >
                    <AntDesignIcon name="heart" color={"red"} size={28} />
                    <Text style={{ color: "white" }}>
                      {item?.likes?.length}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      handleCreateLike(item._id);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <AntDesignIcon name="hearto" color={"white"} size={28} />
                    <Text style={{ color: "white" }}>
                      {item?.likes?.length}
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => {
                    handleshowCommentModal(item);
                  }}
                  style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
                >
                  <FontAwesomeIcon name="comment-o" color={"white"} size={28} />
                  <Text style={{ color: "white" }}>
                    {item?.comment?.length}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <FeatherIcon name="send" color={"white"} size={28} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <FeatherIcon name="bookmark" color={"white"} size={28} />
              </TouchableOpacity>
            </View>

            {/* Post Info */}
            <View style={styles.postInfo}>
              <Text style={styles.likesText}>{item?.likes?.length} likes</Text>
              <Text style={styles.postDescription}>
                <Text style={styles.username}>{user?.username} </Text>
                {item.caption}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer />

      <CommentSection
        commentModal={commentModal}
        Posts={post}
        setCommentModal={setCommentModal}
      />
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
