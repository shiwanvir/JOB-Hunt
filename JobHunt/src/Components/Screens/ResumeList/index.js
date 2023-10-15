
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import SelectionTile from '../SelectionTile/selectiontile';
import { auth, db } from '../../Database/dbConfig';
import { collection, getDocs, setDoc, doc, query, where, deleteDoc } from "firebase/firestore";


const ResumeList = ({ navigation }) => {
  const [resumeList, setResumeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadResumeList()
  }, [])

  const loadResumeList = async () => {

    const list = await loadDataFromDB()
    setResumeList(list)
    setIsLoading(false);
  }

  const loadDataFromDB = async () => {
    const currentUser = auth.currentUser;
    const userEmail = currentUser ? currentUser.email : '';
    const resumeCollectionRef = collection(db, 'Resumes');
    const q = query(resumeCollectionRef, where('postedBy', '==', userEmail));


    try {
      const querySnapshot = await getDocs(q);

      // Extract data from the querySnapshot
      const resList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        resList.push(data);
      });
      return resList;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>}
      <FlatList
        data={resumeList}
        keyExtractor={(item) => item.postedDate.nanoseconds}
        renderItem={({ item }) => (
          <SelectionTile
            name={item.personalDetails.resumeName}
            routeTo={"ResumeDetail"}
            navigation={navigation}
            resume={item}
          />
        )}
      />
    </View>
  );
};

export default ResumeList; 