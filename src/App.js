import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import { firestore } from "./firebase/firebase.utils";
import {
  updateCurrentUserAction,
  updateRequestsAction,
} from "./redux/actions/appData.action";

function App({ updateCurrentUserAction, updateRequestsAction }) {
  useEffect(() => {
    const currentUserRef = firestore.collection("user");
    const collectionRef = firestore.collection("productRequests");

    currentUserRef.onSnapshot(async (snapshot) => {
      const currentUserMap = snapshot.docs.reduce((acc, obj) => {
        return (acc = { ...obj.data() });
      }, {});
      await updateCurrentUserAction(currentUserMap);
    });

    collectionRef.onSnapshot(async (snapshot) => {
      const collectionMap = snapshot.docs.map((doc) => doc.data());
      await updateRequestsAction(collectionMap);
    });
  }, [updateCurrentUserAction, updateRequestsAction]);
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
