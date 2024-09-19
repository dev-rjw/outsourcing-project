const CategorySelect = ({ state, setState, categoryName, codes }) => {
  return (
    <select value={state} onChange={(e) => setState(e.target.value)} selected={categoryName} name={categoryName}>
      <option value={categoryName}>{categoryName}</option>
      {Object.entries(codes).map(([key, value], index) => {
        return (
          <option key={index} value={key}>
            {value}
          </option>
        );
      })}
    </select>
  );
};

export default CategorySelect;