import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios'; // Import Axios
import ProfileCard from './ProfileCard';

export default function ProfileCarousel() {
  const [profiles, setProfiles] = useState([]); // State to store fetched profiles
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for errors

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationDuration = 500; // milliseconds, should match CSS transition duration
  const API_BASE_URL = 'http://localhost:8000'; // Define your backend API base URL

  // Fetch profiles when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/profiles`);
        setProfiles(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
        console.error("Failed to fetch profiles:", err);
      }
    };

    fetchProfiles();
  }, []); // Empty dependency array means this runs once on mount

  // Derived state: current profile to display
  const currentProfile = profiles.length > 0 ? profiles[currentIndex] : null;

  const triggerSwipe = (direction) => {
    if (isAnimating || profiles.length === 0) return; // Prevent swipe if animating or no profiles

    setIsAnimating(true);
    setSwipeDirection(direction);

    setTimeout(() => {
      if (direction === 'left') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
      } else { // direction === 'right'
        setCurrentIndex((prevIndex) =>
          (prevIndex - 1 + profiles.length) % profiles.length
        );
      }
      setSwipeDirection(null); // Reset swipe direction
      setIsAnimating(false);
    }, animationDuration);
  };

  const handleNext = () => triggerSwipe('left');
  const handlePrevious = () => triggerSwipe('right');

  // --- Loading, Error, and No Profiles UI ---
  if (isLoading) {
    return (
      <div className="text-lg text-blue-500 dark:text-blue-400 animate-pulse">
        Loading profiles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-lg text-red-500 dark:text-red-400">
        Error loading profiles: {error.message || "Unknown error"}
      </div>
    );
  }

  if (profiles.length === 0) {
    return <div className="text-lg text-gray-500 dark:text-gray-400">No profiles to show.</div>;
  }

  // --- Main Carousel UI (only renders if profiles are loaded) ---
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {currentProfile && ( // Render ProfileCard only if currentProfile exists
          <ProfileCard profile={currentProfile} swipeDirection={swipeDirection} />
        )}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700/50 hover:bg-gray-700/80 text-white p-2 rounded-full z-10"
          aria-label="Previous Profile"
          disabled={isAnimating || profiles.length <= 1} // Disable if animating or only one profile
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700/50 hover:bg-gray-700/80 text-white p-2 rounded-full z-10"
          aria-label="Next Profile"
          disabled={isAnimating || profiles.length <= 1} // Disable if animating or only one profile
        >
          &gt;
        </button>
      </div>
    </div>
  );
}