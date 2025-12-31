import React from 'react';
import Card from '../components/ui/Card';
import { CreditCard } from 'lucide-react';

const Payments = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-3 rounded-xl">
            <CreditCard className="text-purple-600 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payments & History</h1>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-500">No recent transactions found.</p>
        </div>
      </Card>
    </div>
  );
};

export default Payments;
