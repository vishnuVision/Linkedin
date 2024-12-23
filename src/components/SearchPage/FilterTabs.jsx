import PropTypes from "prop-types";
import FilterItem from "./FilterItem";

const FilterTabs = ({selectedTab, setSelectedTab}) => {
  const tabs = ['People', 'Posts', 'Groups', 'Jobs', 'Companies', 'Schools', 'Events'];
  
  return (
    <div className="flex space-x-2 overflow-x-auto py-2 justify-center items-center">
      {tabs.map((tab) => (
        <FilterItem key={tab} tab={tab} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      ))}
    </div>
  );
};

FilterTabs.propTypes = {
  selectedTab: PropTypes.string,
  setSelectedTab: PropTypes.func
}

export default FilterTabs;