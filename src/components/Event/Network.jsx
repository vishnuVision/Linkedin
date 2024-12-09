import NetworkCard from "./NetworkCard"

function Network() {
    return (
        <div className="">
            <div className="px-4 pt-4 text-lg font-semibold">1 attendee</div>
            <div>
                <NetworkCard />
                <NetworkCard />
                <NetworkCard />
            </div>
        </div>
    )
}

export default Network
