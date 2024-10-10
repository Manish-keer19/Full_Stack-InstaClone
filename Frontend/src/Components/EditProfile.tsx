// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   Pressable,
// } from "react-native";
// import React, { useState } from "react";
// import FeatherIcons from "@expo/vector-icons/Feather";
// import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { RootStackParamList } from "../../App";
// import Footer from "./Footer";
// import { useDispatch } from "react-redux";
// import { setProfileData } from "../features/Profile/ProfileSlice";
// import { UserServiceInstance } from "../services/Userservice";

// export default function EditProfile() {
//   const dispatch = useDispatch();
//   const [name, setName] = useState<string>("");
//   const [username, setUsername] = useState<string>("");
//   const [bio, setBio] = useState<string>("");
//   const [pronoun, setPronoun] = useState<string>("");

//   const handleSubmit = async () => {
//     console.log("submit btn pressed");
//     const data = {
//       name,
//       username,
//       bio,
//       pronoun,
//       email: "manishkeer530@gmail.com",
//     };

//     const res = await UserServiceInstance.updateProfile(data);
//     if (res) {
//       console.log("Res in editprofile", res);

//       dispatch(setProfileData(res.data));
//     }
//     setUsername("");
//     setBio("");
//     setPronoun("");
//     setName("");
//     navigation.navigate("Profile");
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
//             uri: "https://instagram.frpr5-1.fna.fbcdn.net/v/t51.2885-19/462349744_1034506588460666_5079402828137450263_n.jpg?_nc_ht=instagram.frpr5-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=JAG66HjEp9gQ7kNvgEWFpcX&_nc_gid=6fcb46fc729d408eaef2b2c4b9d4c003&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYAYfybEw8cwhoLlS_UFJf53Gplj9lF_xjfI7LWX9iUm1w&oe=670942F8&_nc_sid=7a9f4b",
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
//         <Pressable style={[styles.btn, styles.saveBtn]}>
//           <Text style={styles.btnText} onPress={handleSubmit}>
//             Save
//           </Text>
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
//     paddingBottom: 20, // Add some bottom padding to avoid content touching the bottom
//     // borderWidth: 2,
//     // borderColor: "red",
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
//     width: 100, // Adjust the size as needed
//     height: 100,
//     borderRadius: 50, // To make it circular
//   },
//   inputContainer: {
//     marginTop: 30,
//     gap: 25,
//     width: "90%",
//     alignSelf: "center", // Center the input container
//     // borderWidth: 2,
//     // borderColor: "blue",
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
//     alignSelf: "center", // Center the button container
//   },
//   btn: {
//     flex: 1,
//     padding: 10,
//     borderRadius: 10,
//     marginHorizontal: 5, // Space between buttons
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
import { RootStackParamList } from "../../App";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { UserServiceInstance } from "../services/Userservice";
import { setProfileData } from "../features/Profile/ProfileSlice";


export default function EditProfile() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [pronoun, setPronoun] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    console.log("submit btn pressed");
    const data = {
      name,
      username,
      bio,
      pronoun,
      email: "manishkeer530@gmail.com",
    };

    const res = await UserServiceInstance.updateProfile(data);
    if (res) {
      console.log("Res in editprofile", res);
      dispatch(setProfileData(res.data));
  
    }
    setUsername("");
    setBio("");
    setPronoun("");
    setName("");
    setLoading(false); // Stop loading
    navigation.navigate("Profile");
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FeatherIcons name="arrow-left" size={25} color={"white"} />
        <Text style={styles.headerText}>EditProfile</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://instagram.frpr5-1.fna.fbcdn.net/v/t51.2885-19/462349744_1034506588460666_5079402828137450263_n.jpg",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={name}
          onChangeText={(value) => {
            setName(value);
          }}
        />
        <TextInput
          placeholder="UserName"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={username}
          onChangeText={(value) => {
            setUsername(value);
          }}
        />
        <TextInput
          placeholder="Pronoun"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={pronoun}
          onChangeText={(value) => {
            setPronoun(value);
          }}
        />
        <TextInput
          placeholder="Bio"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={bio}
          onChangeText={(value) => {
            setBio(value);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.btn, styles.cancelBtn]}>
          <Text
            style={styles.btnText}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            Cancel
          </Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.saveBtn]}
          disabled={loading} // Disable the button when loading
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" /> // Show loader when loading
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
