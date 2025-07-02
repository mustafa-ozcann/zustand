import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Kullanıcı tipini tanımla
export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  token: string;
  refreshToken?: string;
};

// Login için gerekli veriler
export type LoginCredentials = {
  username: string;
  password: string;
};

// Authentication state tipini tanımla
type AuthState = {
  // State değişkenleri
  user: AuthUser | null;              // Giriş yapmış kullanıcı bilgileri
  isAuthenticated: boolean;           // Kullanıcının giriş yapıp yapmadığı
  isLoading: boolean;                 // Loading durumu
  error: string | null;               // Hata mesajları
  
  // Action fonksiyonları
  login: (credentials: LoginCredentials) => Promise<boolean>;    // Giriş yap
  logout: () => void;                                            // Çıkış yap
  checkAuthStatus: () => void;                                   // Token kontrolü
  clearError: () => void;                                        // Hataları temizle
  updateUser: (userData: Partial<AuthUser>) => void;            // Kullanıcı bilgilerini güncelle
};

// API simülasyonu - gerçek projede API endpoint'lerini kullanın
const mockLogin = async (credentials: LoginCredentials): Promise<AuthUser> => {
  // Simüle edilmiş API gecikme
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Basit validation - gerçek projede backend validation olmalı
  if (credentials.username === 'admin' && credentials.password === 'password') {
    return {
      id: 1,
      username: credentials.username,
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    };
  } else if (credentials.username === 'user' && credentials.password === '123456') {
    return {
      id: 2,
      username: credentials.username,
      email: 'user@example.com',
      firstName: 'Test',
      lastName: 'User',
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    };
  } else {
    throw new Error('Geçersiz kullanıcı adı veya şifre');
  }
};

// Authentication store'unu oluştur
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Başlangıç state değerleri
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // LOGIN FONKSİYONU
      login: async (credentials: LoginCredentials): Promise<boolean> => {
        // Loading durumunu başlat ve hataları temizle
        set({ isLoading: true, error: null });
        
        try {
          // API'ye login isteği gönder (mock function)
          const userData = await mockLogin(credentials);
          
          // Başarılı login durumunda state'i güncelle
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          // Local storage'a token kaydet (persist middleware otomatik yapar ama açık olması için)
          localStorage.setItem('auth-token', userData.token);
          
          console.log('✅ Login başarılı:', userData.username);
          return true;
          
        } catch (error) {
          // Hata durumunda state'i güncelle
          const errorMessage = error instanceof Error ? error.message : 'Giriş yaparken bir hata oluştu';
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage
          });
          
          console.error('❌ Login hatası:', errorMessage);
          return false;
        }
      },

      // LOGOUT FONKSİYONU
      logout: () => {
        // State'i temizle
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
        
        // Local storage'dan token'ı kaldır
        localStorage.removeItem('auth-token');
        
        // Opsiyonel: Tüm local storage'ı temizle
        // localStorage.clear();
        
        console.log('🚪 Çıkış yapıldı');
      },

      // TOKEN KONTROLÜ
      checkAuthStatus: () => {
        const { user } = get();
        
        // Kullanıcı varsa ve token varsa
        if (user && user.token) {
          // Token geçerliliğini kontrol et (basit zaman kontrolü)
          // Gerçek projede JWT decode edip expiry time kontrol edilmeli
          try {
            const tokenData = user.token.split('-');
            const tokenTime = parseInt(tokenData[tokenData.length - 1]);
            const currentTime = Date.now();
            
            // Token 24 saat geçerliliği (örnek)
            const tokenValidDuration = 24 * 60 * 60 * 1000; // 24 saat
            
            if (currentTime - tokenTime > tokenValidDuration) {
              // Token süresi dolmuş, logout yap
              get().logout();
              set({ error: 'Oturum süresi dolmuş. Lütfen tekrar giriş yapın.' });
              console.log('⏰ Token süresi dolmuş');
            } else {
              // Token geçerli
              set({ isAuthenticated: true });
              console.log('✅ Token geçerli');
            }
          } catch (error) {
            // Token parse edilemedi, logout yap
            get().logout();
            console.error('❌ Token parse hatası:', error);
          }
        } else {
          // Kullanıcı veya token yok
          set({ isAuthenticated: false });
        }
      },

      // HATA TEMİZLEME
      clearError: () => {
        set({ error: null });
      },

      // KULLANICI BİLGİLERİNİ GÜNCELLEME
      updateUser: (userData: Partial<AuthUser>) => {
        const { user } = get();
        
        if (user) {
          // Mevcut kullanıcı bilgileri ile yeni bilgileri birleştir
          const updatedUser = { ...user, ...userData };
          
          set({ user: updatedUser });
          console.log('👤 Kullanıcı bilgileri güncellendi:', updatedUser);
        }
      }
    }),
    
    // PERSIST MIDDLEWARE AYARLARI
    {
      name: 'auth-storage',        // Local storage key adı
      storage: createJSONStorage(() => localStorage), // Storage tipi
      
      // Sadece belirli alanları persist et
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      
      // Storage'dan yüklendikten sonra çalışacak fonksiyon
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Sayfa yenilendiğinde token kontrolü yap
          state.checkAuthStatus();
        }
      },
    }
  )
);

export default useAuthStore;

/* 
KULLANIM ÖRNEKLERİ:

// Component içinde kullanım:
const LoginComponent = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const handleLogin = async () => {
    const success = await login({ username: 'admin', password: 'password' });
    if (success) {
      // Login başarılı, redirect yapabilirsiniz
    }
  };
};

// Authentication kontrolü:
const { isAuthenticated, user } = useAuthStore();

// Logout:
const { logout } = useAuthStore();
logout();

TEST KULLANICILARI:
- Username: admin, Password: password
- Username: user, Password: 123456
*/ 