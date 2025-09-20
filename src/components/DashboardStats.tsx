import React from 'react';
import { Issue } from '../types';
import { AlertTriangle, Clock, CheckCircle, Users, TrendingUp, Calendar } from 'lucide-react';

interface DashboardStatsProps {
  issues: Issue[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ issues }) => {
  const getStatusCount = (status: string) => {
    return issues.filter(issue => issue.status === status).length;
  };

  const getPriorityCount = (priority: string) => {
    return issues.filter(issue => issue.priority === priority).length;
  };

  const getAverageResolutionTime = () => {
    const resolvedIssues = issues.filter(issue => issue.status === 'resolved');
    if (resolvedIssues.length === 0) return '0 days';
    
    // Mock calculation - in real app would calculate from actual resolution times
    return '4.2 days';
  };

  const getTodayIssues = () => {
    const today = new Date();
    return issues.filter(issue => {
      const issueDate = new Date(issue.reportedAt);
      return issueDate.toDateString() === today.toDateString();
    }).length;
  };

  const stats = [
    {
      title: 'Critical Issues',
      value: getPriorityCount('critical'),
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600',
      bgColor: 'bg-red-500'
    },
    {
      title: 'In Progress',
      value: getStatusCount('in-progress'),
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600',
      bgColor: 'bg-yellow-500'
    },
    {
      title: 'Resolved Today',
      value: getStatusCount('resolved'),
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600',
      bgColor: 'bg-green-500'
    },
    {
      title: 'New Reports',
      value: getTodayIssues(),
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'bg-blue-500'
    }
  ];

  const performanceStats = [
    {
      label: 'Resolution Rate',
      value: '68%',
      trend: '+5%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Avg Resolution Time',
      value: getAverageResolutionTime(),
      trend: '-0.8 days',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      label: 'Citizen Satisfaction',
      value: '4.2/5',
      trend: '+0.3',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`p-4 rounded-xl ${stat.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm font-medium">{stat.title}</p>
                </div>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="space-y-4">
          {performanceStats.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon size={20} className={metric.color} />
                  <span className="font-medium text-gray-900">{metric.label}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-xs ${metric.color}`}>{metric.trend}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
            📋 Bulk Update
          </button>
          <button className="p-3 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors">
            📊 Generate Report
          </button>
          <button className="p-3 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors">
            📱 Send Notifications
          </button>
          <button className="p-3 bg-orange-50 text-orange-600 rounded-lg font-medium hover:bg-orange-100 transition-colors">
            🗺️ Field Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;