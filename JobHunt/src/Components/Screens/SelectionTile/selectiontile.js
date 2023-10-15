import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
const SelectionTile = (props) => {
  const { name, routeTo, navigation, resume } = props;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: "white", borderColor: "white", borderWidth: 2 },
      ]}
      onPress={() => {
        if(resume){
          navigation.navigate(routeTo, { resume: resume })
        }
        else{
        navigation.navigate(routeTo);
        }
      }}
    >
      <View>
        <Text
          style={{
            color: "black",
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 25,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginStart: 10,
    height: 60,
    marginEnd: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default SelectionTile;
