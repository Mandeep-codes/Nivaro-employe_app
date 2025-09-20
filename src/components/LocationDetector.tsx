import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, RefreshCw } from 'lucide-react';
import { jharkhandCoordinates } from '../data/mockData';

interface LocationDetectorProps {
  onLocationDetected: (location: string, coordinates: { lat: number; lng: number }) => void;
  selectedLocation: string;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ 
  onLocationDetected, 
  selectedLocation 
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<string>('');
  const [error, setError] = useState<string>('');

  const detectLocation = async () => {
    setIsDetecting(true);
    setError('');

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Find closest Jharkhand location (simplified logic)
      let closestLocation = 'Ranchi, Jharkhand';
      let minDistance = Infinity;

      Object.entries(jharkhandCoordinates).forEach(([location, coords]) => {
        const distance = Math.sqrt(
          Math.pow(latitude - coords.lat, 2) + Math.pow(longitude - coords.lng, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestLocation = location;
        }
      });

      setDetectedLocation(closestLocation);
      onLocationDetected(closestLocation, { lat: latitude, lng: longitude });
    } catch (error) {
      console.error('Error detecting location:', error);
      setError('Unable to detect location. Please select manually.');
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Location Detection
        </label>
        <button
          type="button"
          onClick={detectLocation}
          disabled={isDetecting}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
        >
          {isDetecting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <RefreshCw size={14} />
          )}
          <span>{isDetecting ? 'Detecting...' : 'Auto-detect'}</span>
        </button>
      </div>

      {detectedLocation && (
        <div className="flex items-center space-x-2 p-2 bg-green-50 border border-green-200 rounded-lg">
          <MapPin size={16} className="text-green-600" />
          <span className="text-sm text-green-800">
            Detected: {detectedLocation}
          </span>
        </div>
      )}

      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-sm text-red-800">{error}</span>
        </div>
      )}
    </div>
  );
};

export default LocationDetector;