import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import { auth, db } from "../../Database/dbConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Logo from "../../../Components/Logo/LoginIcon";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [userType, setUsertype] = useState("");
  const [userTypeError, setUserTypeError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState(null);
  const [allowValidation, setAllowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    validateEmail();
  }, [email]);
  useEffect(() => {
    validatePassword();
  }, [password]);

  useEffect(() => {
    validateUserType();
  }, [userType]);

  useEffect(() => {
    validateRePassword();
  }, [rePassword]);

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
      setRePassword("");
      if (!password) {
        setPasswordError("Please enter a valid password");
      } else {
        setPasswordError("");
      }
    }
  };
  const validateUserType = () => {
    if (allowValidation) {
      if (!userType) {
        setUserTypeError("Please select a User Type");
      } else {
        setUserTypeError(null);
      }
    }
  };
  const validateRePassword = () => {
    if (allowValidation) {
      if (!rePassword) {
        setRePasswordError("Please re enter a password");
      } else if (!validateBothPassword()) {
        setRePasswordError("Password is not macthing");
      } else {
        setRePasswordError(null);
      }
    }
  };
  const validateBothPassword = () => {
    if (password === rePassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleSignUp = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        createUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error", errorMessage);
      });
  };

  const createUser = async (user) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: email,
        userType: userType,
        createdDate: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.log("Error insert to user table", error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(name) => {
          setName(name);
        }}
        value={name}
      />
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
      {/* <Text style={styles.label}>Login Type</Text> */}
      <Picker
        style={[
          styles.input,
          { marginLeft: 2, width: 330, marginBottom: -2, marginTop: -10 },
        ]}
        selectedValue={userType}
        onValueChange={(userType) => {
          setAllowValidation(true);
          setUsertype(userType);
          validateUserType();
        }}
      >
        <Picker.Item label="Select User Type" value="" />
        <Picker.Item label="Job Hunter" value="Job Hunter" />
        <Picker.Item label="Recruiter" value="Recruiter" />
      </Picker>
      {userTypeError && <Text style={styles.errorText}>{userTypeError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(password) => {
          setAllowValidation(true);
          setPassword(password);
          validatePassword();
        }}
        value={password}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Re-Password"
        secureTextEntry
        onChangeText={(rePassword) => {
          setAllowValidation(true);
          setRePassword(rePassword);
          validateRePassword();
        }}
        value={rePassword}
      />
      {rePasswordError && (
        <Text style={styles.errorText}>{rePasswordError}</Text>
      )}
      {isLoading && <ActivityIndicator size="large" color="#FF0000" />}
      <TouchableOpacity style={styles.login_button} onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <Text
        style={styles.sign_up_url}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        Already have an account? Sign in here
      </Text>
    </View>
  );
};

export default SignUp;
