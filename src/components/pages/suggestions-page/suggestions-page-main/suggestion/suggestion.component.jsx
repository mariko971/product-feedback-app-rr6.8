import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./suggestion.style.scss";
import { upvoteAction } from "../../../../../redux/actions/appData.action";
import { commentsCount } from "../../../../utils";

const Suggestion = (props) => {
  const {
    id,
    title,
    description,
    category,
    upvotes,
    comments,
    currentUser,
    upvoteAction,
  } = props;

  const voted = currentUser.votes.includes(id.toString()) ? "voted" : "";
  console.log(voted);

  const voteAction = () => (!voted ? upvoteAction(id) : null);

  return (
    <div className="suggestion-container">
      <div
        className={`suggestion-upvote ${voted}`}
        onClick={() => voteAction()}
      >
        <img
          src={
            !voted
              ? "/assets/shared/icon-arrow-up-blue.svg"
              : "/assets/shared/icon-arrow-up-white.svg"
          }
          alt="up arrow"
        />
        <p className="suggestion-upvote-votes">{upvotes}</p>
      </div>
      <Link to={`/feedback/${id}`} id="suggestion-link">
        <div className="suggestion-main">
          <h3 className="suggestion-main-title">{title}</h3>
          <p className="suggestion-main-txt">{description}</p>
          <p className="suggestion-main-topic body-3">{category}</p>
        </div>
        <div className="suggestion-comments">
          <img
            className="suggestion-comments-icon"
            src="/assets/shared/icon-comments.svg"
            alt="comments"
          />
          <p className="suggestion-comments-count">{commentsCount(comments)}</p>
        </div>
      </Link>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  upvoteAction: (id) => dispatch(upvoteAction(id)),
});
const mapStateToProps = (state) => ({
  currentUser: state.appData.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
