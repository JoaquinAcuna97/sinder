// src/components/ProfileCarousel.jsx
import React, { useState } from 'react';
import ProfileCard from './ProfileCard'; // Import ProfileCard

// Hardcoded Array of Profiles (unchanged)
const profilesData = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1976&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Sarah',
    age: 26,
    description: 'Enthusiastic traveler and aspiring chef. Always up for an adventure or a cozy night in. Love to laugh and explore new places!',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a8677c7f3b8?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Michael',
    age: 30,
    description: 'Software engineer by day, amateur photographer by night. Looking for someone to share sunsets and bad jokes with. Dog lover!',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Emily',
    age: 24,
    description: 'Artist and cat enthusiast. My ideal date involves a quiet gallery, a good book, or a spontaneous road trip. Let\'s create something beautiful!',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'David',
    age: 32,
    description: 'Fitness junkie and foodie. I believe in living life to the fullest. Seeking a partner in crime for gym sessions and gastronomic adventures.',
  },
];

export default function ProfileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right'
  const [isAnimating, setIsAnimating] = useState(false);

  const currentProfile = profilesData[currentIndex];
  const animationDuration = 500; // milliseconds, should match CSS transition duration

  const triggerSwipe = (direction) => {
    if (isAnimating) return; // Prevent multiple swipes during animation

    setIsAnimating(true);
    setSwipeDirection(direction);

    // After the animation duration, update the index and reset animation state
    setTimeout(() => {
      if (direction === 'left') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % profilesData.length);
      } else { // direction === 'right'
        setCurrentIndex((prevIndex) =>
          (prevIndex - 1 + profilesData.length) % profilesData.length
        );
      }
      setSwipeDirection(null); // Reset swipe direction
      setIsAnimating(false);
    }, animationDuration);
  };

  const handleNext = () => triggerSwipe('left'); // Swiping left for next profile
  const handlePrevious = () => triggerSwipe('right'); // Swiping right for previous profile

  if (profilesData.length === 0) {
    return <div className="text-lg text-gray-500 dark:text-gray-400">No profiles to show.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <ProfileCard profile={currentProfile} swipeDirection={swipeDirection} />

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700/50 hover:bg-gray-700/80 text-white p-2 rounded-full z-10"
          aria-label="Previous Profile"
          disabled={isAnimating} // Disable buttons during animation
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700/50 hover:bg-gray-700/80 text-white p-2 rounded-full z-10"
          aria-label="Next Profile"
          disabled={isAnimating} // Disable buttons during animation
        >
          &gt;
        </button>
      </div>
    </div>
  );
}