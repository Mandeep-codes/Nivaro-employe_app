import { Issue, Category, Department, PriorityArea } from '../types';

export const categories: Category[] = [
  {
    id: 'roads',
    name: 'Roads & Infrastructure',
    icon: '🚧',
    color: '#F97316',
    description: 'Potholes, broken roads, traffic signals',
    averageResolutionTime: '7-14 days'
  },
  {
    id: 'water',
    name: 'Water Supply',
    icon: '🚰',
    color: '#3B82F6',
    description: 'Water shortage, pipe leakage, quality issues',
    averageResolutionTime: '3-7 days'
  },
  {
    id: 'garbage',
    name: 'Garbage & Waste',
    icon: '🗑️',
    color: '#10B981',
    description: 'Waste collection, illegal dumping, cleanliness',
    averageResolutionTime: '1-3 days'
  },
  {
    id: 'drainage',
    name: 'Drainage & Sewage',
    icon: '🌊',
    color: '#06B6D4',
    description: 'Blocked drains, sewage overflow, waterlogging',
    averageResolutionTime: '5-10 days'
  },
  {
    id: 'electricity',
    name: 'Electricity & Streetlights',
    icon: '💡',
    color: '#F59E0B',
    description: 'Power outages, street light issues, electrical hazards',
    averageResolutionTime: '2-5 days'
  },
  {
    id: 'nuisance',
    name: 'Public Nuisance',
    icon: '👥',
    color: '#8B5CF6',
    description: 'Noise pollution, encroachment, antisocial activities',
    averageResolutionTime: '1-7 days'
  }
];

export const departments: Department[] = [
  {
    id: 'pwd',
    name: 'Public Works Department',
    contact: '+91-651-2490123',
    responseTime: '24-48 hours',
    activeIssues: 45
  },
  {
    id: 'water',
    name: 'Water Supply Department',
    contact: '+91-651-2490456',
    responseTime: '12-24 hours',
    activeIssues: 23
  },
  {
    id: 'municipal',
    name: 'Municipal Corporation',
    contact: '+91-651-2490789',
    responseTime: '6-12 hours',
    activeIssues: 67
  },
  {
    id: 'electricity',
    name: 'Jharkhand State Electricity Board',
    contact: '+91-651-2491012',
    responseTime: '4-8 hours',
    activeIssues: 34
  }
];

export const priorityAreas: PriorityArea[] = [
  {
    id: 'ranchi-main-road',
    name: 'Main Road, Ranchi',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    issueCount: 15,
    priorityLevel: 'critical',
    radius: 500
  },
  {
    id: 'jamshedpur-market',
    name: 'Kadma Market Area',
    coordinates: { lat: 22.8046, lng: 86.2029 },
    issueCount: 12,
    priorityLevel: 'high',
    radius: 300
  },
  {
    id: 'dhanbad-station',
    name: 'Station Road, Dhanbad',
    coordinates: { lat: 23.7957, lng: 86.4304 },
    issueCount: 8,
    priorityLevel: 'medium',
    radius: 400
  }
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: '822001GW7234',
    description: 'Large accumulation of garbage has been blocking the main entrance to Kadma Market for over a week. The smell is unbearable and attracting stray animals. Local vendors are losing business due to this issue.',
    category: 'garbage',
    status: 'reported',
    priority: 'high',
    location: 'Kadma Market, Jamshedpur, Jharkhand',
    coordinates: { lat: 22.8046, lng: 86.2029 },
    image: 'https://images.pexels.com/photos/15199839/pexels-photo-15199839.jpeg?auto=compress&cs=tinysrgb&w=800',
    reportCount: 23,
    upvotes: 45,
    reportedAt: new Date('2024-01-15T10:30:00'),
    reportedBy: 'Rahul Kumar Singh',
    estimatedResolutionTime: '2-3 days',
    assignedDepartment: 'Municipal Corporation',
    lastUpdated: new Date('2024-01-15T14:20:00')
  },
  {
    id: '2',
    title: '826001RI4567',
    description: 'A deep pothole near Dhanbad Railway Station is causing serious traffic issues. Multiple vehicles have been damaged, and there was a minor accident yesterday. Immediate repair needed.',
    category: 'roads',
    status: 'in-progress',
    priority: 'critical',
    location: 'Station Road, Dhanbad, Jharkhand',
    coordinates: { lat: 23.7957, lng: 86.4304 },
    image: 'https://images.pexels.com/photos/16736747/pexels-photo-16736747.jpeg?auto=compress&cs=tinysrgb&w=800',
    reportCount: 18,
    upvotes: 67,
    reportedAt: new Date('2024-01-14T15:20:00'),
    reportedBy: 'Priya Singh Munda',
    estimatedResolutionTime: '5-7 days',
    assignedDepartment: 'Public Works Department',
    lastUpdated: new Date('2024-01-16T09:15:00')
  },
  {
    id: '3',
    title: '834001WS8901',
    description: 'Entire Shastri Nagar colony has been without water supply for 4 days. Residents are facing severe hardship, especially elderly and children. Water tankers are urgently needed.',
    category: 'water',
    status: 'resolved',
    priority: 'critical',
    location: 'Shastri Nagar, Ranchi, Jharkhand',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    image: 'https://images.pexels.com/photos/2339722/pexels-photo-2339722.jpeg?auto=compress&cs=tinysrgb&w=800',
    reportCount: 34,
    upvotes: 89,
    reportedAt: new Date('2024-01-12T09:15:00'),
    reportedBy: 'Amit Kumar Jha',
    estimatedResolutionTime: 'Resolved',
    assignedDepartment: 'Water Supply Department',
    lastUpdated: new Date('2024-01-16T16:30:00')
  },
  {
    id: '4',
    title: '831001DS2345',
    description: 'Sewage system has overflowed on Circular Road, creating unhygienic conditions. The area smells terrible and poses serious health risks to nearby residents and shopkeepers.',
    category: 'drainage',
    status: 'reported',
    priority: 'high',
    location: 'Circular Road, Jamshedpur, Jharkhand',
    coordinates: { lat: 22.8046, lng: 86.2029 },
    image: 'https://images.pexels.com/photos/9886737/pexels-photo-9886737.jpeg?auto=compress&cs=tinysrgb&w=800',
    reportCount: 16,
    upvotes: 32,
    reportedAt: new Date('2024-01-13T18:45:00'),
    reportedBy: 'Sunita Devi Mahato',
    estimatedResolutionTime: '7-10 days',
    assignedDepartment: 'Municipal Corporation',
    lastUpdated: new Date('2024-01-14T11:20:00')
  },
  {
    id: '5',
    title: '834001EL6789',
    description: 'All street lights on HB Road have been non-functional for two weeks. This is causing safety concerns, especially for women and elderly people walking at night.',
    category: 'electricity',
    status: 'in-progress',
    priority: 'medium',
    location: 'HB Road, Ranchi, Jharkhand',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    image: 'https://images.pexels.com/photos/3356526/pexels-photo-3356526.jpeg?auto=compress&cs=tinysrgb&w=800',
    reportCount: 11,
    upvotes: 28,
    reportedAt: new Date('2024-01-11T20:30:00'),
    reportedBy: 'Deepak Kumar Sahu',
    estimatedResolutionTime: '3-5 days',
    assignedDepartment: 'Jharkhand State Electricity Board',
    lastUpdated: new Date('2024-01-15T13:45:00')
  },
  {
    id: '6',
    title: '834001PN3456',
    description: 'Someone has constructed an illegal structure that completely blocks the public footpath near Kokar. Pedestrians are forced to walk on the busy road, creating safety hazards.',
    category: 'nuisance',
    status: 'reported',
    priority: 'medium',
    location: 'Kokar, Ranchi, Jharkhand',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    image: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=800',
    reportCount: 7,
    upvotes: 19,
    reportedAt: new Date('2024-01-16T12:15:00'),
    reportedBy: 'Ravi Shankar Tiwari',
    estimatedResolutionTime: '10-15 days',
    assignedDepartment: 'Municipal Corporation',
    lastUpdated: new Date('2024-01-16T12:15:00')
  },
  {
    id: '7',
    title: '834001WS7890',
    description: 'A major water pipe has burst in Doranda area, causing flooding in nearby houses. Water is being wasted continuously and residents basement are getting flooded.',
    category: 'water',
    status: 'in-progress',
    priority: 'high',
    location: 'Doranda, Ranchi, Jharkhand',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    reportCount: 14,
    upvotes: 41,
    reportedAt: new Date('2024-01-15T07:20:00'),
    reportedBy: 'Meera Kumari Das',
    estimatedResolutionTime: '1-2 days',
    assignedDepartment: 'Water Supply Department',
    lastUpdated: new Date('2024-01-16T08:30:00')
  },
  {
    id: '8',
    title: '834001RI1234',
    description: 'The traffic signal at Albert Ekka Chowk has been malfunctioning for 3 days. This is one of the busiest intersections in Ranchi and causing major traffic jams.',
    category: 'roads',
    status: 'reported',
    priority: 'critical',
    location: 'Albert Ekka Chowk, Ranchi, Jharkhand',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=800',
    reportCount: 29,
    upvotes: 73,
    reportedAt: new Date('2024-01-14T08:45:00'),
    reportedBy: 'Santosh Kumar Oraon',
    estimatedResolutionTime: '2-3 days',
    assignedDepartment: 'Public Works Department',
    lastUpdated: new Date('2024-01-15T16:20:00')
  }
];

export const jharkhandLocations = [
  'Ranchi, Jharkhand',
  'Jamshedpur, Jharkhand', 
  'Dhanbad, Jharkhand',
  'Bokaro Steel City, Jharkhand',
  'Deoghar, Jharkhand',
  'Hazaribagh, Jharkhand',
  'Giridih, Jharkhand',
  'Ramgarh, Jharkhand',
  'Chaibasa, Jharkhand',
  'Daltonganj, Jharkhand',
  'Phusro, Jharkhand',
  'Adityapur, Jharkhand',
  'Chirkunda, Jharkhand',
  'Medininagar, Jharkhand',
  'Chatra, Jharkhand'
];

// Real coordinates for major Jharkhand cities
export const jharkhandCoordinates: { [key: string]: { lat: number; lng: number } } = {
  'Ranchi, Jharkhand': { lat: 23.3441, lng: 85.3096 },
  'Jamshedpur, Jharkhand': { lat: 22.8046, lng: 86.2029 },
  'Dhanbad, Jharkhand': { lat: 23.7957, lng: 86.4304 },
  'Bokaro Steel City, Jharkhand': { lat: 23.6693, lng: 86.1511 },
  'Deoghar, Jharkhand': { lat: 24.4823, lng: 86.6961 },
  'Hazaribagh, Jharkhand': { lat: 23.9981, lng: 85.3615 },
  'Giridih, Jharkhand': { lat: 24.1901, lng: 86.3008 },
  'Ramgarh, Jharkhand': { lat: 23.6309, lng: 85.5155 },
  'Chaibasa, Jharkhand': { lat: 22.5541, lng: 85.8066 },
  'Daltonganj, Jharkhand': { lat: 24.0367, lng: 84.0651 }
};