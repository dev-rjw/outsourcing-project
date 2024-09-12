import FilterBar from "./FilterBar";
import PostInput from "./postInput";
import PostList from "./postList";

const Community = () => {
  return (
    <div className="bg-[#d3d3d3] h-screen">
      <FilterBar />
      <PostInput />
      <PostList />
    </div>
  );
};

export default Community;
