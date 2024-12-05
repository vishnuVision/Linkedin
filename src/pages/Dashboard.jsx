import CreatePost from '../components/Dashboard/CreatePost';
import Feed from '../components/Dashboard/Feed';
import DashboardLayout from '../components/layouts/DashboardLayout';

function Dashboard() {
  return (
    <div className='pb-10 max-h-[90vh]'>
      <CreatePost />
      <Feed />
    </div>
  );
}

export default DashboardLayout()(Dashboard);  