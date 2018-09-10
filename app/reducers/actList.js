const actList = (state = [], action) => {
  // deep copy
  const newActList = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_ACT':
      return [...newActList, [action.id, action.item]];
    case 'REMOVE_ACT':
      newActList.splice(action.indexOfAct, 1);
      return newActList;
    case 'CHANGE_SHARED':
      newActList[action.indexOfAct][1].isShared = !newActList[action.indexOfAct][1].isShared;
      return newActList;
    default:
      return state;
  }
};

export default actList;
