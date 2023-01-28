
export const sortByAction = sort => ({
    type: 'SET_SORTBY',
    payload: sort
});

export default sortByAction;

    // const suggestionReq = productRequests[productRequests.findIndex(req=>req.id===requestID)];
    // const commIndex = suggestionReq.comments.findIndex(com=>com.id===commentID);
    // const seqComments = [...suggestionReq.comments];
    // const seqComment = seqComments[commIndex];
    // const seqCommentReps = seqComment.replies ? [...seqComment.replies, newReply]
    //  : 
    //  [newReply];
    //  seqComment.replies =seqCommentReps;
    //  seqComments[commIndex] =seqComment;