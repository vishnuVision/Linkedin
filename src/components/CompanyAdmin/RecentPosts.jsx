function RecentPosts() {
    return (
        <div className='rounded-xl bg-gray-50 border bg-card text-card-foreground shadow'>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Manage recent posts</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Manage your page&apos;s content and amplify your reach with boosting.{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                Learn more
                            </a>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&q=80"
                        alt="No posts"
                        className="mx-auto w-64 h-48 object-cover rounded-lg"
                    />
                    <h3 className="mt-4 text-lg font-semibold">
                        Your page doesn&apos;t have any posts from the last 90 days
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                        Pages that post 2x a week grow 5x faster
                    </p>
                    <button className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Start a post</button>
                </div>
            </div>
        </div>
    );
}

export default RecentPosts;