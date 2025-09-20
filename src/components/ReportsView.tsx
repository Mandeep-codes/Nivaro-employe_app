import React, { useState } from 'react';
import { Issue } from '../types';
import { BarChart3, TrendingUp, Calendar, Download, Filter } from 'lucide-react';

interface ReportsViewProps {
  issues: Issue[];
}

const ReportsView: React.FC<ReportsViewProps> = ({ issues }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getStatusStats = () => {
    const stats = {
      reported: issues.filter(i => i.status === 'reported').length,
      inProgress: issues.filter(i => i.status === 'in-progress').length,
      resolved: issues.filter(i => i.status === 'resolved').length
    };
    return stats;
  };

  const getCategoryStats = () => {
    const categories: { [key: string]: number } = {};
    issues.forEach(issue => {
      categories[issue.category] = (categories[issue.category] || 0) + 1;
    });
    return Object.entries(categories).sort(([,a], [,b]) => b - a);
  };

  const getPriorityStats = () => {
    const priorities = {
      critical: issues.filter(i => i.priority === 'critical').length,
      high: issues.filter(i => i.priority === 'high').length,
      medium: issues.filter(i => i.priority === 'medium').length,
      low: issues.filter(i => i.priority === 'low').length
    };
    return priorities;
  };

  const getResolutionRate = () => {
    const resolved = issues.filter(i => i.status === 'resolved').length;
    return issues.length > 0 ? Math.round((resolved / issues.length) * 100) : 0;
  };

  const statusStats = getStatusStats();
  const categoryStats = getCategoryStats();
  const priorityStats = getPriorityStats();
  const resolutionRate = getResolutionRate();

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{issues.length}</p>
              <p className="text-sm text-blue-800">Total Issues</p>
            </div>
            <BarChart3 className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{resolutionRate}%</p>
              <p className="text-sm text-green-800">Resolution Rate</p>
            </div>
            <TrendingUp className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Status Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Reported</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(statusStats.reported / issues.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 w-8">{statusStats.reported}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700">In Progress</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(statusStats.inProgress / issues.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 w-8">{statusStats.inProgress}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Resolved</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(statusStats.resolved / issues.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 w-8">{statusStats.resolved}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Analysis */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Issues by Category</h3>
        <div className="space-y-3">
          {categoryStats.map(([category, count]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-gray-700 capitalize">{category.replace('-', ' ')}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(count / issues.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 w-6">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Priority Distribution</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-lg font-bold text-red-600">{priorityStats.critical}</p>
            <p className="text-sm text-red-800">Critical</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-lg font-bold text-orange-600">{priorityStats.high}</p>
            <p className="text-sm text-orange-800">High</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-lg font-bold text-yellow-600">{priorityStats.medium}</p>
            <p className="text-sm text-yellow-800">Medium</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-lg font-bold text-green-600">{priorityStats.low}</p>
            <p className="text-sm text-green-800">Low</p>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Insights</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-green-800 font-medium">Average Resolution Time</span>
            <span className="text-green-600 font-bold">4.2 days</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-blue-800 font-medium">Citizen Satisfaction</span>
            <span className="text-blue-600 font-bold">4.1/5</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <span className="text-purple-800 font-medium">Response Time</span>
            <span className="text-purple-600 font-bold">2.8 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;