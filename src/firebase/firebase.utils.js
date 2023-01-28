import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { collection, getDocs } from "firebase/firestore"; 

const config = {
  apiKey: "AIzaSyCpKr0RcbpzW0oruiB7GFnirNtlyHaRQ-0",
  authDomain: "app-feedback-1f16f.firebaseapp.com",
  projectId: "app-feedback-1f16f",
  storageBucket: "app-feedback-1f16f.appspot.com",
  messagingSenderId: "694762859569",
  appId: "1:694762859569:web:3f69bb8a264a3c68d93910"
  };


  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    const collectionRef= firestore.collection(collectionKey);
    console.log(collectionRef)
    const batch = firestore.batch();
    objectsToAdd.forEach(obj=>{
      const newDocRef = collectionRef.doc(`${obj.id}`);
      batch.set(newDocRef,obj)
    });
    return await batch.commit()
};

export const getData = async ()=>{
  const querySnapshot = await getDocs(collection(firestore, "productRequests"));
  const appData = [];
  querySnapshot.forEach((doc) => {    
    appData.push(doc.data());  
});
console.log(appData);
}

  firebase.initializeApp(config);

  export const firestore = firebase.firestore();

  export default firebase;