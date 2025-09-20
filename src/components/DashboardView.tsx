import React from 'react';
import { Issue, Department } from '../types';
import { departments } from '../data/mockData';
import PriorityMap from './PriorityMap';
import { BarChart3, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface DashboardViewProps {
  issues: Issue[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ issues }) => {
  const getStatusCount = (status: string) => {
    return issues.filter(issue => issue.status === status).length;
  };

  const getCategoryStats = () => {
    const stats: { [key: string]: number } = {};
    issues.forEach(issue => {
      stats[issue.category] = (stats[issue.category] || 0) + 1;
    });
    return Object.entries(stats).sort(([,a], [,b]) => b - a);
  };

  const getRecentActivity = () => {
    return issues
      .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
      .slice(0, 5);
  };

  const totalIssues = issues.length;
  const resolvedIssues = getStatusCount('resolved');
  const resolutionRate = 56; // Fixed at 56% as requested

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resolution Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">100</p>
              <p className="text-sm text-blue-800">Total Reports</p>
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
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">23</p>
              <p className="text-sm text-yellow-800">In Progress</p>
            </div>
            <Clock className="text-yellow-600" size={24} />
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-red-600">21</p>
              <p className="text-sm text-red-800">Pending</p>
            </div>
            <AlertTriangle className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Priority Map Component */}
      <PriorityMap issues={issues} />

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Issues by Category</h3>
        <div className="space-y-3">
          {getCategoryStats().map(([category, count]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-gray-700 capitalize">{category.replace('-', ' ')}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(count / totalIssues) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Department Response</h3>
        <div className="space-y-4">
          {departments.map((dept) => (
            <div key={dept.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{dept.name}</h4>
                <span className="text-sm text-gray-600">{dept.activeIssues} active</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Response Time: {dept.responseTime}</p>
                <p>Contact: {dept.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {getRecentActivity().map((issue) => (
            <div key={issue.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                issue.status === 'resolved' ? 'bg-green-500' :
                issue.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{issue.title}</p>
                <p className="text-sm text-gray-600">{issue.location}</p>
                <p className="text-xs text-gray-500">
                  Updated {issue.lastUpdated.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;