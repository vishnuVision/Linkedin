import { X } from 'lucide-react';
import PropTypes from 'prop-types';

function ScreeningQuestion({ 
  question, 
  recommended = false, 
  degree,
  idealAnswer,
  skill,
  minimumYears,
  mustHave = false,
  onRemove 
}) {
  return (
    <div className="border rounded-lg p-4 mb-4 relative">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-gray-900">{question}</h4>
            {recommended && (
              <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800 rounded">
                Recommended
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            {degree && (
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-600 w-32">Degree*</span>
                <input 
                  type="text" 
                  value={degree}
                  className="flex-1 px-3 py-1.5 border rounded"
                  readOnly
                />
              </div>
            )}
            
            {skill && (
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-600 w-32">Skill*</span>
                <input 
                  type="text" 
                  value={skill}
                  className="flex-1 px-3 py-1.5 border rounded"
                  readOnly
                />
              </div>
            )}

            {(idealAnswer || minimumYears) && (
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-600 w-32">
                  Ideal answer {minimumYears && "(minimum)"}:
                </span>
                <input 
                  type="text" 
                  value={idealAnswer || minimumYears}
                  className="w-32 px-3 py-1.5 border rounded"
                  readOnly
                />
              </div>
            )}
          </div>
        </div>
        
        {onRemove && (
          <button 
            onClick={onRemove}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {mustHave && (
        <div className="mt-3 flex items-center gap-2">
          <input type="checkbox" checked={mustHave} readOnly />
          <span className="text-sm text-gray-700">Must-have qualification</span>
        </div>
      )}
    </div>
  );
}

ScreeningQuestion.propTypes = {
    question:PropTypes.string,
    recommended:PropTypes.bool,
    degree:PropTypes.string,
    idealAnswer:PropTypes.string,
    skill:PropTypes.string,
    minimumYears:PropTypes.number,
    mustHave:PropTypes.bool,
    onRemove:PropTypes.func
}

export default ScreeningQuestion;