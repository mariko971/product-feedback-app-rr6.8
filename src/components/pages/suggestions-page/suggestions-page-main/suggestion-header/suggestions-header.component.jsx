import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { sortByAction } from "../../../../../redux/actions/sortBy.action";
import "./suggestions-header.style.scss";

const SuggestionsHeader = ({
  sortBytoggle,
  appData,
  suggestionsSort: { sortBy },
}) => {
  console.log(sortBy);
  const [open, toggleOpen] = useState({ toggle: false, dropdown: "" });

  // function toggles the sort by dropdown
  const toggleDropdown = () => {
    if (!open.toggle) {
      toggleOpen({ toggle: true, dropdown: "open" });
    } else {
      toggleOpen({ toggle: false, dropdown: "" });
    }
  };

  // sets class to indicate the active sort .
  const checkSelected = (option, opt) => (option === opt ? opt : null);

  /*
    function closes the dropdown when user clicks an option,
    dispatches the 'sortByAction.
  */
  const sortFilter = (sort) => {
    toggleDropdown();
    sortBytoggle(sort);
  };

  return (
    <div className="suggestions-header">
      <p className="suggestions-header-icon">
        <img
          src="assets/suggestions/icon-suggestions.svg"
          alt="suggestions icon"
        />
      </p>
      <h3 className="suggestions-header-count">
        {appData.productRequests.length} suggestions
      </h3>
      <div className={`suggestions-header-drpdown ${open.dropdown}`}>
        <ul className="sort-by">
          <li className="sort-by-option">
            <p className="sort-link" onClick={() => sortFilter("most votes")}>
              Most Upvotes
            </p>
            <p
              className={`sort-by-option-check ${checkSelected(
                "most-votes",
                sortBy.split(" ").join("-")
              )}`}
            >
              <img src="assets/shared/icon-check.svg" alt="checked icon" />
            </p>
          </li>
          <li className="sort-by-option">
            <p className="sort-link" onClick={() => sortFilter("least votes")}>
              Least Upvotes
            </p>
            <p
              className={`sort-by-option-check ${checkSelected(
                "least-votes",
                sortBy.split(" ").join("-")
              )}`}
            >
              <img src="assets/shared/icon-check.svg" alt="checked icon" />
            </p>
          </li>
          <li className="sort-by-option">
            <p
              className="sort-link"
              onClick={() => sortFilter("most comments")}
            >
              Most Comments
            </p>
            <p
              className={`sort-by-option-check ${checkSelected(
                "most-comments",
                sortBy.split(" ").join("-")
              )}`}
            >
              <img src="assets/shared/icon-check.svg" alt="checked icon" />
            </p>
          </li>
          <li className="sort-by-option">
            <p
              className="sort-link"
              onClick={() => sortFilter("least comments")}
            >
              Least Comments
            </p>
            <p
              className={`sort-by-option-check ${checkSelected(
                "least-comments",
                sortBy.split(" ").join("-")
              )}`}
            >
              <img src="assets/shared/icon-check.svg" alt="checked icon" />
            </p>
          </li>
        </ul>
      </div>

      <div className="suggestions-header-sort" onClick={() => toggleDropdown()}>
        Sort by:
        <span>
          <p className="suggestions-header-filter">{sortBy}</p>
          <img
            className="suggestions-header-drp"
            src="assets/shared/icon-arrow-down.svg"
            alt="arrow down"
          />
        </span>
      </div>
      <Link to="new-feedback" id="link">
        <p className="button suggestions-header-btn">+ Add Feedback</p>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sortBytoggle: (sortby) => dispatch(sortByAction(sortby)),
});

const mapStateToProps = (state) => ({
  appData: state.appData,
  suggestionsSort: state.suggestionsSort,
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsHeader);
