export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'reported' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image?: string;
  audioNote?: string;
  reportCount: number;
  reportedAt: Date;
  reportedBy: string;
  upvotes: number;
  estimatedResolutionTime?: string;
  assignedDepartment?: string;
  lastUpdated: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  averageResolutionTime: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  reportsSubmitted: number;
  credibilityScore: number;
}

export interface Department {
  id: string;
  name: string;
  contact: string;
  responseTime: string;
  activeIssues: number;
}

export interface PriorityArea {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  issueCount: number;
  priorityLevel: 'low' | 'medium' | 'high' | 'critical';
  radius: number;
}