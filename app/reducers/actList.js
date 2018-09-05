
const actList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACT':
      return [...state, [action.id, action.item]];
    case 'REMOVE_ACT': {
      // params: action.id
      const newActList = { ...state };
      delete newActList[action.id];
      return newActList;
    }
    default:
      return state;
  }
};

export default actList;
