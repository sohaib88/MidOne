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
      case 'remove':
  return {
    ...state,
    data: state.data.filter(
      story => action.payload.objectID !== story.objectID
    ),
  };
    default:
      throw new Error();
  }
};