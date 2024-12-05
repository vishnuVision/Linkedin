import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#F3F2EF] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">General</h4>
            <ul className="space-y-2">
              <FooterLink to={"/signup"} text="Sign Up" />
              <FooterLink text="Help Center" />
              <FooterLink text="About" />
              <FooterLink text="Press" />
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Browse LinkedIn</h4>
            <ul className="space-y-2">
              <FooterLink text="Learning" />
              <FooterLink to="/jobs" text="Jobs" />
              <FooterLink text="Salary" />
              <FooterLink text="Mobile" />
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Business Solutions</h4>
            <ul className="space-y-2">
              <FooterLink text="Talent" />
              <FooterLink text="Marketing" />
              <FooterLink text="Sales" />
              <FooterLink text="Learning" />
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Directories</h4>
            <ul className="space-y-2">
              <FooterLink to="/mynetwork/grow" text="Members" />
              <FooterLink to="/jobs" text="Jobs" />
              <FooterLink text="Companies" />
              <FooterLink text="Featured" />
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300">
          <p className="text-sm text-linkedin-darkGray">LinkedIn © 2024</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ text,to="/" }) {
  return (
    <li>
      <Link to={to} className="text-sm text-linkedin-darkGray hover:text-linkedin-blue">
        {text}
      </Link>
    </li>
  );
}

FooterLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string
}