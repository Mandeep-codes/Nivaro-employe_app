import React from 'react';
import { Issue } from '../types';
import { MessageCircle, ThumbsUp, Share, Star } from 'lucide-react';

interface CommunityViewProps {
  issues: Issue[];
}

const CommunityView: React.FC<CommunityViewProps> = ({ issues }) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const generateUserRating = (userId: string) => {
    // Generate consistent rating based on user name hash
    const hash = userId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash % 5) + 1; // 1-5 stars
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Community Feed</h1>
      
      <div className="space-y-6">
        {issues.map((issue) => (
          <div key={issue.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {issue.reportedBy.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{issue.reportedBy}</p>
                    {renderStars(generateUserRating(issue.reportedBy))}
                  </div>
                  <p className="text-xs text-gray-500">{formatTimeAgo(issue.reportedAt)}</p>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{issue.description}</p>
              <p className="text-xs text-blue-600 mb-3">{issue.location}</p>
            </div>
            
            {issue.image && (
              <img 
                src={issue.image} 
                alt={issue.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <ThumbsUp size={16} />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <MessageCircle size={16} />
                    <span className="text-sm">{issue.reportCount}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <Share size={16} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  issue.status === 'resolved' 
                    ? 'bg-green-100 text-green-800'
                    : issue.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {issue.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityView;