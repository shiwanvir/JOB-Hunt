import { StyleSheet } from "react-native";



const styles = StyleSheet.create({

    container: {
        padding: 20,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        borderWidth:2
      },
      textArea: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        height: 100,
      },
      picker: {
        borderWidth: 2, // Common border width for TextInput and Picker
        borderColor: 'black', // Set the border color to black
        borderRadius: 5,
        marginBottom: 10,
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
      errorText:{
        color: '#FF0000'
      },
      disabledButton: {
        flex:1,
        backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        marginLeft:10,
        marginRight:10,
        alignItems: 'center',
    }


})

export default styles;