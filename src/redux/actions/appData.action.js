export const updateRequestsAction = (requests) => ({
  type: "UPDATE_REQUESTS",
  payload: requests,
});

export const updateCurrentUserAction = (user) => ({
  type: "UPDATE_CURRENT_USER",
  payload: user,
});

export const addFeedbackAction = (feedback) => ({
  type: "ADD_FEEDBACK",
  payload: feedback,
});

export const postCommentAction = (id, comment) => ({
  type: "POST_COMMENT",
  payload: {
    id: id,
    comment: comment,
  },
});

export const replyToCommentAction = (id, reply) => ({
  type: "REPLY_TO_COMMENT",
  payload: {
    id: id,
    reply: reply,
  },
});

export const editFeedbackAction = (id, changes) => ({
  type: "SAVE_CHANGES",
  payload: {
    id: id,
    changes: changes,
  },
});
export const deleteFeedbackAction = (id) => ({
  type: "DELETE_FEEDBACK",
  payload: id,
});

export const upvoteAction = (id) => ({
  type: "UPVOTE_COMMENT",
  payload: id,
});
