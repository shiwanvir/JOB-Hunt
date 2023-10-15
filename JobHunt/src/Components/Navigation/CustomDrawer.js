import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth, storage, ref } from "../Database/dbConfig";
import {
  uploadBytes,
  uploadString,
  contentType,
  getDownloadURL,
  putString,
} from "firebase/storage";
import { Permissions } from "expo";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { useStateContext } from "../../context/StateContext";
const CustomDrawer = ({ navigation }) => {
  const [userName, setUserName] = useState("Jhon Doe");
  const [email, setEmail] = useState("");
  const [profileType, setProfileType] = useState("Recruiter");
  const [imageUri, setImageUri] = useState(null);
  const { authenticatedUser } = useStateContext();
  console.log("Profile Details:", authenticatedUser);
  const pickImage = async () => {
    // const { status } = await Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE);
    // // if (status !== 'granted') {
    // //   console.log('Permission denied');
    // //   return;
    // // }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);
    uploadImage(result.assets[0].uri);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const createBlobFromURI = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error creating Blob from URI:", error);
      return null;
    }
  };

  const uploadImage = async (file) => {
    //const blobFile = await uriToBlob(file)
    console.log(">>>>");

    // const blob1 = await createBlobFromURI(file);
    // console.log(blob1, ">>>>")
    const base64 = await FileSystem.readAsStringAsync(file, {
      encoding: "base64",
    });
    //console.log("b64", base64)

    const metadata = {
      contentType: "image/jpeg",
    };
    const imageName = file.substring(file.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `images/profilePic/${imageName}`);
    const modifiedBase64 = "data:image/jpeg;base64," + base64;
    console.log("before___res");

    const format = ImageManipulator.SaveFormat.JPEG;

    manipResult = await ImageManipulator.manipulateAsync(file, [], {
      base64: true,
      compress: 0.9,
      format: format,
    });
    compressed = true;
    console.log(
      "file size usemedia after compression",
      manipResult.base64.length
    );

    // uploadBytes(storageRef, manipResult).then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    //   })

    uploadString(storageRef, manipResult, "base64")
      .then((snapshot) => {
        console.log("Uploaded a base64 string!", snapshot);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });

    // const imageBlob = await getBlobFroUri(file).then(()=>{
    //     console.log("done___")
    // })
    // .catch(error => {
    //     console.log("error", error);
    // });

    //console.log("Image Blob__>",imageBlob);
    // uploadString(storageRef, base64.split(',')[1], 'base64').then((snapshot) => {
    //     console.log('Uploaded a data_url string!');
    // })
    //     .catch((error) => {
    //         console.error('Error uploading data_url:', error);
    //         // You can handle the error here, display a message to the user, etc.
    //     });

    // Convert bytes to ArrayBuffer
    //   const arrayBuffer = new ArrayBuffer(byteCharacters.length);
    //   const uint8Array = new Uint8Array(arrayBuffer);
    //   for (let i = 0; i < byteCharacters.length; i++) {
    //     uint8Array[i] = byteCharacters.charCodeAt(i);
    //   }

    //   // Create a Blob object from ArrayBuffer
    //   const blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Adjust the content type as needed
    //   uploadBytes(storageRef, blob).then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    //   });
  };

  const getBlobFromBase64 = async (base64) => {
    const { uri } = FileSystem.cacheDirectory + "temp_image.jpg";
    await FileSystem.writeAsStringAsync(uri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  };
  const getBlobFroUri = async (uri) => {
    console.log("Inside get", uri);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  const saveImageUrlToDatabase = (imageUrl) => {
    console.log("ready for db");
    // database().ref("users").child("yourUserId").update({
    //   profileImage: imageUrl,
    // });
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            auth.signOut().then(() => console.log("User signed out!"));
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <DrawerContentScrollView>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}
        onPress={() => navigation.closeDrawer()} // Close the drawer when header is clicked
      >
        <Ionicons
          name="menu-outline"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 18 }}>Profile</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginVertical: 2,
          marginLeft: 10,
        }}
      >
        <Image
          source={require("../../../assets/default_profile_avatar.png")}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
          }}
        />
        <TouchableOpacity
          onPress={pickImage}
          style={{
            position: "absolute",
            bottom: 0,
            left: 80,
            backgroundColor: "white",
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Ionicons name="pencil-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          marginVertical: 2,
          marginLeft: 10,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          {authenticatedUser.name}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {authenticatedUser.email}
        </Text>
        <Text style={{ fontSize: 16 }}>{authenticatedUser.userType}</Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: "red",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
