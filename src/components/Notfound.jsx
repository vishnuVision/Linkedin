function Notfound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-200">404</h1>
                <div className="mt-4">
                    <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
                    <p className="mt-2 text-gray-600">Sorry, we could not find the page you are looking for.</p>
                </div>
                <div className="mt-8">
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Notfound
