function HackReducer(state, action) {
  switch (action.type) {
    case 'initial':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'fetched':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'notfetched':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};