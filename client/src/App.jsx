import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/footer/Footer';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import ForgotPassword from './Components/Auth/ForgotPassword';
import Podcast from './Components/PodCast/PodCast';
import PodcastPlayer from './Components/PodCast/Watch/Podcast.Watch';
import Products from './Components/Podmerch/Products';
import ArticleDiscovery from './Components/Articles/Articles';
import PodGuideDiscovery from './Components/Podguide/Podguide';
import Contacts from './Components/Contact/Contacts';
// Removed any CSS imports from other folders to avoid importing styles from unintended locations.

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
