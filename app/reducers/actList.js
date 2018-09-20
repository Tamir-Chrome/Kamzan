const actList = (state = [], action) => {
  // deep copy
  const newActList = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_ACT':
      return [...newActList, [action.id, action.item]];
    case 'REMOVE_ACT':
      newActList.splice(action.indexOfAct, 1);
      return newActList;
    case 'ADD_ACTS':
      action.actsIndexes.forEach((actIndex) => {
        newActList[actIndex][1].users += 1;
      });
      return newActList;
    case 'REMOVE_PERSON':
      action.actsIndexes.forEach((actIndex) => {
        newActList[actIndex][1].users -= 1;
      });
      return newActList;
    case 'CHANGE_SHARED':
      newActList[action.indexOfAct][1].isShared = !newActList[action.indexOfAct][1].isShared;
      return newActList;
    case 'REMOVE_PERSON_ACT':
      newActList[action.actIndex][1].users -= 1;
      return newActList;
    default:
      return state;
  }
};

export default actList;
