const sortInit = {
  sortBy: "",
};

const suggestionsSortBy = (state = sortInit, action) => {
  switch (action.type) {
    case "SET_SORTBY":
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export default suggestionsSortBy;
