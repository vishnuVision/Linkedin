import { MoveRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"

function Home() {
    const {id} = useParams();
    return (
        <>
            <div className="bg-white rounded-lg shadow pt-6 mt-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4 px-4">Overview</h2>
                <p className="text-gray-600 whitespace-pre-line px-4">
                    Passionate software engineer with 8+ years of experience in full-stack development.
                    Specialized in React, Node.js, and cloud technologies.

                    Leading technical initiatives and mentoring junior developers while staying up-to-date with the latest industry trends.
                </p>
                <Link to={`/company/${id}/about`} className="py-2 border-t border-gray-200 px-4 mt-4 flex justify-center items-center gap-2 font-semibold cursor-pointer hover:bg-gray-100">
                    <p>Show all details</p>
                    <MoveRight className="pr-1"/>
                </Link>
            </div>
        </>
    )
}

export default Home
