import {
  addCommentFire,
  editFeedbackFire,
  deleteFeedbackFire,
  replyToCommentFire,
  upvoteActionFire,
  addFeedbackFire,
} from "../../firebase/firebase.utils";

//const app_Data = require("../data.json");
const app_Data = { productRequests: [], currentUser: {} };

const appDataReducer = (state = app_Data, action) => {
  switch (action.type) {
    case "UPDATE_REQUESTS": {
      return {
        ...state,
        productRequests: [...action.payload],
      };
    }
    case "UPDATE_CURRENT_USER": {
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    }
    case "most votes": {
      return {
        ...state,
        productRequests: [
          ...state.productRequests.sort(function (a, b) {
            return b.upvotes - a.upvotes;
          }),
        ],
      };
    }
    case "least votes": {
      return {
        ...state,
        productRequests: [
          ...state.productRequests.sort(function (a, b) {
            return a.upvotes - b.upvotes;
          }),
        ],
      };
    }
    case "most comments": {
      return {
        ...state,
        productRequests: [
          ...state.productRequests.sort(function (a, b) {
            return action.payload(b.comments) - action.payload(a.comments);
          }),
        ],
      };
    }
    case "least comments": {
      return {
        ...state,
        productRequests: [
          ...state.productRequests.sort(function (a, b) {
            return action.payload(a.comments) - action.payload(b.comments);
          }),
        ],
      };
    }
    case "UPVOTE_COMMENT": {
      const req = state.productRequests.find(
        (request) => request.id === action.payload
      );
      const reqIndex = state.productRequests.indexOf(req);
      let newproductRequests = [...state.productRequests];
      let tempReq = { ...newproductRequests[reqIndex] };
      tempReq.upvotes = tempReq.upvotes + 1;
      newproductRequests[reqIndex] = tempReq;
      upvoteActionFire(action.payload);
      return {
        ...state,
        productRequests: [...newproductRequests],
      };
    }
    case "ADD_FEEDBACK": {
      const tempProductRequests = [...state.productRequests];
      tempProductRequests.push(action.payload);
      addFeedbackFire("productRequests", action.payload);
      return {
        ...state,
        productRequests: [...tempProductRequests],
      };
    }
    case "POST_COMMENT": {
      const { id, comment } = action.payload;
      const req = state.productRequests.find((request) => request.id === id);
      const reqIndex = state.productRequests.indexOf(req);
      let newproductRequests = [...state.productRequests];
      let tempReq = { ...newproductRequests[reqIndex] };
      let tempComments = [...tempReq.comments];
      tempComments.push(comment);
      addCommentFire(id, comment);
      tempReq.comments = tempComments;
      newproductRequests[reqIndex] = tempReq;
      return {
        ...state,
        productRequests: [...newproductRequests],
      };
    }
    case "SAVE_CHANGES": {
      const { id, changes } = action.payload;
      const req = state.productRequests.find((request) => request.id === id);
      const reqIndex = state.productRequests.indexOf(req);
      let newproductRequests = [...state.productRequests];
      newproductRequests[reqIndex] = { ...changes };
      editFeedbackFire(id, changes);
      return {
        ...state,
        productRequests: [...newproductRequests],
      };
    }
    case "DELETE_FEEDBACK": {
      let newproductRequests = [...state.productRequests];
      const req = newproductRequests.findIndex(
        (request) => request.id === action.payload
      );
      newproductRequests.splice(req, 1);
      deleteFeedbackFire(action.payload);
      return {
        ...state,
        productRequests: [...newproductRequests],
      };
    }
    case "REPLY_TO_COMMENT": {
      const { id, reply } = action.payload;
      let newproductRequests = [...state.productRequests];
      const reqIndex = newproductRequests.findIndex(
        (request) => request.id === id.requestID
      );
      let newReq = { ...newproductRequests[reqIndex] };
      let newReqComments = [...newReq.comments];
      let commentIndex = newReqComments.findIndex(
        (comment) => comment.id === id.commentID
      );
      let newComment = { ...newReqComments[commentIndex] };
      let newCommentReps = newComment.replies
        ? [...newComment.replies]
        : (newComment.replies = []);
      newCommentReps.push(reply);
      newComment.replies = newCommentReps;
      newReqComments[commentIndex] = newComment;
      newReq.comments = newReqComments;
      replyToCommentFire(id.requestID, newReqComments);
      newproductRequests[reqIndex] = newReq;

      return {
        ...state,
        productRequests: [...newproductRequests],
      };
    }

    default:
      return state;
  }
};

export default appDataReducer;
