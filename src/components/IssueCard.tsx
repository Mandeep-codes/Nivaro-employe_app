import React from 'react';
import { MapPin, MessageCircle, ThumbsUp, AlertTriangle, Clock } from 'lucide-react';
import { Issue } from '../types';

interface IssueCardProps {
  issue: Issue;
  onClick: (issue: Issue) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle size={12} />;
      case 'high': return <Clock size={12} />;
      default: return null;
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all hover:scale-[1.02] hover:shadow-lg"
      onClick={() => onClick(issue)}
    >
      <div className="relative">
        <img 
          src={issue.image} 
          alt={issue.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full px-3 py-1 flex items-center space-x-1 text-sm font-medium">
          <MessageCircle size={16} />
          <span>{issue.reportCount}</span>
        </div>
        <div className={`absolute top-2 left-2 ${getPriorityColor(issue.priority)} text-white rounded-full px-2 py-1 flex items-center space-x-1 text-xs font-medium`}>
          {getPriorityIcon(issue.priority)}
          <span className="capitalize">{issue.priority}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{issue.description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-gray-500 text-xs">
            <MapPin size={12} className="mr-1" />
            <span className="truncate">{issue.location}</span>
          </div>
          <span className="text-gray-400 text-xs">{formatTimeAgo(issue.reportedAt)}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <ThumbsUp size={12} />
              <span>{issue.upvotes}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs capitalize ${
              issue.status === 'resolved' 
                ? 'bg-green-100 text-green-800'
                : issue.status === 'in-progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {issue.status.replace('-', ' ')}
            </span>
          </div>
          {issue.estimatedResolutionTime && (
            <span className="text-xs text-blue-600">{issue.estimatedResolutionTime}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueCard;