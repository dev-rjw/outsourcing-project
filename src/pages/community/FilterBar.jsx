const FilterBar = ({ onSortChange, currentSortOrder }) => {
  return (
    <div className="flex justify-start items-center space-x-4 p-4 ml-6">
      <button
        className={`softBtn ${
          currentSortOrder === "latest" ? "text-primary" : "text-main"
        }`}
        onClick={() => onSortChange("latest")}
      >
        최신순
      </button>
      <span className="text-main">|</span>
      <button
        className={`softBtn ${
          currentSortOrder === "popular" ? "text-primary" : "text-main"
        }`}
        onClick={() => onSortChange("popular")}
      >
        인기순
      </button>
    </div>
  );
};

export default FilterBar;
