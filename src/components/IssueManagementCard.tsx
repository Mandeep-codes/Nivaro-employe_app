import React from 'react';
import { MapPin, MessageCircle, Clock, AlertTriangle, User, Calendar } from 'lucide-react';
import { Issue } from '../types';

interface IssueManagementCardProps {
  issue: Issue;
  onClick: (issue: Issue) => void;
  onStatusUpdate: (issue: Issue) => void;
}

const IssueManagementCard: React.FC<IssueManagementCardProps> = ({ 
  issue, 
  onClick, 
  onStatusUpdate 
}) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const handleStatusChange = (newStatus: string) => {
    const updatedIssue = {
      ...issue,
      status: newStatus as Issue['status'],
      lastUpdated: new Date()
    };
    onStatusUpdate(updatedIssue);
  };

  const getUrgencyIndicator = () => {
    const hoursOld = (new Date().getTime() - issue.reportedAt.getTime()) / (1000 * 60 * 60);
    if (issue.priority === 'critical' && hoursOld > 4) return '🚨';
    if (issue.priority === 'high' && hoursOld > 24) return '⚠️';
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">{issue.title}</h3>
              {getUrgencyIndicator() && (
                <span className="text-lg">{getUrgencyIndicator()}</span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{issue.description}</p>
          </div>
          <div className={`${getPriorityColor(issue.priority)} text-white rounded-full px-2 py-1 text-xs font-medium capitalize`}>
            {issue.priority}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin size={12} />
              <span className="truncate max-w-32">{issue.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User size={12} />
              <span>{issue.reportedBy}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>{formatTimeAgo(issue.reportedAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-blue-600">
              <MessageCircle size={14} />
              <span className="text-sm font-medium">{issue.reportCount}</span>
            </div>
            {issue.estimatedResolutionTime && (
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock size={14} />
                <span className="text-sm">{issue.estimatedResolutionTime}</span>
              </div>
            )}
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(issue.status)}`}>
            {issue.status.replace('-', ' ')}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onClick(issue)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
          <select
            value={issue.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="reported">Reported</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default IssueManagementCard;