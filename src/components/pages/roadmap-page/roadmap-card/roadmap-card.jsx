import React from "react";
// import { withRouter } from 'react-router';
import { connect } from "react-redux";

import "./roadmap-card.style.scss";
import { commentsCount } from "../../../utils";
import { upvoteAction } from "../../../../redux/actions/appData.action";

const RoadmapCard = (props) => {
  const {
    id,
    title,
    description,
    category,
    upvotes,
    comments,
    currentUser,
    upvoteAction,
    status,
  } = props;

  const voted = currentUser.votes.includes(`${id}`) ? "voted" : "";

  const voteAction = () => (!voted ? upvoteAction(id) : null);

  return (
    <div className="card-wrapper">
      <div className={`suggestion ${status}`}>
        <div
          className={`suggestion-upvote ${voted}`}
          onClick={() => voteAction()}
        >
          <div className="suggestion-upvote-arrow">
            <img
              src={
                !voted
                  ? "/assets/shared/icon-arrow-up-blue.svg"
                  : "/assets/shared/icon-arrow-up-white.svg"
              }
              alt="up arrow"
            />
          </div>
          <p className="suggestion-upvote-votes">{upvotes}</p>
        </div>
        <p className={`suggestion-status ${status}-clr`}>In-Progress</p>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productRequests: state.appData.productRequests,
  currentUser: state.appData.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  upvoteAction: (id) => dispatch(upvoteAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoadmapCard);
