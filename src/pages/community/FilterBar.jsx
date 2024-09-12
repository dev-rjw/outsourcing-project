const FilterBar = () => {
  return (
    <div className="flex justify-start items-center space-x-4 p-4 ml-6">
      <button className="text-main hover:text-primary focus:outline-none">
        최신순
      </button>
      <span className="text-main">|</span>
      <button className="text-main hover:text-primary focus:outline-none">
        인기순
      </button>
    </div>
  );
};
export default FilterBar;
