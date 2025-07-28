import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

// Layout Components
import LoadingSpinner from './Components/Common/LoadingSpinner';

// Lazy-loaded components
const Navbar = React.lazy(() => import('./Components/Navbar/Navbar'));
const Home = React.lazy(() => import('./Components/Home/Home'));
const SignIn = React.lazy(() => import('./Components/Auth/SignIn'));
const SignUp = React.lazy(() => import('./Components/Auth/SignUp'));
const ForgotPassword = React.lazy(() => import('./Components/Auth/ForgotPassword'));
const Podcast = React.lazy(() => import('./Components/PodCast/PodCast'));
const PodcastPlayer = React.lazy(() => import('./Components/PodCast/Watch/Podcast.Watch'));
const Products = React.lazy(() => import('./Components/Podmerch/Products'));
const ArticleDiscovery = React.lazy(() => import('./Components/Articles/Articles'));
const PodGuideDiscovery = React.lazy(() => import('./Components/Podguide/Podguide'));
const Contacts = React.lazy(() => import('./Components/Contact/Contacts'));
const Footer = React.lazy(() => import('./Components/footer/Footer'));
const ErrorPage = React.lazy(() => import('./Components/Common/ErrorPage'));

// Admin Components
const AdLayout = React.lazy(() => import('./Components/Admin/Layout/Layout'));
const AdminDashboard = React.lazy(() => import('./Components/Admin/DashBoard/AdminDashboard'));
const AdminUsers = React.lazy(() => import('./Components/Admin/Users/AdminUsers'));
const AdminCreateUser = React.lazy(() => import('./Components/Admin/Users/CreateUser'));
const EditUserPage = React.lazy(() => import('./Components/Admin/Users/UpdateUser'));
const ChangePassword = React.lazy(() => import('./Components/ChangePassword/ChangePassword'));

// const AdminContent = React.lazy(() => import('./Components/Admin/Content'));

// Auth context/hook (you'll need to implement this)
const useAuth = () => {
  // Replace with your actual authentication logic
  const isAuthenticated = !!localStorage.getItem('authToken');
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  return { isAuthenticated, isAdmin };
};

// Private Route Component
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Main Layout
const AppLayout = () => (
  <>
    <Suspense fallback={null}>
      <Navbar />
    </Suspense>
    <main style={{ minHeight: '80vh' }}>
      <Outlet />
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </>
);


// Admin Layout (optional separate layout for admin)
const AdminLayout = () => (
  <>
    <AdLayout  />
  </>
);

const router = createBrowserRouter([


  {
    path: '/',
    element: <AppLayout />,
    errorElement: (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      { index: true, element: <Suspense fallback={<LoadingSpinner />}><Home /></Suspense> },
      { path: 'signin', element: <Suspense fallback={<LoadingSpinner />}><SignIn /></Suspense> },
      { path: 'signup', element: <Suspense fallback={<LoadingSpinner />}><SignUp /></Suspense> },
      { path: 'forgot-password', element: <Suspense fallback={<LoadingSpinner />}><ForgotPassword /></Suspense> },
      { path: 'podcast', element: <Suspense fallback={<LoadingSpinner />}><Podcast /></Suspense> },
      { path: 'podcast/watch/:podcastId', element: <Suspense fallback={<LoadingSpinner />}><PodcastPlayer /></Suspense> },
      { path: 'products', element: <Suspense fallback={<LoadingSpinner />}><Products /></Suspense> },
      { path: 'podarticles', element: <Suspense fallback={<LoadingSpinner />}><ArticleDiscovery /></Suspense> },
      { path: 'podguide', element: <Suspense fallback={<LoadingSpinner />}><PodGuideDiscovery /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<LoadingSpinner />}><Contacts /></Suspense> },
      
    ]
  }, // Admin Routes
      {
        path: 'admin',
        element: (
          <PrivateRoute adminOnly>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <Suspense fallback={<LoadingSpinner />}><AdminDashboard /></Suspense> },
          { path: 'users', element: <Suspense fallback={<LoadingSpinner />}><AdminUsers /></Suspense> },
          { path: 'users/create', element: <Suspense fallback={<LoadingSpinner />}><AdminCreateUser /></Suspense> },
          { path:'users/edit/:userId', element: <Suspense fallback={<LoadingSpinner />}><EditUserPage /></Suspense>},
          { path: 'user/change/password/:userId', element: <Suspense fallback={<LoadingSpinner />}><ChangePassword /></Suspense> }
        ]
      }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;