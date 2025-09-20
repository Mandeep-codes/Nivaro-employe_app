import React from 'react';
import { MapPin, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Issue, PriorityArea } from '../types';
import { priorityAreas } from '../data/mockData';

interface PriorityMapProps {
  issues: Issue[];
}

const PriorityMap: React.FC<PriorityMapProps> = ({ issues }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle size={16} className="text-white" />;
      case 'high': return <Clock size={16} className="text-white" />;
      case 'medium': return <MapPin size={16} className="text-white" />;
      default: return <CheckCircle size={16} className="text-white" />;
    }
  };

  const getIssuesByPriority = (priority: string) => {
    return issues.filter(issue => issue.priority === priority).length;
  };

  const priorityStats = [
    { level: 'critical', count: getIssuesByPriority('critical'), label: 'Critical' },
    { level: 'high', count: getIssuesByPriority('high'), label: 'High' },
    { level: 'medium', count: getIssuesByPriority('medium'), label: 'Medium' },
    { level: 'low', count: getIssuesByPriority('low'), label: 'Low' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Local Area Dashboard</h2>
      
      {/* Priority Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {priorityStats.map((stat) => (
          <div
            key={stat.level}
            className={`p-4 rounded-lg ${getPriorityColor(stat.level)} text-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stat.count}</p>
                <p className="text-sm opacity-90">{stat.label} Issues</p>
              </div>
              {getPriorityIcon(stat.level)}
            </div>
          </div>
        ))}
      </div>

      {/* Priority Areas List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">High Priority Areas</h3>
        {priorityAreas.map((area) => (
          <div
            key={area.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(area.priorityLevel)}`} />
              <div>
                <p className="font-medium text-gray-900">{area.name}</p>
                <p className="text-sm text-gray-600">{area.issueCount} active issues</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
              area.priorityLevel === 'critical' 
                ? 'bg-red-100 text-red-800'
                : area.priorityLevel === 'high'
                ? 'bg-orange-100 text-orange-800'
                : area.priorityLevel === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {area.priorityLevel}
            </span>
          </div>
        ))}
      </div>

      {/* Live Updates Indicator */}
      <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>Live updates every 30 seconds</span>
      </div>
    </div>
  );
};

export default PriorityMap;