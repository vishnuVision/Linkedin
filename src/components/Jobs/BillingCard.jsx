import { MessageSquare, HelpCircle } from 'lucide-react';

export function BillingCard() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <button className="w-full bg-[#0a66c2] text-white rounded-full py-2 font-medium hover:bg-[#004182]">
          Post a free job
        </button>
        <p className="text-sm text-gray-600 mt-4">
          Save up to 35% by purchasing LinkedIn job posting credits in advance.
          <button className="text-[#0a66c2] hover:underline ml-1">
            Get discount
          </button>
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Billing information</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
          <button className="text-[#0a66c2] text-sm hover:underline">Payment method</button>
          <button className="text-[#0a66c2] text-sm hover:underline">Purchase history</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="h-6 w-6 text-gray-600" />
          <div>
            <h3 className="font-semibold">Chat with support</h3>
            <p className="text-sm text-gray-600">Online now</p>
          </div>
        </div>
        <button className="w-full border border-[#0a66c2] text-[#0a66c2] rounded-full py-1.5 font-medium hover:bg-[#eef3f8]">
          Start chat
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Help Center</h3>
      </div>
    </div>
  );
}