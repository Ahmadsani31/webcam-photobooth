
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Download, Facebook, Share, DoorClosed, CircleXIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface ShareModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ShareModal = ({ imageUrl, onClose }: ShareModalProps) => {
  const downloadImage = () => {
    if (!imageUrl) {
      toast({
        title: "Error",
        description: "Tidak ada gambar untuk diunduh",
        variant: "destructive"
      });
      return;
    }

    const link = document.createElement('a');
    link.download = `photobooth-edited-${Date.now()}.jpg`;
    link.href = imageUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Foto berhasil diunduh!",
      description: "Foto yang sudah diedit telah disimpan ke perangkat Anda",
    });
  };

  const shareToWhatsApp = async () => {
    if (!imageUrl) {
      toast({
        title: "Warning",
        description: "Ongoing",
        variant: "default"
      });
      return;
    }

    try {
      // Convert data URL to blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      if (navigator.share && navigator.canShare?.({ files: [new File([blob], 'photobooth.jpg', { type: 'image/jpeg' })] })) {
        await navigator.share({
          title: 'Foto Photobooth Saya',
          text: 'Lihat foto keren yang baru saja saya edit!',
          files: [new File([blob], 'photobooth-edited.jpg', { type: 'image/jpeg' })]
        });
      } else {
        // Fallback: open WhatsApp web with text
        const text = encodeURIComponent('Lihat foto keren yang baru saja saya edit di Photobooth!');
        window.open(`https://wa.me/?text=${text}`, '_blank');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: open WhatsApp web with text
      const text = encodeURIComponent('Lihat foto keren yang baru saya edit di Photobooth!');
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  const shareToFacebook = () => {
    toast({
      title: "Warning",
      description: "Ongoing",
      variant: "default"
    });
    // const url = encodeURIComponent(window.location.href);
    // const text = encodeURIComponent('Lihat foto keren yang baru saja saya edit di Photobooth!');
    // window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Bagikan Foto
            </h3>
          </DialogTitle>
          <DialogDescription>
            Share moment indah mu hanya dengan satu kali klik.
          </DialogDescription>
        </DialogHeader>
        {/* Preview */}
        <div className="overflow-auto scrollbar-hide max-h-max h-[calc(100vh-150px)]">
          <div className="p-6">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-6">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Edited Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Loading preview...
                </div>
              )}
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
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
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
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full rounded-2xl py-3 border-2 border-gray-200 hover:bg-gray-50"
              >
                <CircleXIcon className="w-5 h-5 mr-3" />
                Close
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Terima kasih telah menggunakan Photobooth! 📸✨
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
