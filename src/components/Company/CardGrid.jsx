import { Building2, Layout, GraduationCap } from 'lucide-react';
import Card from './Card';

const CardGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <Card
        icon={Building2}
        title="Company"
        description="Small, medium, and large businesses"
      />
      <Card
        icon={Layout}
        title="Showcase page"
        description="Sub-pages associated with an existing page"
      />
      <Card
        icon={GraduationCap}
        title="Educational institution"
        description="Schools and universities"
      />
    </div>
  );
}

export default CardGrid