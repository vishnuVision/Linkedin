import { ChartColumnBig, Search, Users } from "lucide-react"

function Analytics() {
    return (
        <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics</h2>
            <div className="flex gap-4 flex-wrap justify-between items-center">
                <div className="flex gap-2">
                    <div>
                        <Users />
                    </div>
                    <div>
                        <p className="flex gap-2 font-semibold">78 Profile Views</p>
                        <p className="text-sm">People viewed your profile.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div>
                        <ChartColumnBig />
                    </div>
                    <div>
                        <p className="flex gap-2 font-semibold">78 Post impressions</p>
                        <p className="text-sm">People engaging with your posts.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div>
                        <Search />
                    </div>
                    <div>
                        <p className="flex gap-2 font-semibold">78 Search appearances</p>
                        <p className="text-sm">you appear in search results.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
