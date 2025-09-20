import React, { useState } from 'react';
import { Issue } from '../types';
import { MapPin, Navigation, Camera, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface FieldWorkViewProps {
  issues: Issue[];
  onIssueUpdate: (issue: Issue) => void;
}

const FieldWorkView: React.FC<FieldWorkViewProps> = ({ issues, onIssueUpdate }) => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const getFieldIssues = () => {
    return issues.filter(issue => 
      issue.status === 'reported' || issue.status === 'in-progress'
    ).sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const calculateDistance = (issue: Issue) => {
    if (!currentLocation) return 'Unknown';
    
    // Simple distance calculation (in real app, use proper geolocation)
    const distance = Math.sqrt(
      Math.pow(issue.coordinates.lat - currentLocation.lat, 2) + 
      Math.pow(issue.coordinates.lng - currentLocation.lng, 2)
    ) * 111; // Rough conversion to km
    
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleStatusUpdate = (issue: Issue, newStatus: Issue['status']) => {
    const updatedIssue = {
      ...issue,
      status: newStatus,
      lastUpdated: new Date()
    };
    onIssueUpdate(updatedIssue);
  };

  const fieldIssues = getFieldIssues();

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Field Work</h1>
        <button
          onClick={getCurrentLocation}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Navigation size={16} />
          <span>Update Location</span>
        </button>
      </div>

      {/* Current Location Status */}
      {currentLocation && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-green-600" />
            <span className="text-green-800 font-medium">
              Location updated: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </span>
          </div>
        </div>
      )}

      {/* Field Issues List */}
      <div className="space-y-4">
        {fieldIssues.map((issue) => (
          <div key={issue.id} className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    issue.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{issue.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin size={12} />
                    <span>{issue.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Navigation size={12} />
                    <span>{calculateDistance(issue)}</span>
                  </div>
                </div>
              </div>
              {issue.image && (
                <img 
                  src={issue.image} 
                  alt={issue.title}
                  className="w-16 h-16 object-cover rounded-lg ml-3"
                />
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.open(`https://maps.google.com/?q=${issue.coordinates.lat},${issue.coordinates.lng}`, '_blank')}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
              >
                <MapPin size={14} />
                <span>Navigate</span>
              </button>
              
              {issue.status === 'reported' && (
                <button
                  onClick={() => handleStatusUpdate(issue, 'in-progress')}
                  className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Clock size={14} />
                  <span>Start Work</span>
                </button>
              )}
              
              {issue.status === 'in-progress' && (
                <button
                  onClick={() => handleStatusUpdate(issue, 'resolved')}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <CheckCircle size={14} />
                  <span>Complete</span>
                </button>
              )}
              
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-1">
                <Camera size={14} />
                <span>Photo</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {fieldIssues.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No field work assigned</h3>
          <p className="text-gray-600">Field assignments will appear here when they're ready for inspection.</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="fixed bottom-24 left-6 right-6 bg-white rounded-xl shadow-lg p-4 border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-red-600">
              {fieldIssues.filter(i => i.priority === 'critical').length}
            </p>
            <p className="text-xs text-gray-600">Critical</p>
          </div>
          <div>
            <p className="text-lg font-bold text-yellow-600">
              {fieldIssues.filter(i => i.status === 'in-progress').length}
            </p>
            <p className="text-xs text-gray-600">In Progress</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-600">{fieldIssues.length}</p>
            <p className="text-xs text-gray-600">Total</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldWorkView;