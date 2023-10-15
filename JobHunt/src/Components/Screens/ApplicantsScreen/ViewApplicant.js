import { ScrollView} from "react-native";
import React, { useState, useEffect } from 'react';
import ResumePreview from "../ResumeBuildScreen/GenerateResume/ResumePreview";
import {auth, db} from "../../Database/dbConfig";
import {collection, getDocs, query, where} from "firebase/firestore";

const ViewApplicant = (props) => {
    const [resumeObj, setResumeObj] = useState({})
    const {resume} = props.route.params;
    useEffect( () => {
        loadResume(resume.resume_id)
    }, [])

    const loadResume = async (resume_id) => {
        const resumeCollectionRef = collection(db, 'Resumes');
        const q = query(resumeCollectionRef, where("id", "==", resume_id));

        try {
            const querySnapshot = await getDocs(q);
            const resList = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                resList.push(data);
            });
            setResumeObj(resList[0]);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }


    return (
        <ScrollView style={{padding: 10}}>
            {resumeObj && <ResumePreview
                personalDetails={resumeObj.personalDetails}
                experienceDetails={resumeObj.experienceDetails}
                projectDetails={resumeObj.projectDetails}
                educationDetails={resumeObj.educationDetails}
                certificationDetails={resumeObj.certificationDetails}
            />}
        </ScrollView>
    );
};

export default ViewApplicant;
