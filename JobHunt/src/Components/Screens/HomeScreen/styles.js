import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        borderWidth:2
      },
      button_container:{
        flexDirection:'row',
        justifyContent:"space-between",
        marginHorizontal:10

      },
      button: {
        flex:1,
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        marginLeft:10,
        marginRight:10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',

      },
});

export default styles;
