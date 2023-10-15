import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { auth } from "../../Database/dbConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../../Components/Logo/LoginIcon";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [allowValidation, setAllowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    validateEmail();
  }, [email]);
  useEffect(() => {
    validatePassword();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully logged in
        const { user } = userCredential;
        console.log(`Logged in as ${user.email}`);
      })
      .catch((error) => {
        // Handle login errors
        console.log(`Login failed: ${error.message}`);
      });
  };

  const validateEmail = () => {
    if (allowValidation) {
      if (!email) {
        setEmailError("Please enter  valid email");
      } else {
        setEmailError("");
      }
    }
  };
  const validatePassword = () => {
    if (allowValidation) {
      if (!password) {
        setPasswordError("Please enter a valid password");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(email) => {
          setAllowValidation(true);
          setEmail(email);
        }}
        value={email}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(password) => {
          setAllowValidation(true);
          setPassword(password);
        }}
        value={password}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      {isLoading && <ActivityIndicator size="large" color="#FF0000" />}
      <TouchableOpacity style={styles.login_button} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.sign_up_url}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        Don't have an account? Sign up here
      </Text>
    </View>
  );
};

export default SignIn;
