const personList = (state = [], action) => {
  const newPersonList = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_PERSON':
      return [...newPersonList, [action.id, action.item]];
    case 'REMOVE_PERSON':
      newPersonList.splice(action.personIndex, 1);
      return newPersonList;
    case 'ADD_ACTS':
      newPersonList[action.personIndex][1].acts = newPersonList[action.personIndex][1].acts.concat(
        action.acts,
      );
      return newPersonList;
    default:
      return state;
  }
};

export default personList;
