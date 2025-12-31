import React from 'react';
import Card from '../components/ui/Card';
import { BookOpen } from 'lucide-react';

const Schemes = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-xl">
            <BookOpen className="text-blue-600 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Government Schemes</h1>
        </div>
        <p className="text-gray-600 mb-6 font-medium">Available subsidies for your region:</p>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
              <h3 className="font-bold text-gray-800">PM Kisan Samman Nidhi</h3>
              <p className="text-sm text-gray-500 mb-2">Financial support for small farmers.</p>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">Active</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Schemes;
