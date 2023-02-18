const validateItem = (item) => {

  const permitted = {
    status: ['done', 'pending']
  };
  const invalid = (
    !item
    || !item.id
    || !item.description
    || !permitted.status.includes(item.status)
  );

  return !invalid;

};
export default { validateItem };