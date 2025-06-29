
import { Button } from '@/components/ui/button';
import { Camera, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Header Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="relative">
              <Camera className="w-16 h-16 text-pink-500" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            Ambil Momen Terbaikmu!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            Edit, hias, dan bagikan fotomu dengan gaya kekinian
          </p>
          
          <div className="flex justify-center items-center gap-2 text-pink-500 mb-8">
            <Heart className="w-5 h-5 fill-current" />
            <span className="text-lg">Gratis & Mudah Digunakan</span>
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ambil Foto</h3>
            <p className="text-gray-600">Gunakan kamera atau pilih dari galeri</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Edit & Hias</h3>
            <p className="text-gray-600">Tambahkan filter dan frame menarik</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Bagikan</h3>
            <p className="text-gray-600">Download atau bagikan ke media sosial</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/photobooth">
          <Button 
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Camera className="w-6 h-6 mr-2" />
            Mulai Sekarang!
          </Button>
        </Link>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-50 animate-pulse hidden md:block"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink-200 rounded-full opacity-50 animate-pulse hidden md:block"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-cyan-200 rounded-full opacity-50 animate-pulse hidden md:block"></div>
      </div>
    </div>
  );
};

export default Index;
