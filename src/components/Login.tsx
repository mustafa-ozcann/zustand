import React, { useState, useEffect } from 'react';
import useAuthStore from '../zustand/authStore';
import type { LoginCredentials } from '../zustand/authStore';

const Login: React.FC = () => {
  // Form state'leri
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  
  // Show/hide password state
  const [showPassword, setShowPassword] = useState(false);

  // Auth store'dan gerekli fonksiyon ve state'leri çek
  const { 
    login, 
    isLoading, 
    error, 
    clearError,
    isAuthenticated 
  } = useAuthStore();

  // Input değişikliklerini handle et
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Credential state'ini güncelle
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));

    // Eğer hata varsa temizle (kullanıcı yazmaya başladığında)
    if (error) {
      clearError();
    }
  };

  // Form submit handle et
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basit validation
    if (!credentials.username.trim()) {
      return;
    }
    
    if (!credentials.password.trim()) {
      return;
    }

    // Login fonksiyonunu çağır
    const success = await login(credentials);
    
    if (success) {
      // Login başarılı - form'u temizle
      setCredentials({ username: '', password: '' });
      console.log('🎉 Login başarılı! Ana sayfaya yönlendiriliyor...');
    }
  };

  // Component unmount olduğunda hataları temizle
  useEffect(() => {
    return () => {
      if (error) {
        clearError();
      }
    };
  }, [error, clearError]);

  // Eğer kullanıcı zaten giriş yapmışsa login formunu gösterme
  if (isAuthenticated) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-xl shadow-xl border border-green-200'>
          <div className='text-center'>
            <div className='text-6xl mb-4'>✅</div>
            <h2 className='text-2xl font-bold text-green-700 mb-2'>Giriş Başarılı!</h2>
            <p className='text-green-600'>Zaten giriş yapmış durumdasınız.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden'>
        
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center'>
          <h1 className='text-3xl font-bold text-white mb-2'>Giriş Yap</h1>
          <p className='text-blue-100'>Hesabınıza erişim sağlayın</p>
        </div>

        {/* Form */}
        <div className='p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            
            {/* Username Input */}
            <div>
              <label htmlFor="username" className='block text-sm font-semibold text-gray-700 mb-2'>
                Kullanıcı Adı
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                placeholder="Kullanıcı adınızı girin"
                disabled={isLoading}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className='block text-sm font-semibold text-gray-700 mb-2'>
                Şifre
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12'
                  placeholder="Şifrenizi girin"
                  disabled={isLoading}
                  required
                />
                
                {/* Show/Hide Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3'>
                <span className='text-red-500 text-xl'>⚠️</span>
                <div>
                  <p className='text-red-700 font-medium'>Giriş Hatası</p>
                  <p className='text-red-600 text-sm'>{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !credentials.username.trim() || !credentials.password.trim()}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading || !credentials.username.trim() || !credentials.password.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Giriş Yapılıyor...</span>
                </div>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>

          {/* Test Credentials Info */}
          <div className='mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200'>
            <h3 className='text-sm font-semibold text-gray-700 mb-2'>Test Hesapları:</h3>
            <div className='text-xs text-gray-600 space-y-1'>
              <div>👨‍💼 <strong>Admin:</strong> admin / password</div>
              <div>👤 <strong>User:</strong> user / 123456</div>
            </div>
          </div>

          {/* Quick Login Buttons */}
          <div className='mt-4 grid grid-cols-2 gap-3'>
            <button
              type="button"
              onClick={() => setCredentials({ username: 'admin', password: 'password' })}
              className='px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium'
              disabled={isLoading}
            >
              Admin Giriş
            </button>
            <button
              type="button"
              onClick={() => setCredentials({ username: 'user', password: '123456' })}
              className='px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium'
              disabled={isLoading}
            >
              User Giriş
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

/* 
BİLEŞEN ÖZELLİKLERİ:

✅ Modern ve responsive tasarım
✅ Loading states ve animasyonlar
✅ Error handling ve gösterimi
✅ Show/hide password özelliği
✅ Form validation
✅ Quick login butonları (test için)
✅ Otomatik error temizleme
✅ Accessibility friendly
✅ Zustand store integration

KULLANIM:
<Login />
*/ 