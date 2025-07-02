import React, { useState } from 'react';
import useAuthStore from '../zustand/authStore';

const Navigation: React.FC = () => {
  // Mobile menu toggle state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth store'dan gerekli değerleri çek
  const { 
    isAuthenticated, 
    user, 
    logout 
  } = useAuthStore();

  // Logout fonksiyonu - onay ile
  const handleLogout = () => {
    const confirmed = window.confirm('Çıkış yapmak istediğinizden emin misiniz?');
    if (confirmed) {
      logout();
      setIsMobileMenuOpen(false); // Mobile menu'yu kapat
    }
  };

  return (
    <nav className='bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          
          {/* Logo */}
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>Z</span>
            </div>
            <h1 className='text-xl font-bold text-gray-800'>Zustand App</h1>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated ? (
            // Authenticated User Navigation
            <div className='hidden md:flex items-center space-x-6'>
              
              {/* Navigation Links */}
              <a href="#todos" className='text-gray-600 hover:text-blue-600 font-medium transition-colors'>
                📝 Todo'lar
              </a>
              <a href="#profile" className='text-gray-600 hover:text-blue-600 font-medium transition-colors'>
                👤 Profil
              </a>

              {/* User Info */}
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center'>
                  <span className='text-white font-bold text-xs'>
                    {user?.firstName ? user.firstName[0].toUpperCase() : user?.username[0].toUpperCase()}
                  </span>
                </div>
                <div className='text-sm'>
                  <p className='text-gray-800 font-medium'>
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : user?.username
                    }
                  </p>
                  <p className='text-gray-500 text-xs'>@{user?.username}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors'
              >
                🚪 Çıkış
              </button>
            </div>
          ) : (
            // Non-authenticated Navigation
            <div className='hidden md:flex items-center space-x-4'>
              <span className='text-gray-600'>Hoş geldiniz! Lütfen giriş yapın.</span>
              <div className='px-4 py-2 bg-blue-500 text-white rounded-lg font-medium'>
                🔐 Giriş Gerekli
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 text-gray-600 hover:text-gray-800'
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-gray-200 py-4'>
            {isAuthenticated ? (
              <div className='space-y-4'>
                {/* User Info Mobile */}
                <div className='flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg'>
                  <div className='w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center'>
                    <span className='text-white font-bold text-sm'>
                      {user?.firstName ? user.firstName[0].toUpperCase() : user?.username[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className='text-gray-800 font-medium'>
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user?.username
                      }
                    </p>
                    <p className='text-gray-500 text-sm'>@{user?.username}</p>
                  </div>
                </div>

                {/* Navigation Links Mobile */}
                <div className='space-y-2'>
                  <a 
                    href="#todos" 
                    className='block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📝 Todo'lar
                  </a>
                  <a 
                    href="#profile" 
                    className='block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    👤 Profil
                  </a>
                </div>

                {/* Logout Button Mobile */}
                <button
                  onClick={handleLogout}
                  className='w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors'
                >
                  🚪 Çıkış Yap
                </button>
              </div>
            ) : (
              <div className='px-4 py-2 text-center'>
                <p className='text-gray-600 mb-4'>Hoş geldiniz! Lütfen giriş yapın.</p>
                <div className='px-4 py-2 bg-blue-500 text-white rounded-lg font-medium inline-block'>
                  🔐 Giriş Gerekli
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

/* 
BİLEŞEN ÖZELLİKLERİ:

✅ Authentication durumuna göre farklı görünüm
✅ Responsive tasarım (desktop & mobile)
✅ Mobile hamburger menu
✅ Kullanıcı bilgilerini gösterme
✅ Avatar gösterimi
✅ Logout fonksiyonu
✅ Navigation links
✅ Modern UI tasarımı
✅ Sticky navigation
✅ Smooth transitions

KULLANIM:
<Navigation />
*/ 