import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Download, Share } from 'lucide-react';
import ShareModal from './ShareModal';

interface PhotoEditorProps {
  photoUrl: string;
  onBack: () => void;
  onHome: () => void;
}

interface Filters {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: number;
  sepia: number;
}

const PhotoEditor = ({ photoUrl, onBack, onHome }: PhotoEditorProps) => {
  const [filters, setFilters] = useState<Filters>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0
  });
  const [selectedFrame, setSelectedFrame] = useState<number>(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [finalImageUrl, setFinalImageUrl] = useState<string>('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const frames = [
    { id: 0, name: 'Tanpa Frame', style: '' },
    { id: 1, name: 'Polaroid', style: 'polaroid' },
    { id: 2, name: 'Vintage', style: 'vintage' },
    { id: 3, name: 'Rainbow', style: 'rainbow' }
  ];

  const filterPresets = [
    { name: 'Normal', filters: { brightness: 100, contrast: 100, saturation: 100, blur: 0, grayscale: 0, sepia: 0 } },
    { name: 'Vintage', filters: { brightness: 110, contrast: 120, saturation: 80, blur: 0, grayscale: 0, sepia: 30 } },
    { name: 'B&W', filters: { brightness: 105, contrast: 115, saturation: 100, blur: 0, grayscale: 100, sepia: 0 } },
    { name: 'Bright', filters: { brightness: 130, contrast: 110, saturation: 120, blur: 0, grayscale: 0, sepia: 0 } },
    { name: 'Soft', filters: { brightness: 105, contrast: 95, saturation: 90, blur: 1, grayscale: 0, sepia: 0 } }
  ];

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = () => {
        applyFilters();
      };
    }
  }, [filters, selectedFrame]);

  const applyFilters = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Apply filters
    ctx.filter = `
      brightness(${filters.brightness}%)
      contrast(${filters.contrast}%)
      saturate(${filters.saturation}%)
      blur(${filters.blur}px)
      grayscale(${filters.grayscale}%)
      sepia(${filters.sepia}%)
    `;

    ctx.drawImage(img, 0, 0);

    // Apply frame
    if (selectedFrame > 0) {
      applyFrame(ctx, canvas.width, canvas.height);
    }

    // Convert to data URL for sharing
    setFinalImageUrl(canvas.toDataURL('image/jpeg', 0.9));
  };

  const applyFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.filter = 'none';
    
    switch (selectedFrame) {
      case 1: // Polaroid
        ctx.fillStyle = 'white';
        ctx.fillRect(0, height - height * 0.15, width, height * 0.15);
        break;
      case 2: // Vintage
        const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.8, 'rgba(139,69,19,0.1)');
        gradient.addColorStop(1, 'rgba(139,69,19,0.3)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        break;
      case 3: // Rainbow
        const rainbowGradient = ctx.createLinearGradient(0, 0, width, 0);
        rainbowGradient.addColorStop(0, 'rgba(255,0,150,0.2)');
        rainbowGradient.addColorStop(0.2, 'rgba(255,100,0,0.2)');
        rainbowGradient.addColorStop(0.4, 'rgba(255,255,0,0.2)');
        rainbowGradient.addColorStop(0.6, 'rgba(0,255,100,0.2)');
        rainbowGradient.addColorStop(0.8, 'rgba(0,150,255,0.2)');
        rainbowGradient.addColorStop(1, 'rgba(150,0,255,0.2)');
        
        // Top border
        ctx.fillStyle = rainbowGradient;
        ctx.fillRect(0, 0, width, 20);
        // Bottom border
        ctx.fillRect(0, height - 20, width, 20);
        break;
    }
  };

  const handleFilterChange = (filterName: keyof Filters, value: number[]) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value[0]
    }));
  };

  const applyPreset = (preset: typeof filterPresets[0]) => {
    setFilters(preset.filters);
  };

  const downloadImage = () => {
    if (!finalImageUrl) return;

    const link = document.createElement('a');
    link.download = `photobooth-${Date.now()}.jpg`;
    link.href = finalImageUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 p-2 sm:p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="rounded-xl border-2 hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali
          </Button>
          
          <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Edit Foto
          </h2>
          
          <div className="flex gap-1">
            <Button
              onClick={downloadImage}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl p-2"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setShowShareModal(true)}
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-2"
            >
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Photo Preview */}
        <Card className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden mb-4">
          <div className="relative aspect-[9/16] bg-gray-100">
            <img
              ref={imageRef}
              src={photoUrl}
              alt="Original"
              className="hidden"
            />
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${photoUrl})`,
                filter: `
                  brightness(${filters.brightness}%)
                  contrast(${filters.contrast}%)
                  saturate(${filters.saturation}%)
                  blur(${filters.blur}px)
                  grayscale(${filters.grayscale}%)
                  sepia(${filters.sepia}%)
                `
              }}
            >
              {/* Frame overlays */}
              {selectedFrame === 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-white"></div>
              )}
              {selectedFrame === 2 && (
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(circle, transparent 0%, transparent 80%, rgba(139,69,19,0.3) 100%)'
                  }}
                ></div>
              )}
              {selectedFrame === 3 && (
                <>
                  <div 
                    className="absolute top-0 left-0 right-0 h-4 opacity-20"
                    style={{
                      background: 'linear-gradient(90deg, #ff0096, #ff6400, #ffff00, #00ff64, #0096ff, #9600ff)'
                    }}
                  ></div>
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-4 opacity-20"
                    style={{
                      background: 'linear-gradient(90deg, #ff0096, #ff6400, #ffff00, #00ff64, #0096ff, #9600ff)'
                    }}
                  ></div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Controls */}
        <div className="space-y-4">
          {/* Filter Presets */}
          <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Filter Preset</h3>
            <div className="grid grid-cols-3 gap-2">
              {filterPresets.map((preset) => (
                <Button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  variant="outline"
                  size="sm"
                  className="rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </Card>

          {/* Frame Selection */}
          <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Pilih Frame</h3>
            <div className="grid grid-cols-2 gap-2">
              {frames.map((frame) => (
                <Button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame.id)}
                  variant={selectedFrame === frame.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-xl text-xs"
                >
                  {frame.name}
                </Button>
              ))}
            </div>
          </Card>

          {/* Manual Filters */}
          <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Atur Manual</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Kecerahan: {filters.brightness}%
                </label>
                <Slider
                  value={[filters.brightness]}
                  onValueChange={(value) => handleFilterChange('brightness', value)}
                  min={50}
                  max={200}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Kontras: {filters.contrast}%
                </label>
                <Slider
                  value={[filters.contrast]}
                  onValueChange={(value) => handleFilterChange('contrast', value)}
                  min={50}
                  max={200}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Saturasi: {filters.saturation}%
                </label>
                <Slider
                  value={[filters.saturation]}
                  onValueChange={(value) => handleFilterChange('saturation', value)}
                  min={0}
                  max={200}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Blur: {filters.blur}px
                </label>
                <Slider
                  value={[filters.blur]}
                  onValueChange={(value) => handleFilterChange('blur', value)}
                  min={0}
                  max={10}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Grayscale: {filters.grayscale}%
                </label>
                <Slider
                  value={[filters.grayscale]}
                  onValueChange={(value) => handleFilterChange('grayscale', value)}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Sepia: {filters.sepia}%
                </label>
                <Slider
                  value={[filters.sepia]}
                  onValueChange={(value) => handleFilterChange('sepia', value)}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      
      {showShareModal && (
        <ShareModal 
          imageUrl={finalImageUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default PhotoEditor;
