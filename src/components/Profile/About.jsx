import PropTypes from "prop-types";

function About({about}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
      <p className="text-gray-600 whitespace-pre-line">
        {about ? about : "No about found."}
      </p>
    </div>
  );
}

About.propTypes = {
  about: PropTypes.string
};

export default About