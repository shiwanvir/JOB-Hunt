import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";

const ViewMyResume = ({ route }) => {
  const uploadedResume = route.params?.resumeData;
  const handleOpenResume = () => {
    if (
      uploadedResume &&
      uploadedResume.assets &&
      uploadedResume.assets.length > 0
    ) {
      const resumeUri = uploadedResume.assets[0].uri;
      Linking.openURL(resumeUri); // Open the resume using the Linking module
    }
  };
  return (
    <View style={styles}>
      <Text>My Resume</Text>
      {/* {uploadedResume && <Text>Uploaded Resume Data: {uploadedResume}</Text>} */}
      {/* Display uploaded resume information */}
      {uploadedResume &&
        uploadedResume.assets &&
        uploadedResume.assets.length > 0 && (
          <View>
            <Text>Uploaded File Name: {uploadedResume.assets[0].name}</Text>
            <Text>File Size: {uploadedResume.assets[0].size} bytes</Text>

            {/* Button to open the uploaded resume */}
            <TouchableOpacity onPress={handleOpenResume}>
              <Text>Open Resume</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
};

export default ViewMyResume;
