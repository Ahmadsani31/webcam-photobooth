
import { useState } from 'react';
import PhotoCapture from '@/components/PhotoCapture';
import PhotoEditor from '@/components/PhotoEditor';
import { useNavigate } from 'react-router-dom';

const Photobooth = () => {
  const [currentStep, setCurrentStep] = useState<'capture' | 'edit'>('capture');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhotoCapture = (photoDataUrl: string) => {
    setCapturedPhoto(photoDataUrl);
    setCurrentStep('edit');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleBackToCapture = () => {
    setCurrentStep('capture');
  };

  if (currentStep === 'edit' && capturedPhoto) {
    return (
      <PhotoEditor 
        photoUrl={capturedPhoto}
        onBack={handleBackToCapture}
        onHome={handleBackToHome}
      />
    );
  }

  return (
    <PhotoCapture 
      onPhotoCapture={handlePhotoCapture}
      onBack={handleBackToHome}
    />
  );
};

export default Photobooth;
