import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./redux/store";
import "./index.css";
import App from "./App";
import {
  FeedbackDetailPage,
  FeedbackEditForm,
  NewFeedbackForm,
  RoadmapPage,
  SuggestionsPage,
} from "./components/pages/index";
import { loader as getPostID } from "./components/pages/feed-back-detail-page/feedback-detail.component";
import { loader as editPostID } from "./components/pages/feedback-edit/edit-feedback.component";
import { loader as getData } from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: getData,
    children: [
      {
        path: "/",
        element: <SuggestionsPage />,
      },
      {
        path: "feedback/:requestID",
        element: <FeedbackDetailPage />,
        loader: getPostID,
      },
      {
        path: "edit/:requestID",
        element: <FeedbackEditForm />,
        loader: editPostID,
      },
      {
        path: "new-feedback",
        element: <NewFeedbackForm />,
      },
      {
        path: "roadmap",
        element: <RoadmapPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
