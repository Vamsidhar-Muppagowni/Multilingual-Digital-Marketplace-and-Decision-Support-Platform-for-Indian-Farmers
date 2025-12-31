import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PlusCircle } from 'lucide-react';

const AddCrop = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-100 p-3 rounded-xl">
            <PlusCircle className="text-emerald-600 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">List New Crop</h1>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Potato" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input type="number" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none">
                <option>kg</option>
                <option>quintal</option>
                <option>ton</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price (₹)</label>
            <input type="number" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="0.00" />
          </div>

          <Button variant="primary" className="w-full">Submit Listing</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddCrop;
