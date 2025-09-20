import React, { useState, useRef } from 'react';
import { X, Camera, MapPin, Send } from 'lucide-react';
import { categories, jharkhandLocations } from '../data/mockData';
import { Issue } from '../types';
import VoiceRecorder from './VoiceRecorder';
import LocationDetector from './LocationDetector';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSubmit: (issue: Omit<Issue, 'id' | 'reportedAt'>) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, selectedCategory, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const category = categories.find(cat => cat.id === selectedCategory);

  const generateComplaintId = (categoryId: string, pincode: string) => {
    const categoryMap: { [key: string]: string } = {
      'roads': 'RI',
      'water': 'WS',
      'garbage': 'GW',
      'drainage': 'DS',
      'electricity': 'EL',
      'nuisance': 'PN'
    };
    
    const categoryCode = categoryMap[categoryId] || 'GN';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const extractedPincode = pincode.replace(/\D/g, '').slice(0, 6) || '834001';
    
    return `${extractedPincode}${categoryCode}${randomNum}`;
  };
  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationDetected = (detectedLocation: string, coords: { lat: number; lng: number }) => {
    setLocation(detectedLocation);
    setCoordinates(coords);
  };

  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
  };

  const handleRecordingDelete = () => {
    setAudioBlob(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !location) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const pincode = location.match(/\d{6}/)?.[0] || '834001';
      const complaintId = generateComplaintId(selectedCategory, pincode);
      
      const newIssue: Omit<Issue, 'id' | 'reportedAt'> = {
        title: complaintId,
        description,
        category: selectedCategory,
        status: 'reported' as const,
        priority,
        location,
        coordinates: coordinates || { lat: 23.3441, lng: 85.3096 }, // Default to Ranchi
        image: image || 'https://images.pexels.com/photos/15199839/pexels-photo-15199839.jpeg',
        audioNote: audioBlob ? URL.createObjectURL(audioBlob) : undefined,
        reportCount: 1,
        upvotes: 0,
        reportedBy: 'Current User',
        estimatedResolutionTime: category?.averageResolutionTime || '3-7 days',
        assignedDepartment: 'Municipal Corporation',
        lastUpdated: new Date()
      };
      
      onSubmit(newIssue);
      setIsSubmitting(false);
      
      // Reset form
      setDescription('');
      setLocation('');
      setCoordinates(null);
      setImage(null);
      setAudioBlob(null);
      setPriority('medium');
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Report Issue</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {category && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {category.icon}
              </div>
              <span className="font-medium text-gray-900">{category.name}</span>
            </div>
          )}


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Detailed description of the issue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level *
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="low">Low - Minor inconvenience</option>
              <option value="medium">Medium - Moderate impact</option>
              <option value="high">High - Significant impact</option>
              <option value="critical">Critical - Urgent attention needed</option>
            </select>
          </div>

          <LocationDetector 
            onLocationDetected={handleLocationDetected}
            selectedLocation={location}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select location</option>
              {jharkhandLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo (Optional)
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors flex flex-col items-center space-y-2"
            >
              {image ? (
                <img src={image} alt="Captured" className="w-full h-32 object-cover rounded" />
              ) : (
                <>
                  <Camera size={32} className="text-gray-400" />
                  <span className="text-gray-500">Take a photo or upload image</span>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageCapture}
              className="hidden"
            />
          </div>

          <VoiceRecorder
            onRecordingComplete={handleRecordingComplete}
            onRecordingDelete={handleRecordingDelete}
            hasRecording={!!audioBlob}
          />

          <button
            type="submit"
            disabled={isSubmitting || !description || !location}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Submit Report</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;