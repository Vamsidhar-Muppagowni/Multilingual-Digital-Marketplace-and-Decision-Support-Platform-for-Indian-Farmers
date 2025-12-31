import React from 'react';
import Card from '../components/ui/Card';
import { TrendingUp } from 'lucide-react';

const PriceHelp = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-100 p-3 rounded-xl">
            <TrendingUp className="text-amber-600 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Market Price Helper</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Crop</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Market</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Min Price</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Max Price</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Onion', market: 'Hyderabad', min: 2000, max: 2500, trend: 'Up' },
                { name: 'Tomato', market: 'Guntur', min: 1500, max: 1800, trend: 'Down' },
                { name: 'Cotton', market: 'Warangal', min: 5000, max: 5500, trend: 'Stable' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{row.name}</td>
                  <td className="py-3 px-4 text-gray-600">{row.market}</td>
                  <td className="py-3 px-4 text-gray-600">₹{row.min}</td>
                  <td className="py-3 px-4 text-gray-600">₹{row.max}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${row.trend === 'Up' ? 'bg-green-100 text-green-700' :
                        row.trend === 'Down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {row.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PriceHelp;
