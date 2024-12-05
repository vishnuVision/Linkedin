function JobSidebar() {
  const items = [
    { label: 'My items', count: null },
    { label: 'Posted jobs', count: 1 },
    { label: 'My jobs', count: 18 },
    { label: 'My learning', count: 1 },
    { label: 'Saved posts and articles', count: 1 },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        {items.map((item, index) => (
          <div 
            key={item.label}
            className={`flex justify-between items-center py-2 ${
              index === 1 ? 'text-[#0a66c2] font-semibold' : 'text-gray-600'
            }`}
          >
            <span>{item.label}</span>
            {item.count && <span>{item.count}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobSidebar