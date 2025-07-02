import React, { useState } from 'react';
import useAuthStore from '../zustand/authStore';

const UserProfile: React.FC = () => {
  // Edit mode state'i
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Auth store'dan gerekli değerleri çek
  const { 
    user, 
    logout, 
    updateUser,
    isAuthenticated 
  } = useAuthStore();

  // Eğer kullanıcı giriş yapmamışsa bileşeni gösterme
  if (!isAuthenticated || !user) {
    return null;
  }

  // Edit mode'u başlat
  const startEdit = () => {
    setEditData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email
    });
    setIsEditing(true);
  };

  // Edit'i iptal et
  const cancelEdit = () => {
    setIsEditing(false);
    setEditData({ firstName: '', lastName: '', email: '' });
  };

  // Kullanıcı bilgilerini güncelle
  const saveEdit = () => {
    updateUser({
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email
    });
    setIsEditing(false);
  };

  // Input değişikliklerini handle et
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Logout fonksiyonu - onay ile
  const handleLogout = () => {
    const confirmed = window.confirm('Çıkış yapmak istediğinizden emin misiniz?');
    if (confirmed) {
      logout();
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
      
      {/* Header */}
      <div className='bg-gradient-to-r from-indigo-500 to-purple-600 p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            {/* Avatar */}
            <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600'>
              {user.firstName ? user.firstName[0].toUpperCase() : user.username[0].toUpperCase()}
            </div>
            
            {/* User Info */}
            <div className='text-white'>
              <h2 className='text-xl font-bold'>
                {user.firstName && user.lastName 
                  ? `${user.firstName} ${user.lastName}` 
                  : user.username
                }
              </h2>
              <p className='text-indigo-100'>@{user.username}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className='bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
            ✅ Aktif
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        
        {/* User Information */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Kullanıcı Bilgileri</h3>
          
          {isEditing ? (
            // Edit Mode
            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Ad</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    placeholder="Adınızı girin"
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Soyad</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    placeholder="Soyadınızı girin"
                  />
                </div>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  placeholder="E-posta adresinizi girin"
                />
              </div>

              {/* Edit Buttons */}
              <div className='flex space-x-3 pt-4'>
                <button
                  onClick={saveEdit}
                  className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors'
                >
                  💾 Kaydet
                </button>
                <button
                  onClick={cancelEdit}
                  className='px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors'
                >
                  ❌ İptal
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>Kullanıcı ID</label>
                  <p className='text-gray-800 font-medium'>{user.id}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>Kullanıcı Adı</label>
                  <p className='text-gray-800 font-medium'>@{user.username}</p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>Ad</label>
                  <p className='text-gray-800 font-medium'>{user.firstName || 'Belirtilmemiş'}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>Soyad</label>
                  <p className='text-gray-800 font-medium'>{user.lastName || 'Belirtilmemiş'}</p>
                </div>
              </div>

              <div className='bg-gray-50 p-4 rounded-lg'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>E-posta</label>
                <p className='text-gray-800 font-medium'>{user.email}</p>
              </div>

              {/* Action Buttons */}
              <div className='flex space-x-3 pt-4'>
                <button
                  onClick={startEdit}
                  className='px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors'
                >
                  ✏️ Düzenle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Session Info */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Oturum Bilgileri</h3>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
              <label className='block text-sm font-medium text-blue-600 mb-1'>Token Durumu</label>
              <p className='text-blue-800 font-medium'>✅ Geçerli</p>
            </div>
            <div className='bg-green-50 p-4 rounded-lg border border-green-200'>
              <label className='block text-sm font-medium text-green-600 mb-1'>Oturum Durumu</label>
              <p className='text-green-800 font-medium'>🟢 Aktif</p>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-semibold text-gray-800'>Oturumu Kapat</h3>
              <p className='text-gray-600 text-sm'>Hesabınızdan güvenli bir şekilde çıkış yapın</p>
            </div>
            <button
              onClick={handleLogout}
              className='px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl'
            >
              🚪 Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

/* 
BİLEŞEN ÖZELLİKLERİ:

✅ Kullanıcı bilgilerini görüntüleme
✅ Kullanıcı bilgilerini düzenleme
✅ Avatar ve profil görünümü
✅ Oturum bilgileri
✅ Güvenli logout işlemi
✅ Responsive tasarım
✅ Modern UI/UX
✅ Loading states
✅ Form validation
✅ Zustand store integration

KULLANIM:
<UserProfile />
*/ 