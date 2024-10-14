import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Footer from "../Components/Footer";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [otp, setotp] = useState<string>("");

  const handlesingup = () => {
    const data = { username, password };
    console.log("register button pressed");
    console.log("data is ", data);
    alert("register button pressed");
  };

  return (
    <View style={styles.container}>
      {/* Conditionally render the form based on the step */}
      {step === 1 && (
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Choose Username</Text>
            <Text style={styles.subtitle}>You can always change it later</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={"#aaa"}
              value={username}
              onChangeText={(value) => {
                setUsername(value);
              }}
            />
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                // alert(`Username: ${username}`)
                setStep(2);
              }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 2 && (
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Create a Password</Text>
            <Text style={styles.subtitle}>
              For security, your password must be six characters or more
            </Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"#aaa"}
              secureTextEntry={true} // Hide the password input
              value={password}
              onChangeText={(value) => {
                setpassword(value);
              }}
            />
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(3)}
            >
              <Text style={styles.nextButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {step == 3 && (
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Otp for varification</Text>
            <Text style={styles.subtitle}>
              Enter OTP that we have sent to your email
            </Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Otp"
              placeholderTextColor={"#aaa"}
              value={otp}
              keyboardType="number-pad"
              onChangeText={(value) => {
                setotp(value);
              }}
            />
            <TouchableOpacity style={styles.nextButton} onPress={handlesingup}>
              <Text style={styles.nextButtonText}>Verify otp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    textAlign: "center",
    // borderWidth:2,
    // borderColor:"yellow",
    width: "80%",
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  formContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    color: "#fff",
    borderWidth: 1,
    backgroundColor: "#212121",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#3897f0",
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
