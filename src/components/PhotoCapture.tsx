
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, ArrowLeft, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PhotoCaptureProps {
  onPhotoCapture: (photoDataUrl: string) => void;
  onBack: () => void;
}

const PhotoCapture = ({ onPhotoCapture, onBack }: PhotoCaptureProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Kamera tidak dapat diakses",
        description: "Pastikan izin kamera telah diberikan",
        variant: "destructive"
      });
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Flip image if using front camera
      if (facingMode === 'user') {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      }
      
      context.drawImage(video, 0, 0);
      
      const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      onPhotoCapture(photoDataUrl);
    }

    // Stop camera
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    setTimeout(() => setIsCapturing(false), 100);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "File tidak valid",
        description: "Silakan pilih file gambar",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onPhotoCapture(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-2xl border-2 hover:bg-white/80"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Button>
          
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Ambil Foto
          </h2>
          
          <div className="w-20"></div>
        </div>

        {/* Camera Section */}
        <Card className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden mb-6">
          <div className="relative aspect-[4/3] bg-gray-900 rounded-3xl overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
            />
            
            {/* Camera overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-white/50 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-white/50 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-white/50 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-white/50 rounded-br-lg"></div>
            </div>

            {/* Flash effect */}
            {isCapturing && (
              <div className="absolute inset-0 bg-white opacity-80 animate-pulse"></div>
            )}
          </div>
        </Card>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Camera Controls */}
          <div className="flex gap-4">
            <Button
              onClick={toggleCamera}
              variant="outline"
              size="lg"
              className="rounded-2xl bg-white/80 hover:bg-white/90 border-2"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>

            <Button
              onClick={capturePhoto}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-2xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isCapturing}
            >
              <Camera className="w-6 h-6 mr-2" />
              {isCapturing ? 'Mengambil...' : 'Ambil Foto'}
            </Button>
          </div>

          {/* Divider */}
          <div className="text-gray-400 font-medium">atau</div>

          {/* Upload Button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 border-2 border-cyan-200"
            >
              <Upload className="w-6 h-6 mr-2" />
              Pilih dari Galeri
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            💡 <strong>Tips:</strong> Pastikan pencahayaan cukup untuk hasil foto terbaik
          </p>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoCapture;
