import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelection = () => {
  const { switchLanguage } = useLanguage();

  return (
    <div className="p-4 border rounded shadow-sm inline-block">
      <h3 className="font-semibold mb-2">Select Language</h3>
      <div className="flex gap-2">
        <button onClick={() => switchLanguage('en')} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">English</button>
        <button onClick={() => switchLanguage('te')} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Telugu</button>
      </div>
    </div>
  );
};

export default LanguageSelection;
