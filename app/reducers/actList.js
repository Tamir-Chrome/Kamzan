const actList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACT':
      return [...state, [action.id, action.item]];
    case 'REMOVE_ACT': {
      // deep copy
      const newActList = JSON.parse(JSON.stringify(state));
      newActList.splice(action.indexOfAct, 1);
      return newActList;
    }
    default:
      return state;
  }
};

export default actList;
