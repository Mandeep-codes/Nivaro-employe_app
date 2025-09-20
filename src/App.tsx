import React, { useState } from 'react';
import Header from './components/Header';
import UserSidebar from './components/UserSidebar';
import IssueCard from './components/IssueCard';
import StatusSummary from './components/StatusSummary';
import CategoryGrid from './components/CategoryGrid';
import BottomNav from './components/BottomNav';
import ReportModal from './components/ReportModal';
import StatusView from './components/StatusView';
import CommunityView from './components/CommunityView';
import DashboardView from './components/DashboardView';
import { mockIssues } from './data/mockData';
import { Issue } from './types';

function App() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [activeTab, setActiveTab] = useState('home');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsReportModalOpen(true);
  };

  const handleIssueSubmit = (newIssue: Omit<Issue, 'id' | 'reportedAt'>) => {
    const issue: Issue = {
      ...newIssue,
      id: Date.now().toString(),
      reportedAt: new Date()
    };
    setIssues(prev => [issue, ...prev]);
  };

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'status':
        return <StatusView issues={issues} />;
      case 'community':
        return <CommunityView issues={issues} />;
      default:
        return (
          <div className="px-6 py-4 pb-24">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Reported issues in your locality
              </h2>
              {issues.length > 0 && (
                <IssueCard 
                  issue={issues[0]} 
                  onClick={handleIssueClick}
                />
              )}
            </div>

            <StatusSummary issues={issues} />
            <CategoryGrid onCategorySelect={handleCategorySelect} />
            
            {issues.length > 1 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Reports</h2>
                <div className="space-y-4">
                  {issues.slice(1, 3).map((issue) => (
                    <IssueCard 
                      key={issue.id} 
                      issue={issue} 
                      onClick={handleIssueClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        notificationCount={2} 
        onMenuClick={() => setIsSidebarOpen(true)} 
      />
      
      <main className="flex-1 overflow-y-auto pt-16 pb-20">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <UserSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        selectedCategory={selectedCategory}
        onSubmit={handleIssueSubmit}
      />

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedIssue.image} 
                alt={selectedIssue.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedIssue(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedIssue.title}</h2>
              <p className="text-gray-600 mb-4">{selectedIssue.description}</p>
              
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Location:</span> {selectedIssue.location}</p>
                <p><span className="font-medium">Category:</span> {selectedIssue.category}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs capitalize ${
                    selectedIssue.status === 'resolved' 
                      ? 'bg-green-100 text-green-800'
                      : selectedIssue.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedIssue.status.replace('-', ' ')}
                  </span>
                </p>
                <p><span className="font-medium">Reports:</span> {selectedIssue.reportCount}</p>
                <p><span className="font-medium">Reported by:</span> {selectedIssue.reportedBy}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;