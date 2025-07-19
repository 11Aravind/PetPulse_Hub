import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LayoutWrapper } from './components/layout/LayoutWrapper';
import { Loader } from './components/ui/Loader';
import auth from '../auth';

// Direct imports for all components
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct';
import Order from './pages/Order';
import Blogs from './pages/Blogs';
import UpdateCategory from './pages/UpdateCategory';
import Addblog from './pages/Addblog';
import Gallery from './pages/Gallery';
import Notfound from './pages/Notfound';
import Caretaker from './pages/Caretaker';
import UpdateProduct from './pages/UpdateProduct';
import UpdateBlog from './pages/UpdateBlog';
import Address from './pages/Address';
import CategoryList from './pages/CategoryList';

// Define public routes (no authentication required)
const publicRoutes = [
  { path: '/login', component: Login },
];

// Define private routes (authentication required)
const privateRoutes = [
  { path: '/', component: Home },
  { path: '/productdetails', component: Product },
  { path: '/addproduct', component: AddProduct },
  { path: '/orderdetails', component: Order },
  { path: '/addresses/:id', component: Address },
  { path: '/blogs', component: Blogs },
  // Product routes
  { path: '/update/:productId', component: UpdateProduct },
  
  // Blog routes
  { path: '/updateblog/:blogId', component: UpdateBlog },
  { path: '/addblog', component: Addblog },
  
  // Category routes
  { path: '/categories', component: CategoryList },
  { path: '/add-category', component: UpdateCategory },
  { path: '/update-category/:categoryId', component: UpdateCategory },
  
  // Legacy category routes (redirects)
  { path: '/category', element: <Navigate to="/categories" replace /> },
  { path: '/addcategory', element: <Navigate to="/add-category" replace /> },
  { path: '/categoryupdate/:categoryId', element: <Navigate to="/update-category/:categoryId" replace /> },
  { path: '/gallery', component: Gallery },
  { path: '/caretaking', component: Caretaker },
  { path: '*', component: Notfound },
];

// Authentication wrapper component
const RequireAuth = ({ children }) => {
  const isAuthenticated = auth.onCheckOut();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Just return the children - LayoutWrapper is now handled at the route level
  return children;
};

// Public route wrapper
const PublicRoute = ({ children }) => {
  const isAuthenticated = auth.onCheckOut();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return children;
};

// Main routes component
export const AllRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = auth.onCheckOut();

  // Redirect to login if not authenticated and trying to access protected route
  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.some(route => location.pathname === route.path)) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  // Loading fallback component
  const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
      <Loader size="lg" />
    </div>
  );

  // Create route elements with proper layout
  const renderRouteElement = (route, isPublic = false) => {
    // Handle both component and element properties
    let element;
    if (route.element) {
      element = route.element;
    } else if (route.component) {
      element = <route.component />;
    } else {
      console.error('Route is missing both element and component properties:', route);
      return null;
    }
    
    if (isPublic) {
      return <PublicRoute>{element}</PublicRoute>;
    }
    
    return (
      <RequireAuth>
        <LayoutWrapper>
          {element}
        </LayoutWrapper>
      </RequireAuth>
    );
  };

  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map((route, index) => (
        <Route
          key={`public-${index}`}
          path={route.path}
          element={renderRouteElement(route, true)}
        />
      ))}

      {/* Protected routes */}
      {privateRoutes.map((route, index) => (
        <Route
          key={`private-${index}`}
          path={route.path}
          element={renderRouteElement(route, false)}
        />
      ))}
    </Routes>
  );
};

export default AllRoutes;
