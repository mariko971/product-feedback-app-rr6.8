import React from "react";
// import { withRouter } from 'react-router';
import { connect } from "react-redux";

import "./roadmap-planned.style.scss";
import { commentsCount } from "../../../utils";
import { upvoteAction } from "../../../../redux/actions/appData.action";

const RoadmapPlanned = (props) => {
  const { id, title, description, category, upvotes, comments, currentUser } =
    props;

  const voted = currentUser.votes.includes(`${id}`) ? "voted" : "";

  const voteAction = () => (!voted ? upvoteAction(id) : null);

  return (
    <div className="planned">
      <div className="planned-suggestion planned">
        <div
          className={`planned-suggestion-upvote ${voted}`}
          onClick={() => voteAction(id)}
        >
          <div className="planned-suggestion-upvote-arrow">
            <img
              src={
                !voted
                  ? "/assets/shared/icon-arrow-up-blue.svg"
                  : "/assets/shared/icon-arrow-up-white.svg"
              }
              alt="up arrow"
            />
          </div>
          <p className="planned-suggestion-upvote-votes">{upvotes}</p>
        </div>
        <p className="planned-suggestion-status planned-clr">Planned</p>
        <div className="planned-suggestion-main">
          <h3 className="planned-suggestion-main-title">{title}</h3>
          <p className="planned-suggestion-main-txt">{description}</p>
          <p className="planned-suggestion-main-topic body-3">{category}</p>
        </div>
        <div className="planned-suggestion-comments">
          <img
            className="planned-suggestion-comments-icon"
            src="/assets/shared/icon-comments.svg"
            alt="comments"
          />
          <p className="planned-suggestion-comments-count">
            {commentsCount(comments)}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  upvoteAction: (id) => dispatch(upvoteAction(id)),
});

export default connect(null, mapDispatchToProps)(RoadmapPlanned);
