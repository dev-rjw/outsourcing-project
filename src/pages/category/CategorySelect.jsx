const CategorySelect = ({ state, setState, categoryName, codes }) => {
  return (
    <div className="relative inline-block w-full">
      <select value={state} onChange={(e) => setState(e.target.value)} name={categoryName} className="block w-full border-4 border-gray-500 bg-white text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none">
        <option value={categoryName}>{categoryName}</option>
        {Object.entries(codes).map(([key, value], index) => (
          <option key={index} value={key}>
            {value}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default CategorySelect;
