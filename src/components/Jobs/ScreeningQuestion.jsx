import { X } from 'lucide-react';
import PropTypes from 'prop-types';

function ScreeningQuestion({
  questionDetail,
  onRemove,
  onChange,
  index,
  changeFields
}) {

  return (
    <div className="border rounded-lg p-4 mb-4 relative">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-gray-900">{questionDetail?.question}</h4>
            {questionDetail?.recommended && (
              <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800 rounded">
                Recommended
              </span>
            )}
          </div>

          <div className="space-y-3">
            {questionDetail?.isDegree && (
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-600 w-32">Degree*</span>
                <input
                  type="text"
                  value={questionDetail?.degree}
                  onChange={(e)=>changeFields(e.target.value,index,"degree")}
                  className="flex-1 px-3 py-1.5 border rounded"
                />
              </div>
            )}

            {questionDetail?.isSkill && (
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-600 w-32">Skill*</span>
                <input
                  type="text"
                  value={questionDetail?.skill}
                  onChange={(e)=>changeFields(e.target.value,index,"skill")}
                  className="flex-1 px-3 py-1.5 border rounded"
                />
                <input
                  type="number"
                  value={questionDetail?.minimumYears}
                  onChange={(e)=>changeFields(e.target.value,index,"minimumYears")}
                  className="w-32 px-3 py-1.5 border rounded"
                />
              </div>
            )}

            {questionDetail?.isExperience && (
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-600 w-32">
                  Experience
                </span>
                <input
                  type="text"
                  value={questionDetail?.experience}
                  onChange={(e)=>changeFields(e.target.value,index,"experience")}
                  className="flex-1 px-3 py-1.5 border rounded"
                />
                <input
                  type="number"
                  value={questionDetail?.minimumYears}
                  onChange={(e)=>changeFields(e.target.value,index,"minimumYears")}
                  className="w-32 px-3 py-1.5 border rounded"
                />
              </div>
            )}

            {
              questionDetail?.isLanguage && (
                <div className="flex gap-4 items-center">
                  <span className="text-sm text-gray-600 w-32">
                    Language
                  </span>
                  <input
                    type="number"
                    value={questionDetail?.language}
                    onChange={(e)=>changeFields(e.target.value,index,"language")}
                    className="w-32 px-3 py-1.5 border rounded"
                  />
                  <select onChange={(e)=>changeFields(e.target.value,index,"languageLevel")} className='w-32 px-3 py-1.5 border rounded' value={questionDetail?.languageLevel}>
                    <option value="">None</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Professional">Professional</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
              )
            }

            {
              questionDetail?.answer && (
                <div className="flex gap-4 items-center">
                  <span className="text-sm text-gray-600 w-32">
                    Ideal answer
                  </span>
                  <label className='w-32 px-3 py-1.5 rounded'>{questionDetail?.answer}</label>
                </div>
              )
            }
          </div>
        </div>

        {onRemove && (
          <button
            onClick={() => onRemove(questionDetail, index)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input type="checkbox" checked={questionDetail?.mustHave} value={questionDetail?.mustHave} onChange={() => onChange(index)} readOnly />
        <span className="text-sm text-gray-700">Must-have qualification</span>
      </div>
    </div>
  );
}

ScreeningQuestion.propTypes = {
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
  index: PropTypes.number,
  questionDetail: PropTypes.any,
  changeFields:PropTypes.func
}

export default ScreeningQuestion;