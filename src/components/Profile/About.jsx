import { Gem, Pencil } from "lucide-react";
import PropTypes from "prop-types";
import Modal from "../../Modal/Modal";
import React, { useEffect, useState } from "react";
import AboutForm from "../../Forms/AboutForm";
import toast from "react-hot-toast";
import useApi from "../../hook/useApi";

function About({ about, skills = [], refereshUserData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { apiAction } = useApi();

  useEffect(() => {
    setSkillList(skills);
    setSummary(about);
  }, [skills, about])

  const editAbout = async (e) => {
    e.preventDefault();
    let toastId = toast.loading("Updating About...");
    setIsLoading(true);
    try {
      const { success } = await apiAction({
        url: `/api/v1/profile/editAbout`,
        method: "PUT",
        data: { summary, skillList: skillList?.length > 0 ? skillList?.map((skill) => skill?.name) : [] },
        toastId
      });

      if (success) {
        toast.success("Intro updated successfully", { id: toastId });
        setIsModalOpen(false);
        refereshUserData();
      }
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mt-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">About</h2>
          <button onClick={() => setIsModalOpen(true)} className="p-2 hover:bg-gray-100 rounded-full">
            <Pencil className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-600">
              {about ? about : "Not Found"}
            </p>
          </div>
          {
            skillList && skillList.length > 0 && (
              <div className="mt-4">
                <div className="border border-gray-200 rounded-lg hover:border-gray-300 p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="inline-block">
                      <Gem />
                    </span>
                    <div className="flex flex-grow items-center gap-2">
                      <div className="flex-grow items-center">
                        <span className="font-medium">Top skills</span>
                        <div className="flex items-center justify-between py-1 bg-white ">
                          <div className="flex items-center gap-2 text-gray-600">
                            {skillList && skillList.length > 0 && skillList.map((skill, index) => (
                              <React.Fragment key={skill._id}>
                                <span>{skill?.name}</span>
                                {index < skills?.length - 1 && <span>•</span>}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit about"
      >
        <AboutForm setSummary={setSummary} summary={summary} isLoading={isLoading} setSkills={setSkillList} skills={skillList} onCancel={() => setIsModalOpen(false)} onSave={editAbout} />
      </Modal>
    </>
  );
}

About.propTypes = {
  about: PropTypes.string,
  skills: PropTypes.array,
  refereshUserData: PropTypes.func
};

export default About