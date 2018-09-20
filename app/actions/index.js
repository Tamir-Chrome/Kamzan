export const addAct = (id, name, price) => ({
  type: 'ADD_ACT',
  id,
  item: {
    name,
    price,
    isShared: false,
    users: 0,
  },
});

export const removeAct = (indexOfAct, id) => ({
  type: 'REMOVE_ACT',
  indexOfAct,
  id,
});

export const changeShared = indexOfAct => ({
  type: 'CHANGE_SHARED',
  indexOfAct,
});

export const addPerson = (id, personName, payedAmount) => ({
  type: 'ADD_PERSON',
  id,
  item: {
    name: personName,
    payed: payedAmount,
    acts: [],
  },
});

export const removePerson = (personIndex, actsIndexes) => ({
  type: 'REMOVE_PERSON',
  personIndex,
  actsIndexes,
});

export const addActs = (personIndex, acts, actsIndexes) => ({
  type: 'ADD_ACTS',
  personIndex,
  acts,
  actsIndexes,
});

export const removePersonAct = (personIndex, actIndex, personActIndex) => ({
  type: 'REMOVE_PERSON_ACT',
  personIndex,
  personActIndex,
  actIndex,
});
