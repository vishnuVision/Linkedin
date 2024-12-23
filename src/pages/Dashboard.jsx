import { useSelector } from 'react-redux';
import CreatePost from '../components/Dashboard/CreatePost';
import Feed from '../components/Dashboard/Feed';
import DashboardLayout from '../components/layouts/DashboardLayout';
import useApi from '../hook/useApi';
import { useEffect, useState } from 'react';
import LoaderCard from '../components/Loaders/LoaderCard';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const { apiAction } = useApi();
  const { user } = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user])

  const fetchData = async () => {
    const { success, data } = await apiAction({
      url: "/api/v1/post/getAllPostDetails",
      method: "GET",
    });

    if (success) {
      setPosts(data);
      setIsLoading(false);
    }
  };

  return (
    <div className='pb-10 max-h-[90vh]'>
      <CreatePost />
      {
        isLoading && (
          <div className="lg:col-span-2">
            {[1, 2, 3].map((i) => (
              <LoaderCard key={i} />
            ))}
          </div>
        )
      }
      {
        !isLoading && posts.length === 0 && (
          <div className='text-center text-xl font-semibold'>
            No posts yet
          </div>
        )
      }
      <Feed posts={posts} />
    </div>
  );
}

export default DashboardLayout()(Dashboard);  