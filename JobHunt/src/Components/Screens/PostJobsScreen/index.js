import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import { auth, db, } from "../../Database/dbConfig"
import { collection, addDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import CustomDrawer from "../../Navigation/CustomDrawer";
import {createDrawerNavigator} from "@react-navigation/drawer";

const PostJobsScreen = () => {
  const Drawer = createDrawerNavigator();

  const [jobTitle, setJobTitle] = useState('');
  const [jobTitleError, setJobTitleError] = useState(null);
  const [field, setField] = useState('');
  const [fieldError, setFieldError] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState(null);
  const [jobType, setJobType] = useState('');
  const [jobTypeError, setJobTypeError] = useState(null);
  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [jobDescriptionError, setJobDescriptionError] = useState(null);
  const [salary, setSalary] = useState('');
  const [salaryError, setSalaryError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [allowValidation, setAllowValidation] = useState(false)


  useEffect(() => {
    validateJobTitle();
  }, [jobTitle])

  useEffect(() => {
    validateField()
  }, [field])

  useEffect(() => {
    validateCompanyName()
  }, [companyName])

  useEffect(() => {
    validateJobType()
  }, [jobType])

  useEffect(() => {
    validateLocation()
  }, [location])

  useEffect(() => {
    validateJobDescription()
  }, [jobDescription])

  useEffect(() => {
    validateSalary()
  }, [salary])


  const handleSubmit = async () => {
    if (checkAllFieldsvalid() == true) {
      setIsSaving(true)
      try {
        const currentUser = auth.currentUser;
        const userEmail = currentUser ? currentUser.email : '';
        const docRef = await addDoc(collection(db, "jobPostings"), {
          jobTitle: jobTitle,
          field: field,
          companyName: companyName,
          jobType: jobType,
          location: location,
          jobDescription: jobDescription,
          salary: salary,
          postedBy: userEmail, // Include the current user's email as postedBy
          postedDate: Timestamp.fromDate(new Date())
        });

        const docUpdateRef = doc(db, "jobPostings", docRef.id);

        await updateDoc(docUpdateRef, {
          id: docRef.id,
          jobTitle: jobTitle,
          field: field,
          companyName: companyName,
          jobType: jobType,
          location: location,
          jobDescription: jobDescription,
          salary: salary,
          postedBy: userEmail, // Include the current user's email as postedBy
          postedDate: Timestamp.fromDate(new Date())
        });

        console.log('Job posting submitted successfully.');
        setIsSaving(false)
      } catch (error) {
        console.log("Error in submission", error)
      }

      setAllowValidation(false)
      setJobTitle('');
      setField('');
      setCompanyName('');
      setJobType('');
      setLocation('');
      setJobDescription('');
      setSalary('');
    }
    else {
      setAllowValidation(true)
      validateJobTitle();

      validateField()

      validateCompanyName()

      validateJobType()

      validateLocation()

      validateJobDescription()

      validateSalary()
    }
  };

  const handleCancel = () => {
    setJobTitle('');
    setJobTitleError('')
    setField('');
    setFieldError('')
    setCompanyName('');
    setCompanyNameError('')
    setJobType('');
    setJobTypeError('')
    setLocation('');
    setLocationError('')
    setJobDescription('');
    setJobDescriptionError('')
    setSalary('');
    setSalaryError('')
  };
  const validateJobTitle = () => {
    if (allowValidation) {
      if (jobTitle.length < 1) {
        setJobTitleError("Please enter a valid job title")
      }
      else {
        setJobTitleError(null)
      }
    }
  }
  const validateField = () => {
    if (allowValidation) {

      if (!field) {
        setFieldError("Please select a field")
      }
      else {
        setFieldError(null)
      }

    }

  }
  const validateCompanyName = () => {
    if (allowValidation) {
      if (!companyName) {
        setCompanyNameError("Please enter a valid company name");
      }
      else {
        setCompanyNameError('');
      }
    }

  }
  const validateJobType = () => {
    if (allowValidation) {
      if (!jobType) {
        setJobTypeError("Please select a job type");
      }
      else {
        setJobTypeError('')
      }
    }
  }
  const validateLocation = () => {
    if (allowValidation) {
      if (!location) {
        setLocationError('Please select a location');
      }
      else {
        setLocationError('')
      }
    }

  }
  const validateJobDescription = () => {
    if (allowValidation) {
      if (!jobDescription) {
        setJobDescriptionError("Please enter a valid job description");
      }
      else {
        setJobDescriptionError("");
      }
    }

  }
  const validateSalary = () => {
    if (allowValidation) {
      if (!salary) {
        setSalaryError("Please enter a valid salary")
      }
      else if (isNaN(salary)) {
        setSalaryError("Please enter a Numaric Value")
      }
      else {
        setSalaryError("")
      }
    }

  }
  const checkAllFieldsvalid = () => {
    if (jobTitleError == '' && fieldError == '' && companyNameError == '' && jobTypeError == '' && locationError == ''
      || jobDescriptionError == '' && salaryError == '') {
      return true

    }
    else {

      return false;
    }
  }

  return (
      <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name="Profile">
          {() => (
              <ScrollView contentContainerStyle={styles.container}>
                {(isSaving) && <ActivityIndicator size="large" color="#000ff"></ActivityIndicator>}
                <Text style={styles.label}>Job Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Job Title"
                    value={jobTitle}
                    onChangeText={(jobTitle) => {
                      setAllowValidation(true)
                      setJobTitle(jobTitle);
                      validateJobTitle()
                    }
                    }
                />
                {jobTitleError && <Text style={styles.errorText}>{jobTitleError}</Text>}
                <Text style={styles.label}>Field</Text>
                <Picker
                    style={styles.input}
                    selectedValue={field}
                    onValueChange={(itemValue) => {
                      setAllowValidation(true)
                      setField(itemValue)
                      validateField()
                    }
                    }
                >
                  <Picker.Item label="Select Field" value="" />
                  <Picker.Item label="IT" value="IT" />
                  <Picker.Item label="Finance" value="Finance" />
                  <Picker.Item label="HR" value="HR" />
                  <Picker.Item label="Construction" value="Construction" />
                </Picker>
                {fieldError && <Text style={styles.errorText}>{fieldError}</Text>}
                <Text style={styles.label}>Company Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Company Name"
                    value={companyName}
                    onChangeText={(companyName) => {
                      setAllowValidation(true)
                      setCompanyName(companyName)
                    }}
                />
                <Text style={styles.errorText}>{companyNameError}</Text>
                <Text style={styles.label}>Job Type</Text>
                <Picker
                    style={[styles.input, { marginLeft: -2 }]}
                    selectedValue={jobType}
                    onValueChange={(itemValue) => {
                      setAllowValidation(true)
                      setJobType(itemValue)
                      validateJobType()
                    }}

                >
                  <Picker.Item label="Select Job Type" value="" />
                  <Picker.Item label="Contract" value="Contract" />
                  <Picker.Item label="Part-time" value="Part-time" />
                  <Picker.Item label="Full-time" value="Full-time" />
                  <Picker.Item label="Seasonal" value="Seasonal" />
                </Picker>
                {jobTypeError&&<Text style={styles.errorText}>{jobTypeError}</Text>}
                <Text style={styles.label}>Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Location"
                    value={location}
                    onChangeText={(location) => {
                      setAllowValidation(true)
                      setLocation(location)
                      validateLocation()
                    }}
                />
                {locationError && <Text style={styles.errorText}>{locationError}</Text>}
                <Text style={styles.label}>Job Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter Job Description"
                    multiline
                    numberOfLines={4}
                    value={jobDescription}
                    onChangeText={(jobDescription) => {
                      setAllowValidation(true)
                      setJobDescription(jobDescription)
                      validateJobDescription()
                    }}
                />
                {jobDescriptionError && <Text style={styles.errorText}>{jobDescriptionError}</Text>}
                <Text style={styles.label}>Salary (CAD)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Salary"
                    keyboardType="numeric"
                    value={salary}
                    onChangeText={(salary) => {
                      setAllowValidation(true)
                      setSalary(salary)
                      validateSalary()
                    }}
                />
                {salaryError && <Text style={styles.errorText}>{salaryError}</Text>}
                <View style={styles.button_container}>
                  <TouchableOpacity style={[styles.button]}
                                    onPress={handleSubmit}
                                    disabled={isSaving}>
                    <Text style={styles.buttonText}>Post Job</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000' }]} onPress={() => handleCancel()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>

  );






}


export default PostJobsScreen;

