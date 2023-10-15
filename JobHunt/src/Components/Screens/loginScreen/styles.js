import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    label: {
      marginTop: 10,
      alignSelf:'flex-start',
      textAlign:'center',
      marginLeft:40
    },
    input: {
      width: 300,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 10,
      borderRadius:10,
     
    },
    login_button:{
      marginTop:10,
      width:150,
      height:40,
      borderRadius:10,
      padding:10,
      backgroundColor:'#2980b9',
      alignItems:'center'
    },
    sign_up_url:{
      color:'blue',
      marginTop: 10,
    },
    logo:{
      height:500,
      width:500
    },
    errorText:{
    color: '#FF0000',
     alignSelf:'flex-start',
     textAlign:'left',
     marginLeft:40,
     marginTop: -10,

    },
  });

  export default styles;