const sharedItems = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_SHARED':
      return state;
    case 'REMOVE_SHARED':
    case 'REMOVE_ACT': {
      const newState = { ...state };
      if (action.id in state) delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};
export default sharedItems;
