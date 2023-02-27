import React from "react";
// import { withRouter } from 'react-router';
import { connect } from "react-redux";

import "./roadmap-inprogress.style.scss";
import { commentsCount } from "../../../utils";
import { upvoteAction } from "../../../../redux/actions/appData.action";

const RoadmapInProgress = (props) => {
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

  const voted = currentUser.votes.includes(`${id}`) ? "voted" : "";

  const voteAction = () => (!voted ? upvoteAction(id) : null);

  return (
    <div className="inprogress">
      <div className="inprogress-suggestion progress">
        <div
          className={`inprogress-suggestion-upvote ${voted}`}
          onClick={() => voteAction()}
        >
          <div className="inprogress-suggestion-upvote-arrow">
            <img
              src={
                !voted
                  ? "/assets/shared/icon-arrow-up-blue.svg"
                  : "/assets/shared/icon-arrow-up-white.svg"
              }
              alt="up arrow"
            />
          </div>
          <p className="inprogress-suggestion-upvote-votes">{upvotes}</p>
        </div>
        <p className="inprogress-suggestion-status progress-clr">In-Progress</p>
        <div className="inprogress-suggestion-main">
          <h3 className="inprogress-suggestion-main-title">{title}</h3>
          <p className="inprogress-suggestion-main-txt">{description}</p>
          <p className="inprogress-suggestion-main-topic body-3">{category}</p>
        </div>
        <div className="inprogress-suggestion-comments">
          <img
            className="inprogress-suggestion-comments-icon"
            src="/assets/shared/icon-comments.svg"
            alt="comments"
          />
          <p className="inprogress-suggestion-comments-count">
            {commentsCount(comments)}
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoadmapInProgress);
