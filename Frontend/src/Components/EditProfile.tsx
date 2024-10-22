// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import React, { useState } from "react";
// import FeatherIcons from "@expo/vector-icons/Feather";
// import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { RootStackParamList } from "../../Entryroute";
// import Footer from "./Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { setProfileData } from "../features/Profile/ProfileSlice";
// import { images } from "../Utils/imagedata";
// import { ProfileServiceInstance } from "../services/ProfileService";

// export default function EditProfile() {
//   const dispatch = useDispatch();
//   const token = useSelector((state: any) => state.User.token);
//   console.log("token in editprofile", token);
//   const [name, setName] = useState<string>("");
//   const [username, setUsername] = useState<string>("");
//   const [bio, setBio] = useState<string>("");
//   const [pronoun, setPronoun] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false); // Loading state

//   const handleSubmit = async () => {
//     setLoading(true); // Start loading
//     console.log("submit btn pressed");
//     const data = {
//       name,
//       username,
//       bio,
//       pronoun,
//       email: "manishkeer530@gmail.com",
//       token: token,
//     };
//     try {
//       const res = await ProfileServiceInstance.updateProfile(data);
//       setLoading(false); // Stop loading
//       setUsername("");
//       setPronoun("");
//       setBio("");
//       setName("");
//       if (res) {
//         console.log("Res in editprofile", res);
//         dispatch(setProfileData(res.data));
//         navigation.navigate("Profile");
//       } else {
//         console.log("could not edit the profile");
//       }
//     } catch (error) {
//       console.log("could not edith the post", error);
//     }
//   };

//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <FeatherIcons name="arrow-left" size={25} color={"white"} />
//         <Text style={styles.headerText}>EditProfile</Text>
//       </View>
//       <View style={styles.imageContainer}>
//         <Image
//           source={{
//             uri: images[0].uri,
//           }}
//           style={styles.image}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Name"
//           placeholderTextColor={"white"}
//           style={styles.textInput}
//           value={name}
//           onChangeText={(value) => {
//             setName(value);
//           }}
//         />
//         <TextInput
//           placeholder="UserName"
//           placeholderTextColor={"white"}
//           style={styles.textInput}
//           value={username}
//           onChangeText={(value) => {
//             setUsername(value);
//           }}
//         />
//         <TextInput
//           placeholder="Pronoun"
//           placeholderTextColor={"white"}
//           style={styles.textInput}
//           value={pronoun}
//           onChangeText={(value) => {
//             setPronoun(value);
//           }}
//         />
//         <TextInput
//           placeholder="Bio"
//           placeholderTextColor={"white"}
//           style={styles.textInput}
//           value={bio}
//           onChangeText={(value) => {
//             setBio(value);
//           }}
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Pressable style={[styles.btn, styles.cancelBtn]}>
//           <Text
//             style={styles.btnText}
//             onPress={() => {
//               navigation.navigate("Profile");
//             }}
//           >
//             Cancel
//           </Text>
//         </Pressable>
//         <Pressable
//           style={[styles.btn, styles.saveBtn]}
//           disabled={loading} // Disable the button when loading
//           onPress={handleSubmit}
//         >
//           {loading ? (
//             <ActivityIndicator size="small" color="#ffffff" /> // Show loader when loading
//           ) : (
//             <Text style={styles.btnText}>Save</Text>
//           )}
//         </Pressable>
//       </View>

//       <Footer />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     minHeight: "100%",
//     backgroundColor: "black",
//     paddingTop: 46,
//     paddingBottom: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerText: {
//     color: "white",
//     fontSize: 20,
//     marginLeft: 10,
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   inputContainer: {
//     marginTop: 30,
//     gap: 25,
//     width: "90%",
//     alignSelf: "center",
//   },
//   textInput: {
//     borderColor: "pink",
//     borderWidth: 0.9,
//     borderRadius: 5,
//     padding: 10,
//     color: "white",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 30,
//     width: "90%",
//     alignSelf: "center",
//   },
//   btn: {
//     flex: 1,
//     padding: 10,
//     borderRadius: 10,
//     marginHorizontal: 5,
//   },
//   cancelBtn: {
//     backgroundColor: "blue",
//   },
//   saveBtn: {
//     backgroundColor: "red",
//   },
//   btnText: {
//     textAlign: "center",
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 15,
//   },
// });
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import FeatherIcons from "@expo/vector-icons/Feather";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../Entryroute";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../features/Profile/ProfileSlice";
import { ProfileServiceInstance } from "../services/ProfileService";
import * as ImagePicker from "expo-image-picker";
import { setUser } from "../features/user/userSlice";
import { UserServiceInstance } from "../services/Userservice";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token, user } = useSelector((state: any) => state.User);

  // State management
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [pronoun, setPronoun] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Function to fetch user data after profile update
  const fetchUserData = async () => {
    const data = { email: user.email, token };
    try {
      const res = await UserServiceInstance.getUserData(data);
      if (res.userdata) {
        dispatch(setUser(res.userdata));
      }
    } catch (error) {
      console.log("Could not get the user data", error);
    }
  };

  // Function to handle profile update
  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();

    // Append form data
    data.append("name", name);
    data.append("username", username);
    data.append("bio", bio);
    data.append("pronoun", pronoun);
    data.append("email", "manishkeer530@gmail.com");
    data.append("token", token);

    if (profileImage) {
      data.append("profileImage", {
        uri: profileImage,
        type: "image/jpeg",
        name: "profile.jpg",
      });
    }

    try {
      const res = await ProfileServiceInstance.updateProfile(data);
      if (res) {
        await fetchUserData();
        dispatch(setProfileData(res.data));
        navigation.navigate("Profile");
      }
    } catch (error) {
      console.log("Could not edit the profile", error);
    } finally {
      setLoading(false); // Ensure loading state is reset
      resetForm(); // Reset form fields
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setName("");
    setUsername("");
    setBio("");
    setPronoun("");
    setProfileImage(null);
  };

  // Function to pick an image from the gallery
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Set selected image URI
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FeatherIcons name="arrow-left" size={25} color={"white"} />
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <View style={styles.imageContainer}>
        <Pressable onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.image} />
          ) : (
            <Text style={styles.chooseImageText}>Choose an image</Text>
          )}
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Username"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Pronoun"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={pronoun}
          onChangeText={setPronoun}
        />
        <TextInput
          placeholder="Bio"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={bio}
          onChangeText={setBio}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.btn, styles.cancelBtn]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.btnText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.saveBtn]}
          disabled={loading}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.btnText}>Save</Text>
          )}
        </Pressable>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "black",
    paddingTop: 46,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  chooseImageText: {
    color: "white",
    textAlign: "center",
    padding: 10,
    borderColor: "pink",
    borderWidth: 0.9,
    borderRadius: 5,
  },
  inputContainer: {
    marginTop: 30,
    gap: 25,
    width: "90%",
    alignSelf: "center",
  },
  textInput: {
    borderColor: "pink",
    borderWidth: 0.9,
    borderRadius: 5,
    padding: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
  },
  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: "blue",
  },
  saveBtn: {
    backgroundColor: "red",
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
