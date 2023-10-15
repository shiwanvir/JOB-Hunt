import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./dbConfig";
export async function save(data) {
  console.log("Saving", data);

  try {
    const dbCollection = collection(db, "Resume");
    const docRef = await addDoc(dbCollection, data);
    //console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    //console.error("Error adding document: ", e);
    return e;
  }
}
export async function update(id, data) {
  console.log("Updating", id, data);

  //return result;
  // const docRef = doc(db);
  // // Set the "capital" field of the city 'DC'
  // await updateDoc(washingtonRef, {
  //   capital: true,
  // });
  try {
    const docRef = doc(db, "Tasks", id);
    const result = await updateDoc(docRef, data);
    console.log("result:", result);
  } catch (e) {
    console.log(e);
  }
}

export async function remove(id) {
  console.log("Delet:", id);
  try {
    const docRef = doc(db, "Tasks", id);
    const result = await deleteDoc(docRef);
    console.log("result:", result);
    return true;
  } catch (e) {
    return false;
  }
}
