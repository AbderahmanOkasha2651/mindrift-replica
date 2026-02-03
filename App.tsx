import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProductsSection } from './components/ProductsSection';
import { SellerDashboard } from './components/SellerDashboard';
import { Product } from './types';
import { loadProducts, saveProducts } from './lib/storage';
import { Home } from './src/pages/Home';
import { LoginPage } from './src/pages/LoginPage';
import { RegisterPage } from './src/pages/RegisterPage';
import { Dashboard } from './src/pages/Dashboard';
import { ProtectedRoute } from './src/components/ProtectedRoute';
import { ApiUser } from './src/lib/api';

const readStoredUser = (): ApiUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = localStorage.getItem('user');
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as ApiUser;
  } catch {
    return null;
  }
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState<Product[]>(() => loadProducts());
  const [currentUser, setCurrentUser] = React.useState<ApiUser | null>(() => readStoredUser());

  React.useEffect(() => {
    saveProducts(products);
  }, [products]);

  const syncUser = (user: ApiUser | null) => {
    setCurrentUser(user);
    if (typeof window === 'undefined') {
      return;
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  const handleRegister = (user: ApiUser) => {
    syncUser(user);
  };

  const handleLogin = (user: ApiUser) => {
    syncUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    setProducts((prev) => [
      {
        ...product,
        id: `p-${Date.now()}`,
        sellerId: currentUser ? String(currentUser.id) : undefined,
      },
      ...prev,
    ]);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute onAuthenticated={syncUser}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-plan"
          element={
            <div className="px-6 pt-28 pb-16 sm:px-10 lg:px-16">
              <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <h1 className="text-3xl font-semibold text-white">Create plan with AI</h1>
                <p className="mt-3 text-sm text-white/70">
                  صفحة مبدئية. هنا هنضيف مولد خطط التمرين بالذكاء الاصطناعي.
                </p>
              </div>
            </div>
          }
        />
        <Route
          path="/news"
          element={
            <div className="px-6 pt-28 pb-16 sm:px-10 lg:px-16">
              <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <h1 className="text-3xl font-semibold text-white">News</h1>
                <p className="mt-3 text-sm text-white/70">
                  صفحة مبدئية للأخبار والتحديثات الخاصة بـ GymUnity.
                </p>
              </div>
            </div>
          }
        />
        <Route
          path="/store"
          element={
            <div className="pt-24">
              <ProductsSection products={products} />
            </div>
          }
        />
        <Route
          path="/seller"
          element={
            currentUser?.role === 'seller' ? (
              <SellerDashboard
                products={products}
                onAddProduct={handleAddProduct}
                onBack={() => navigate('/')}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
};

export default App;
