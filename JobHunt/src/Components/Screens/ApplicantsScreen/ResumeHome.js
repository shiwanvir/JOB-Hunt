import React, {useEffect, useState} from "react";
import {ScrollView} from "react-native";
import SelectionTile from "../SelectionTile/selectiontile";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "../../Database/dbConfig";

function ApplicantsHome({navigation}) {
    const [resumeList, setResumeList] = useState([])
    useEffect( () => {
        loadResumeList()
    }, [])

    const loadResumeList = async () => {
        const list = await loadDataFromDB();
        setResumeList(list);
    }

    const loadDataFromDB = async () => {
        const resumeCollectionRef = collection(db, 'job-applicants');
        const q = query(resumeCollectionRef);

        try {
            const querySnapshot = await getDocs(q);
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
        <ScrollView style={{backgroundColor: "white"}}>
            {resumeList && resumeList.map((resume, index) => {
                return (<SelectionTile
                    resume={resume}
                    name={`📜 Applicant ${index+1}`}
                    routeTo={"ViewApplicant"}
                    navigation={navigation}
                />);
            })}
        </ScrollView>
    );
}

export default ApplicantsHome;
