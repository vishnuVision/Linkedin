import { ArrowUpRight } from 'lucide-react';
import PropTypes from 'prop-types';

function AnalyticCard({ title, value, label, trend }) {
    return (
        <div className='rounded-xl border bg-gray-50 bg-card text-card-foreground shadow'>
            <div className="p-4">
                <h3 className="text-sm text-gray-600">{title}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">{value}</span>
                    {trend && (
                        <span className="flex items-center text-sm text-green-600">
                            <ArrowUpRight className="h-4 w-4" />
                            {trend}%
                        </span>
                    )}
                </div>
                <p className="mt-1 text-sm text-gray-500">{label}</p>
            </div>
        </div>
    );
}

export function Analytics() {
    return (
        <div className="space-y-6 rounded-xl border bg-gray-50 bg-card text-card-foreground shadow p-4">
            <div>
                <h2 className="text-xl font-semibold">Track performance</h2>
                <p className="text-sm text-gray-600 mt-1">
                    Grow your page 3x faster by leveraging insights and analytics
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AnalyticCard
                    title="Search appearance"
                    value="0"
                    label="Last 7 days"
                />
                <AnalyticCard
                    title="New followers"
                    value="0"
                    label="Last 7 days"
                    trend={0}
                />
                <AnalyticCard
                    title="Post impressions"
                    value="0"
                    label="Last 7 days"
                    trend={0}
                />
                <AnalyticCard
                    title="Page visitors"
                    value="0"
                    label="Last 7 days"
                    trend={0}
                />
            </div>
        </div>
    );
}

AnalyticCard.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
    label: PropTypes.string,
    trend: PropTypes.number
}