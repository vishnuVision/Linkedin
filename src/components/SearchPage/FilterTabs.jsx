import FilterItem from "./FilterItem";

const FilterTabs = () => {

  const tabs = ['People', 'Posts', 'Groups', 'Jobs', 'Products', 'Companies', 'Schools', 'Courses', 'Events', 'Services'];
  
  return (
    <div className="flex space-x-2 overflow-x-auto py-2 justify-center items-center">
      {tabs.map((tab) => (
        <FilterItem key={tab} tab={tab}/>
      ))}
    </div>
  );
};

export default FilterTabs;