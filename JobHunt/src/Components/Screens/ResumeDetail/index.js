
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import ResumePreview from '../ResumeBuildScreen/GenerateResume/ResumePreview'


const ResumeDetail = ({ route }) => {
  const { resume } = route.params;
  //console.log("resume.personalDetails",resume.personalDetails)
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView>
        <ResumePreview
          personalDetails={resume.personalDetails}
          experienceDetails={resume.experienceDetails}
          projectDetails={resume.projectDetails}
          educationDetails={resume.educationDetails}
          certificationDetails={resume.certificationDetails}
        />
      </ScrollView>

    </View>

  );
};

export default ResumeDetail;