const CategorySelect = ({ state, setState, categoryName, codes }) => {
  return (
    <select value={state} onChange={(e) => setState(e.target.value)} selected={categoryName} name={categoryName}>
      <option value={categoryName}>{categoryName}</option>
      {Object.values(codes).map((element, index) => {
        return (
          <option key={index} value={element}>
            {element}
          </option>
        );
      })}
    </select>
  );
};

export default CategorySelect;
