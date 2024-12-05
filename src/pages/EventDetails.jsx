import EventCard from "../components/Event/EventCard"
import DashboardLayout from "../components/layouts/DashboardLayout"

function EventDetails() {
  return (
<div className="min-h-screen">
      <div className="max-w-4xl max-h-[90vh] md:overflow-y-scroll someElement mx-auto pb-10">
        <EventCard />
      </div>
    </div>
  )
}

export default DashboardLayout()(EventDetails)
