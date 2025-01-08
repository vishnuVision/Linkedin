import { useSelector } from 'react-redux';
import CreatePost from '../components/Dashboard/CreatePost';
import Feed from '../components/Dashboard/Feed';
import DashboardLayout from '../components/layouts/DashboardLayout';
import useApi from '../hook/useApi';
import { useContext, useEffect, useState } from 'react';
import LoaderCard from '../components/Loaders/LoaderCard';
import { sampleContext } from '../App';
import { Loader } from 'lucide-react';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const { apiAction } = useApi();
  const { user } = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(true);
  const { page, setPage } = useContext(sampleContext);
  const [error, setError] = useState("");
  let prevScrollTop = 0;

  useEffect(() => {
    if (page && user) {
      fetchData(page);
    }
  }, [user, page])

  const handleInfiniteScroll = () => {
    const divElement = document.getElementById("layout");
    const { scrollTop, scrollHeight, clientHeight } = divElement;
    if (scrollTop + clientHeight >= scrollHeight - 1 && scrollTop > prevScrollTop) {
      setIsLoading(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 1000);
    }
    prevScrollTop = scrollTop;
  }

  useEffect(() => {
    const divElement = document.getElementById("layout");
    if (!divElement) {
      console.error("Element with ID 'layout' not found");
      return;
    }
    divElement.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      divElement.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  const fetchData = async (page) => {
    const { success, data } = await apiAction({
      url: `/api/v1/post/getAllPostDetails?page=${page}`,
      method: "GET",
    });

    if (success) {
      const fetchedData = data?.data;
      if (fetchedData?.length <= 0) {
        setError("No more posts");
      }
      else {
        setPosts(() => [...posts, ...fetchedData]);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className='pb-10 max-h-[90vh]'>
      <CreatePost refereshData={fetchData} />
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
      {
        isLoading && (
          <div className="lg:col-span-2 flex justify-center items-center py-2 animate-spin">
            <Loader />
          </div>
        )
      }
      {
        (!isLoading && error) && (
          <div className='text-center text-lg font-semibold text-gray-600 py-2'>
            {error}
          </div>
        )
      }
    </div>
  );
}

export default DashboardLayout()(Dashboard);  