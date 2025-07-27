import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      
      <>
        <Navbar />
          <Home />
        <Footer />
      </>
    ),
    errorElement: (
      <div className='Not Found'>
        <title>Error</title>
        <p>Error - 404 </p>
        <p>Page not found </p>
        <button>Go Back</button>
      </div>
    ),
  },
  { path: '/signin', 
    element: (
      <>
        <Navbar />
          <SignIn />
        <Footer />
      </>
  ) 
  },  { path: '/signup', 
        element: (
          <>
            <Navbar />
              <SignUp />
            <Footer />
          </>
      ) 
      },
      { path: '/forgot-password', 
        element: (
          <>
            <Navbar />
              <ForgotPassword />
            <Footer />
          </>
      ) 
      },
      { path: '/podcast', 
        element: (
          <>
            <Navbar />
              <Podcast/>
            <Footer />
          </>
      ) 
      },
      { path: '/podcast/watch/:podcastId?', 
        element: (
          <>
            <Navbar />
              <PodcastPlayer/>
            <Footer />
          </>
      ) 
      },
      { path: '/products', 
        element: (
          <>
            <Navbar />
              <Products/>
            <Footer />
          </>
      ) 
      },
      { path: '/podarticles', 
        element: (
          <>
            <Navbar />
              <ArticleDiscovery/>
            <Footer />
          </>
      ) 
      },
      { path: '/podguide', 
        element: (
          <>
            <Navbar />
              <PodGuideDiscovery/>
            <Footer />
          </>
      ) 
      },
      { path: '/contact', 
        element: (
          <>
            <Navbar />
              <Contacts/>
            <Footer />
          </>
      ) 
      },



]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
