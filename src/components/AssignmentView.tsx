import React from 'react';
import { Issue } from '../types';
import IssueManagementCard from './IssueManagementCard';
import { Filter, Search, MapPin, Calendar } from 'lucide-react';

interface AssignmentViewProps {
  issues: Issue[];
  onIssueClick: (issue: Issue) => void;
  filterStatus: string;
  filterPriority: string;
  onFilterChange: (type: string, value: string) => void;
}

const AssignmentView: React.FC<AssignmentViewProps> = ({ 
  issues, 
  onIssueClick, 
  filterStatus, 
  filterPriority, 
  onFilterChange 
}) => {
  const getAssignedIssues = () => {
    return issues.filter(issue => 
      issue.assignedDepartment === 'Municipal Corporation' || 
      issue.status !== 'resolved'
    );
  };

  const assignedIssues = getAssignedIssues();
  const todayIssues = assignedIssues.filter(issue => {
    const today = new Date();
    return issue.reportedAt.toDateString() === today.toDateString();
  });

  const urgentIssues = assignedIssues.filter(issue => 
    issue.priority === 'critical' || issue.priority === 'high'
  );

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 p-4 rounded-xl">
          <p className="text-2xl font-bold text-red-600">{urgentIssues.length}</p>
          <p className="text-sm text-red-800">Urgent</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-2xl font-bold text-blue-600">{todayIssues.length}</p>
          <p className="text-sm text-blue-800">Today</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-2xl font-bold text-green-600">{assignedIssues.length}</p>
          <p className="text-sm text-green-800">Total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-3 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="reported">Reported</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        
        <select
          value={filterPriority}
          onChange={(e) => onFilterChange('priority', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Priority</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Urgent Issues Section */}
      {urgentIssues.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-red-600 mb-4 flex items-center">
            🚨 Urgent Issues Requiring Immediate Attention
          </h2>
          <div className="space-y-4">
            {urgentIssues.slice(0, 3).map((issue) => (
              <IssueManagementCard 
                key={issue.id} 
                issue={issue} 
                onClick={onIssueClick}
                onStatusUpdate={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Assignments */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">All Assignments</h2>
        <div className="space-y-4">
          {assignedIssues.map((issue) => (
            <IssueManagementCard 
              key={issue.id} 
              issue={issue} 
              onClick={onIssueClick}
              onStatusUpdate={() => {}}
            />
          ))}
        </div>
      </div>

      {assignedIssues.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h3>
          <p className="text-gray-600">New assignments will appear here when they're assigned to you.</p>
        </div>
      )}
    </div>
  );
};

export default AssignmentView;