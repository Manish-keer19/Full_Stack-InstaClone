// import {
//   Button,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import React from "react";
// import Logo from "../../assets/imges/instagram_logo2.png";

// export default function Login() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image style={{ width: 70, height: 70 }} source={Logo} />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="#B0B0B0"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry={true}
//           placeholderTextColor="#B0B0B0"
//         />
//       </View>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Log in</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.forgotPassword}>
//         <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <View style={{ borderWidth: 2, borderColor: "yellow" }}>
//         <TouchableOpacity style={styles.registerButton}>
//           <Text style={styles.registerText}>Create New Account</Text>
//         </TouchableOpacity>
//         <Text style={styles.methodIcon}>Meta Icon</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black", // Set background color to black
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   logo: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#FFFFFF", // Set logo color to white for contrast
//   },
//   inputContainer: {
//     // borderWidth:2,
//     // borderColor:"pink",
//     marginTop: 20,
//     marginBottom: 20,
//     gap: 15,
//   },
//   input: {
//     // backgroundColor: "#1E1E1E", // Darker input background for contrast
//     borderWidth: 2,
//     borderColor: "pink",
//     borderRadius: 20,
//     padding: 16,
//     marginVertical: 5,
//     fontSize: 16,
//     color: "#FFFFFF", // Set text color to white
//   },
//   button: {
//     backgroundColor: "#0095F6",
//     borderRadius: 20,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   forgotPassword: {
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   forgotPasswordText: {
//     color: "#0095F6",
//   },
//   registerButton: {
//     borderWidth: 2,
//     borderColor: "#0095F6",
//     borderRadius: 20,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   registerText: {
//     color: "#0095F6",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   methodIcon: {
//     textAlign: "center",
//     marginTop: 20,
//     fontSize: 16,
//     color: "#B0B0B0",
//   },
// });

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/imges/instagram_logo2.png";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

export default function Login() {
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={{ width: 70, height: 70 }} source={Logo} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#B0B0B0"
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.registerText}>Create New Account</Text>
        </TouchableOpacity>
        <Text style={styles.methodIcon}>Meta Icon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Set background color to black
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
    gap: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: "pink",
    borderRadius: 20,
    padding: 16,
    marginVertical: 5,
    fontSize: 16,
    color: "#FFFFFF", // Set text color to white
  },
  button: {
    backgroundColor: "#0095F6",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: "center",
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: "#0095F6",
  },
  footerContainer: {
    alignItems: "center", // Center items in the footer
    marginTop: 20, // Optional margin for spacing
  },
  registerButton: {
    borderWidth: 2,
    borderColor: "#0095F6",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 10,
    width: "100%", // Optional: Make the button full width
  },
  registerText: {
    color: "#0095F6",
    fontWeight: "bold",
    fontSize: 16,
  },
  methodIcon: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#B0B0B0",
  },
});
