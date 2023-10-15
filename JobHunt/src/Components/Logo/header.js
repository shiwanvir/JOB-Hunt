import React from "react";
import { Image, TouchableOpacity, Dimensions } from "react-native";
import { View } from "react-native";
const deviceWidth = Dimensions.get("window").width;

const Logo = () => {
  return (
    //Add your logo in the image tag
    <View style={{ flex: 0 }}>
      <Image
        source={require("../../../assets/logos/job-hunt-logo-zip-file/png/output-onlinepngtools.png")}
        resizeMode="contain"
        style={{ height: 90, width: 90, marginLeft: 140 }}
      />
    </View>
  );
};
export default Logo;
