import React, { useState } from 'react';
import Header from './components/Header';
import EmployeeSidebar from './components/EmployeeSidebar';
import IssueManagementCard from './components/IssueManagementCard';
import DashboardStats from './components/DashboardStats';
import BottomNav from './components/BottomNav';
import IssueDetailModal from './components/IssueDetailModal';
import AssignmentView from './components/AssignmentView';
import ReportsView from './components/ReportsView';
import FieldWorkView from './components/FieldWorkView';
import { mockIssues } from './data/mockData';
import { Issue } from './types';

function App() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const handleIssueUpdate = (updatedIssue: Issue) => {
    setIssues(prev => prev.map(issue => 
      issue.id === updatedIssue.id ? updatedIssue : issue
    ));
    setSelectedIssue(updatedIssue);
  };

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const getFilteredIssues = () => {
    return issues.filter(issue => {
      const statusMatch = filterStatus === 'all' || issue.status === filterStatus;
      const priorityMatch = filterPriority === 'all' || issue.priority === filterPriority;
      return statusMatch && priorityMatch;
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'assignments':
        return (
          <AssignmentView 
            issues={getFilteredIssues()} 
            onIssueClick={handleIssueClick}
            filterStatus={filterStatus}
            filterPriority={filterPriority}
            onFilterChange={(type, value) => {
              if (type === 'status') setFilterStatus(value);
              if (type === 'priority') setFilterPriority(value);
            }}
          />
        );
      case 'reports':
        return <ReportsView issues={issues} />;
      case 'fieldwork':
        return <FieldWorkView issues={issues} onIssueUpdate={handleIssueUpdate} />;
      default:
        return (
          <div className="px-6 py-4 pb-24">
            <DashboardStats issues={issues} />
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent High Priority Issues
                </h2>
                <div className="flex space-x-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1"
                  >
                    <option value="all">All Status</option>
                    <option value="reported">Reported</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1"
                  >
                    <option value="all">All Priority</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {getFilteredIssues()
                  .sort((a, b) => {
                    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                  })
                  .slice(0, 5)
                  .map((issue) => (
                    <IssueManagementCard 
                      key={issue.id} 
                      issue={issue} 
                      onClick={handleIssueClick}
                      onStatusUpdate={handleIssueUpdate}
                    />
                  ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        notificationCount={issues.filter(i => i.status === 'reported').length} 
        onMenuClick={() => setIsSidebarOpen(true)} 
      />
      
      <main className="flex-1 overflow-y-auto pt-16 pb-20">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <EmployeeSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onUpdate={handleIssueUpdate}
        />
      )}
    </div>
  );
}

export default App;