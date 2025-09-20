import React from 'react';
import { Issue } from '../types';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface StatusViewProps {
  issues: Issue[];
}

const StatusView: React.FC<StatusViewProps> = ({ issues }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'in-progress':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return <AlertCircle className="text-red-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'border-l-green-500 bg-green-50';
      case 'in-progress':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-red-500 bg-red-50';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Complaint Status</h1>
      
      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className={`p-4 rounded-lg border-l-4 ${getStatusColor(issue.status)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{issue.title}</h3>
              {getStatusIcon(issue.status)}
            </div>
            
            <p className="text-gray-600 text-sm mb-2">{issue.description}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{issue.location}</span>
              <span>{formatDate(issue.reportedAt)}</span>
            </div>
            
            <div className="mt-2 flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                issue.status === 'resolved' 
                  ? 'bg-green-100 text-green-800'
                  : issue.status === 'in-progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {issue.status.replace('-', ' ')}
              </span>
              <span className="text-blue-600 text-xs font-medium">
                {issue.reportCount} reports
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusView;