import React from 'react';
import Card from '../components/ui/Card';
import { Sprout } from 'lucide-react';

const FarmingHelp = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-100 p-3 rounded-xl">
            <Sprout className="text-emerald-600 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Farming Help</h1>
        </div>
        <p className="text-gray-600 mb-4">
          Get expert advice on crop management, pest control, and soil health.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-500">Content coming soon...</p>
        </div>
      </Card>
    </div>
  );
};

export default FarmingHelp;
