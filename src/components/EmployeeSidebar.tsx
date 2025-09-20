import React, { useState } from 'react';
import { X, User, Mail, Phone, Building, MapPin, Award, Clock, BarChart3 } from 'lucide-react';

interface EmployeeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeSidebar: React.FC<EmployeeSidebarProps> = ({ isOpen, onClose }) => {
  const [employeeProfile] = useState({
    name: 'Rajesh Kumar Singh',
    employeeId: 'EMP001',
    email: 'rajesh.singh@ranchi.gov.in',
    phone: '+91 9876543210',
    department: 'Municipal Corporation',
    designation: 'Senior Field Officer',
    workArea: 'Ranchi Central Zone',
    joiningDate: '2019-03-15',
    performanceRating: 4.2,
    issuesResolved: 156,
    avgResolutionTime: '3.8 days'
  });

  const performanceMetrics = [
    { label: 'Issues Resolved', value: employeeProfile.issuesResolved, icon: BarChart3 },
    { label: 'Avg Resolution Time', value: employeeProfile.avgResolutionTime, icon: Clock },
    { label: 'Performance Rating', value: `${employeeProfile.performanceRating}/5`, icon: Award }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Employee Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Employee Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900">{employeeProfile.name}</h3>
              <p className="text-sm text-gray-600">{employeeProfile.designation}</p>
              <p className="text-xs text-blue-600">ID: {employeeProfile.employeeId}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="text-gray-400" size={16} />
                <span className="text-sm text-gray-700">{employeeProfile.email}</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="text-gray-400" size={16} />
                <span className="text-sm text-gray-700">{employeeProfile.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Building className="text-gray-400" size={16} />
                <span className="text-sm text-gray-700">{employeeProfile.department}</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="text-gray-400" size={16} />
                <span className="text-sm text-gray-700">{employeeProfile.workArea}</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
            <div className="space-y-3">
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">{metric.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Work Schedule */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Today's Schedule</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-green-50 rounded">
                <span>Field Inspection</span>
                <span className="text-green-600">9:00 AM</span>
              </div>
              <div className="flex justify-between p-2 bg-yellow-50 rounded">
                <span>Team Meeting</span>
                <span className="text-yellow-600">2:00 PM</span>
              </div>
              <div className="flex justify-between p-2 bg-blue-50 rounded">
                <span>Report Submission</span>
                <span className="text-blue-600">4:30 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              📊 My Performance Dashboard
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              📋 Assigned Tasks ({12})
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              🗓️ Work Schedule
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              📱 Mobile Tools
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              ⚙️ Settings
            </button>
            <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeSidebar;