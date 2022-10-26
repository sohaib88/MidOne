import React from "react";
function HackReducer(state, action) {
    switch (action.type) {
      case 'initial':
        return {
          ...state,
          isError: false,
        };
      case 'fetched':
        return {
          ...state,
          isError: false,
          data: action.payload,
        };
      case 'notfetched':
        return {
          ...state,
          isError: true,
        };
      default:
        throw new Error();
    }
  };

export default HackReducer;