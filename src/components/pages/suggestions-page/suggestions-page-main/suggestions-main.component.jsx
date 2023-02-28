import React from "react";
import { connect } from "react-redux";

import "./suggestions-main.style.scss";
import Suggestion from "./suggestion/suggestion.component";
import SuggestionsHeader from "./suggestion-header/suggestions-header.component";
import Emptysuggestions from "./no-suggestions/no-suggestions.component";
import { filterRequests, sortbyData } from "../../../utils";

const SuggestionsMain = (props) => {
  const {
    appData: { productRequests, currentUser },
    suggestionsFilter: { filter },
    suggestionsSort: { sortBy },
  } = props;
  const requestsData = sortBy
    ? sortbyData(sortBy, [...filterRequests(productRequests, filter)])
    : filterRequests(productRequests, filter);
  return (
    <div className="suggestion-main-wrapper">
      <SuggestionsHeader />
      <div className="suggestion-wrap">
        {requestsData.length === 0 ? (
          <Emptysuggestions />
        ) : (
          requestsData.map((request) => {
            return (
              <Suggestion
                key={request.id}
                {...request}
                currentUser={currentUser}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appData: state.appData,
  suggestionsFilter: state.suggestionsFilter,
  suggestionsSort: state.suggestionsSort,
});
export default connect(mapStateToProps)(SuggestionsMain);
