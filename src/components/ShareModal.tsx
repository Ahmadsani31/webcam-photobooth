
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, Download, Facebook, Share } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ShareModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ShareModal = ({ imageUrl, onClose }: ShareModalProps) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = `photobooth-${Date.now()}.jpg`;
    link.href = imageUrl;
    link.click();
    
    toast({
      title: "Foto berhasil diunduh!",
      description: "Foto telah disimpan ke perangkat Anda",
    });
  };

  const shareToWhatsApp = () => {
    // Convert image to blob and create object URL for sharing
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        if (navigator.share) {
          navigator.share({
            title: 'Foto Photobooth Saya',
            text: 'Lihat foto keren yang baru saja saya buat!',
            files: [new File([blob], 'photobooth.jpg', { type: 'image/jpeg' })]
          }).catch(console.error);
        } else {
          // Fallback: open WhatsApp web with text
          const text = encodeURIComponent('Lihat foto keren yang baru saja saya buat di Photobooth!');
          window.open(`https://wa.me/?text=${text}`, '_blank');
        }
      });
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Lihat foto keren yang baru saja saya buat di Photobooth!');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link berhasil disalin!",
        description: "Link telah disalin ke clipboard",
      });
    } catch (error) {
      toast({
        title: "Gagal menyalin link",
        description: "Silakan coba lagi",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-transparent border-none shadow-none">
        <Card className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Bagikan Foto
            </h3>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="rounded-full h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Preview */}
          <div className="p-6">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-6">
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              <Button
                onClick={downloadImage}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl py-3"
              >
                <Download className="w-5 h-5 mr-3" />
                Download Foto
              </Button>

              <Button
                onClick={shareToWhatsApp}
                className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-2xl py-3"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Bagikan ke WhatsApp
              </Button>

              <Button
                onClick={shareToFacebook}
                variant="outline"
                className="w-full rounded-2xl py-3 border-2 border-blue-200 hover:bg-blue-50"
              >
                <Facebook className="w-5 h-5 mr-3" />
                Bagikan ke Facebook
              </Button>

              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="w-full rounded-2xl py-3 border-2 border-gray-200 hover:bg-gray-50"
              >
                <Share className="w-5 h-5 mr-3" />
                Salin Link
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Terima kasih telah menggunakan Photobooth! 📸✨
              </p>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
