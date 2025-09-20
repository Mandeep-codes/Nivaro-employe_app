import React from 'react';
import { Issue } from '../types';

interface StatusSummaryProps {
  issues: Issue[];
}

const StatusSummary: React.FC<StatusSummaryProps> = ({ issues }) => {
  const getStatusCount = (status: string) => {
    return issues.filter(issue => issue.status === status).length;
  };

  const statusItems = [
    {
      count: getStatusCount('reported'),
      label: 'Reported',
      color: 'bg-red-100 text-red-800',
      bgColor: 'bg-red-500'
    },
    {
      count: getStatusCount('in-progress'),
      label: 'In progress',
      color: 'bg-yellow-100 text-yellow-800',
      bgColor: 'bg-yellow-500'
    },
    {
      count: getStatusCount('resolved'),
      label: 'Resolved',
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-500'
    }
  ];

  return (
    <div className="flex space-x-4 mb-6">
      {statusItems.map((item, index) => (
        <div 
          key={index}
          className={`flex-1 rounded-xl p-4 ${item.color} transition-all hover:scale-105`}
        >
          <div className="text-2xl font-bold mb-1">
            {String(item.count).padStart(2, '0')}
          </div>
          <div className="text-sm font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatusSummary;