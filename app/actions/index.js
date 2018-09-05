export const addAct = (id, name, price) => ({
  type: 'ADD_ACT',
  id,
  item: { name, price, isShared: false },
});

export const removeAct = (indexOfAct, id) => ({
  type: 'REMOVE_ACT',
  indexOfAct,
  id,
});
