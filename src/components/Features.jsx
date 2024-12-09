import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Connect with people"
            description="Build your network and connect with professionals"
            buttonText="Find connections"
            to={"/mynetwork/grow"}
          />
          <FeatureCard
            title="Interact with experts"
            description="Learn from industry experts and share your knowledge"
            buttonText="Connect with experts"
            to={"/feed"}
          />
          <FeatureCard
            title="Find the right job"
            description="Discover opportunities that match your skills"
            buttonText="Search jobs"
            to={"/jobs"}
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, buttonText,to }) {
  return (
    <div className="bg-linkedin-gray p-6 rounded-lg shadow-md hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-linkedin-darkGray mb-4">{description}</p>
      <Link to={to} className="bg-blue-50 hover:bg-blue-100 font-semibold py-2 px-4 rounded-full">
        {buttonText}
      </Link>
    </div>
  );
}

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  to:PropTypes.string
}