import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import { firestore } from "./firebase/firebase.utils";
import {
  updateCurrentUserAction,
  updateRequestsAction,
} from "./redux/actions/appData.action";

function App() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateRequestsAction: (requests) => dispatch(updateRequestsAction(requests)),
  updateCurrentUserAction: (user) => dispatch(updateCurrentUserAction(user)),
});
export default connect(null, mapDispatchToProps)(App);

export const loader = async () => {
  let currentUserMap;
  let collectionMap;
  const collectionRef = firestore.collection("productRequests");

  collectionRef.onSnapshot(async (snapshot) => {
    collectionMap = snapshot.docs.map((doc) => doc.data());
    console.log(collectionMap);
    //isLoading(false);
  });

  const currentUserRef = firestore.collection("user");

  currentUserRef.onSnapshot(async (snapshot) => {
    currentUserMap = snapshot.docs.reduce((acc, obj) => {
      return (acc = { ...obj.data() });
    }, {});
  });
  updateCurrentUserAction(currentUserMap);
  updateRequestsAction(collectionMap);

  return { user: currentUserMap, collection: collectionMap };
};
