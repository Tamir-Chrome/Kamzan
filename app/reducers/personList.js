const personList = (state = [], action) => {
  const newPersonList = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'REMOVE_ACT':
      return state.map((person) => {
        // take out deleted item
        const newAct = [...person[1].acts].filter(item => item !== action.id);
        return [
          person[0],
          {
            ...person[1],
            acts: newAct,
          },
        ];
      });
    case 'ADD_PERSON':
      return [
        ...newPersonList,
        [
          action.id,
          {
            name: action.personName,
            payed: action.payedAmount,
            acts: [],
          },
        ],
      ];
    case 'REMOVE_PERSON': {
      const newActList = { ...state };
      delete newActList[action.id];
      return newActList;
    }
    default:
      return state;
  }
};

export default personList;
