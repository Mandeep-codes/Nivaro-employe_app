import React, { useState } from 'react';
import { X, MapPin, Calendar, User, MessageCircle, Clock, Camera, FileText, Send } from 'lucide-react';
import { Issue } from '../types';

interface IssueDetailModalProps {
  issue: Issue;
  onClose: () => void;
  onUpdate: (issue: Issue) => void;
}

const IssueDetailModal: React.FC<IssueDetailModalProps> = ({ issue, onClose, onUpdate }) => {
  const [status, setStatus] = useState(issue.status);
  const [notes, setNotes] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(issue.estimatedResolutionTime || '');
  const [assignedTeam, setAssignedTeam] = useState(issue.assignedDepartment || '');

  const handleUpdate = () => {
    const updatedIssue: Issue = {
      ...issue,
      status: status as Issue['status'],
      estimatedResolutionTime: estimatedTime,
      assignedDepartment: assignedTeam,
      lastUpdated: new Date()
    };
    onUpdate(updatedIssue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Issue Management</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Issue Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{issue.title}</h3>
              <div className="flex items-center space-x-3 mb-3">
                <span className={`${getPriorityColor(issue.priority)} text-white px-2 py-1 rounded-full text-xs font-medium capitalize`}>
                  {issue.priority} Priority
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(issue.status)}`}>
                  {issue.status.replace('-', ' ')}
                </span>
              </div>
            </div>
            {issue.image && (
              <img 
                src={issue.image} 
                alt={issue.title}
                className="w-24 h-24 object-cover rounded-lg ml-4"
              />
            )}
          </div>

          {/* Issue Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-gray-400" />
              <span>{issue.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User size={16} className="text-gray-400" />
              <span>Reported by: {issue.reportedBy}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-400" />
              <span>Reported: {issue.reportedAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle size={16} className="text-gray-400" />
              <span>{issue.reportCount} citizen reports</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{issue.description}</p>
          </div>

          {/* Management Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Update
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="reported">Reported</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Resolution
              </label>
              <input
                type="text"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="e.g., 3-5 days"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Team/Department
              </label>
              <select
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                <option value="Municipal Corporation">Municipal Corporation</option>
                <option value="Public Works Department">Public Works Department</option>
                <option value="Water Supply Department">Water Supply Department</option>
                <option value="Jharkhand State Electricity Board">Electricity Board</option>
              </select>
            </div>
          </div>

          {/* Progress Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Progress Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add notes about progress, actions taken, or next steps..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Send size={16} />
              <span>Update Issue</span>
            </button>
            <button className="px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Camera size={16} />
              <span>Add Photo</span>
            </button>
            <button className="px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <FileText size={16} />
              <span>Report</span>
            </button>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Activity Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Issue reported by citizen</p>
                  <p className="text-xs text-gray-500">{issue.reportedAt.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Assigned to {issue.assignedDepartment}</p>
                  <p className="text-xs text-gray-500">{issue.lastUpdated.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailModal;