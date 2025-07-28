import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Routing/LoadingSpinner';

const RedirectWithTimeout = ({ delay = 5000, path = '/' }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(Math.ceil(delay / 1000));
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isStaying, setIsStaying] = useState(false);
  const redirectTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    if (isStaying) return;

    // Set up the countdown timer
    countdownIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    // Set up the redirect timeout
    redirectTimeoutRef.current = setTimeout(() => {
      setIsRedirecting(true);
      navigate(path, { replace: true });
    }, delay);

    // Clean up both timers
    return () => {
      clearInterval(countdownIntervalRef.current);
      clearTimeout(redirectTimeoutRef.current);
    };
  }, [delay, navigate, path, isStaying]);

  const handleStayHere = () => {
    clearTimeout(redirectTimeoutRef.current);
    clearInterval(countdownIntervalRef.current);
    setIsStaying(true);
    setTimeLeft(null);
  };

  const handleGoNow = () => {
    clearTimeout(redirectTimeoutRef.current);
    clearInterval(countdownIntervalRef.current);
    navigate(path, { replace: true });
  };

  if (isRedirecting) {
    return <LoadingSpinner message="Redirecting..." />;
  }

  return (
    <div className="redirect-notice">
      {!isStaying ? (
        <h2>You will be redirected in {timeLeft} seconds...</h2>
      ) : (
        <h2>Redirect cancelled</h2>
      )}
      
      <button 
        className="cancel-redirect"
        onClick={handleGoNow}
      >
        Go Now
      </button>
      
      {!isStaying && (
        <button 
          className="stay-here"
          onClick={handleStayHere}
        >
          Stay Here
        </button>
      )}
    </div>
  );
};

export default RedirectWithTimeout;