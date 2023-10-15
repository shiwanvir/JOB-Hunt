import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import SelectionTile from '../SelectionTile/selectiontile';
import { auth, db } from '../../Database/dbConfig';
import { collection, getDocs, setDoc, doc, query, where, deleteDoc } from "firebase/firestore";




const ShowList = ({ navigation }) => {
    const [applicationList, setApplicationList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      setApplicationList([
        { id: 1, job_name: 'clown enthusiast', job_title: 'Professional Clown Enthusiast' },
        { id: 2, job_name: 'unicorn wrangler', job_title: 'Unicorn Wrangler' },
        { id: 3, job_name: 'banana peeler', job_title: 'Expert Banana Peeler' },
        { id: 4, job_name: 'skydiving instructor_for_fish', job_title: 'Skydiving Instructor for Fish' },
        { id: 5, job_name: 'bubble wrap popper', job_title: 'Bubble Wrap Popper Specialist' },
      ])
    }, [])
  
    const loadApplicationList = async () => {
  
      const list = await loadDataFromDB()
      setApplicationList(list)
      setIsLoading(false);
    }
  
    const loadDataFromDB = async () => {
  
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={applicationList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SelectionTile
              name={item.job_name}
              routeTo={"ResumeDetail"}
              navigation={navigation}
              resume={item}
            />
          )}
        />
      </View>
    );
  };
  
  export default ShowList; 