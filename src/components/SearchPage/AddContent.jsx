import { Plus, X } from "lucide-react"
import Input from "../Ui/Input"
import PropTypes from "prop-types";

function AddContent({ content, setContent, contentList=[], setContentList, label, setSearchResults, searchResults=[] }) {

    const addContent = () => {
        if (contentList.length <= 10) {
            console.log(searchResults);
            setSearchResults(searchResults.map((data)=>{
                if(contentList.some(item => item.toLowerCase() === data.region.toLowerCase()))
                {
                    console.log(data.region);
                }
            }));
            setContentList(prev => [...prev, content]);
            setContent("");
        }
    }

    const deleteContent = (index) => {
        console.log(searchResults);
        setContentList(contentList.filter((skill, idx) => idx !== index));
    }

    return (
        <div>
            <label className="block text-lg font-medium text-gray-700">
                {label}
            </label>
            <div className='flex flex-col gap-2 items-start justify-start mt-2'>
                <div className='w-52'>
                    <Input value={content} setvalue={setContent} />
                </div>
                <button onClick={addContent} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full hover:bg-gray-200 hover:ring-1 hover:ring-black`}>
                    <Plus size={20} /> Add {label}
                </button>
            </div>
            <div className='flex flex-wrap gap-2 mt-3'>
                {
                    contentList && contentList.length > 0 && contentList.map((con, index) => (
                        <span onClick={() => deleteContent(index)} key={index} className='bg-[#01754f] cursor-pointer hover:bg-[#10382a] flex items-center gap-2 text-gray-50 px-4 py-1 rounded-full'>
                            {con} <X size={20} />
                        </span>
                    ))
                }
            </div>
        </div>
    )
}

AddContent.propTypes = {
    content: PropTypes.string,
    setContent: PropTypes.func,
    contentList: PropTypes.array,
    setContentList: PropTypes.func,
    label: PropTypes.string,
    setSearchResults: PropTypes.func,
    searchResults: PropTypes.array
};

export default AddContent
