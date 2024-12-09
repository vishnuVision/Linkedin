import PropTypes from "prop-types"
import Map from "./Map"

function About({address=["Surat","London","USA","kalaallit nunaat","Argentina"]}) {
    return (
        <div className="overflow-hidden rounded-lg">
            <div className="bg-white rounded-lg shadow p-6 mt-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-600 whitespace-pre-line">
                    Passionate software engineer with 8+ years of experience in full-stack development.
                    Specialized in React, Node.js, and cloud technologies.

                    Leading technical initiatives and mentoring junior developers while staying up-to-date with the latest industry trends.
                </p>
                <div className="mt-4">
                    <p className="font-bold text-gray-900 text-md">Website</p>
                    <span className="text-[#0070f3] font-semibold hover:underline">http://srk.one</span>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-gray-900 text-md">Industry</p>
                    <span className="text-gray-600 whitespace-pre-line">Retail Luxury Goods and Jewelry</span>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-gray-900 text-md">Company size</p>
                    <span className="text-gray-600 whitespace-pre-line">5000-10,000 members</span>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-gray-900 text-md">Headquarters</p>
                    <span className="text-gray-600 whitespace-pre-line">Mumbai,Maharashtra</span>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-gray-900 text-md">Founded</p>
                    <span className="text-gray-600 whitespace-pre-line">1964</span>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-gray-900 text-md">Specialities</p>
                    <span className="text-gray-600 whitespace-pre-line">Manufacturing Round and all other Fancy Shape Diamonds., SRK Grading System with 16 detailed parameters., and 24/7 online Inventory with Diamond Certificates, Photos, Videos</span>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow mt-4 border border-gray-300 overflow-hidden">
                <Map addresses={address} />
            </div>
        </div>
    )
}

About.propTypes = {
    address: PropTypes.array,
}

export default About
