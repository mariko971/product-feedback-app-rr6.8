import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { sortByAction } from "../../../../../redux/actions/sortBy.action";
import {
  sortByLeastVotes,
  sortByMostComments,
  sortByMostVotes,
  sortByLeastComments,
} from "../../../../../redux/actions/appData.action";

import "./suggestions-header.style.scss";

const SuggestionsHeader = ({
  sortByFilter: { sortBy },
  sortBytoggle,
  appData,
}) => {
  const [open, toggleOpen] = useState({ toggle: false, dropdown: "" });
  const [sorter, toggleSorter] = useState("most-votes");

  const toggleDropdown = () => {
    if (!open.toggle) {
      toggleOpen({ toggle: true, dropdown: "open" });
    } else {
      toggleOpen({ toggle: false, dropdown: "" });
    }
  };

  const checkSelected = (option, opt) => (option === opt ? opt : null);

  const sortFilter = (sort, sortby) => {
    toggleDropdown();
    sortBytoggle(sort);
    sortby();
    toggleSorter(sort.split(" ").join("-"));
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
            <p
              className="sort-link"
              onClick={() => sortFilter("most votes", sortByMostVotes)}
            >
              Most Upvotes
            </p>
            <p
              className={`sort-by-option-check ${checkSelected(
                "most-votes",
                sorter
              )}`}
            >
              <img src="assets/shared/icon-check.svg" alt="checked icon" />
            </p>
          </li>
          <li className="sort-by-option">
            <p
              className="sort-link"
              onClick={() => sortFilter("least votes", sortByLeastVotes)}
            >
              Least Upvotes
            </p>
            <p
              className={`sort-by-option-check ${checkSelected(
                "least-votes",
                sorter
              )}`}
            >
              <img src="assets/shared/icon-check.svg" alt="checked icon" />
            </p>
          </li>
          <li className="sort-by-option">
            <p
              className="sort-link"
              onClick={() => sortFilter("most comments", sortByMostComments)}
            >
              Most Comments
            </p>
            <p
              className={`sort-by-option-check ${checkSelected(
                "most-comments",
                sorter
              )}`}
            >
              <img src="assets/shared/icon-check.svg" alt="checked icon" />
            </p>
          </li>
          <li className="sort-by-option">
            <p
              className="sort-link"
              onClick={() => sortFilter("least comments", sortByLeastComments)}
            >
              Least Comments
            </p>
            <p
              className={`sort-by-option-check ${checkSelected(
                "least-comments",
                sorter
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
  sortByLeastVotes: () => dispatch(sortByLeastVotes()),
  sortByMostComments: () => dispatch(sortByMostComments()),
  sortByMostVotes: () => dispatch(sortByMostVotes()),
  sortByLeastComments: () => dispatch(sortByLeastComments()),
});

const mapStateToProps = (state) => ({
  appData: state.appData,
  sortByFilter: state.sortByFilter,
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsHeader);
