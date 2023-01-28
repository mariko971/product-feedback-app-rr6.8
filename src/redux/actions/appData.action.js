import { commentsCount } from "../../components/pages/suggestions-page/suggestions-page-main/suggestion/suggestion.component";

export const sortByLeastVotes = () =>({
    type: 'least votes'
});

export const sortByMostComments = () =>({
    type: 'most comments',
    payload: commentsCount
});

export const sortByLeastComments = () =>({
    type: 'least comments',
    payload: commentsCount
});

export const sortByMostVotes = () =>({
    type: 'most votes'
});

export const postCommentAction = (id,comment)=>({
    type: 'POST_COMMENT',
    payload: {
        id: id,
        comment: comment
    }
});

export const replyToCommentAction = (id,reply)=>({
    type: 'REPLY_TO_COMMENT',
    payload: {
        id: id,
        reply: reply
    }
});

export const editFeedbackAction = (id,changes)=>({
    type: 'SAVE_CHANGES',
    payload: {
        id: id,
        changes: changes
    }
});
export const deleteFeedbackAction = (id)=>({
    type: 'DELETE_FEEDBACK',
    payload: id
});
