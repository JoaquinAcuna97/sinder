// src/components/ProfileCard.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from 'react-icons/fa';

// Default values for a profile card (unchanged)
const defaultProfileCardData = {
  imageUrl: 'https://via.placeholder.com/400x500/A0A0A0/FFFFFF?text=No+Image',
  name: 'Unknown User',
  age: '??',
  description: 'No description available.',
};

// Accept swipeDirection prop
export default function ProfileCard({ profile, swipeDirection }) {
  const data = { ...defaultProfileCardData, ...profile };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // State to manage animation classes
  const [animationClass, setAnimationClass] = useState('');

  // Use useEffect to react to swipeDirection prop changes
  useEffect(() => {
    if (swipeDirection === 'left') {
      setAnimationClass('animate-swipe-left');
    } else if (swipeDirection === 'right') {
      setAnimationClass('animate-swipe-right');
    } else {
      setAnimationClass(''); // Reset animation class
    }

    // Clean up animation class after it plays (or when component re-renders)
    // This is crucial for ensuring the card appears correctly for the next profile
    const timeout = setTimeout(() => {
        setAnimationClass('');
    }, 500); // Should match the animation duration in Tailwind config/CSS

    return () => clearTimeout(timeout);
  }, [swipeDirection, profile.id]); // Re-run effect when swipeDirection changes or a new profile is loaded

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
    console.log(`Profile ${data.name} favorited status: ${!isFavorite}`);
  };

  const handleSubmitFeedback = () => {
    console.log('Submitting Feedback:');
    console.log('Profile:', data.name);
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    console.log('Favorite:', isFavorite);
    alert(`Feedback Submitted for ${data.name}! Rating: ${rating}, Comment: "${comment}", Favorite: ${isFavorite}`);
    setRating(0);
    setComment('');
    setIsFavorite(false);
  };

  // Combine base classes with animation class
  const cardClasses = `relative bg-white dark:bg-dark-card rounded-lg shadow-xl w-80 sm:w-96 overflow-hidden mb-6
                       transition-all duration-500 ease-in-out transform ${animationClass}`;

  return (
    <div className="flex flex-col items-center">
      {/* Profile Display Card */}
      <div className={cardClasses}> {/* Apply combined classes here */}
        {/* Profile Image (unchanged) */}
        <div className="w-full h-80 sm:h-96 overflow-hidden">
          <img
            src={data.imageUrl}
            alt={`${data.name}'s profile`}
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Profile Info Overlay (unchanged) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
          <div className="flex items-center mb-2">
            <h2 className="text-3xl font-bold mr-2">{data.name}</h2>
            <span className="text-2xl font-light">{data.age}</span>
          </div>
          <p className="text-lg font-light leading-snug">{data.description}</p>
        </div>
      </div>

      {/* Interactive Feedback Card (unchanged from your current version) */}
      <div className="bg-gray-700 dark:bg-gray-800 rounded-lg shadow-xl w-80 sm:w-96 p-6 space-y-5">
        {/* Row 1: Clickable Stars for Rating */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-stone-100">
            Rate {data.name}:
          </p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starValue) => (
              <span
                key={starValue}
                onClick={() => handleStarClick(starValue)}
                className="cursor-pointer text-3xl"
              >
                {rating >= starValue ? (
                  <FaStar className="text-yellow-400 dark:text-yellow-500" />
                ) : (
                  <FaRegStar className="text-yellow-400 dark:text-yellow-500" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Comment Input */}
        <div className="flex flex-col">
          <label htmlFor="comment-input" className="text-lg font-semibold mb-2 text-gray-800 dark:text-stone-100">
            Comment:
          </label>
          <input
            type="text"
            id="comment-input"
            value={comment}
            onChange={handleCommentChange}
            placeholder={`Add a comment for ${data.name}...`}
            className="w-full p-3 bg-gray-200 dark:bg-gray-200 border boder-gray-300 rounded-lg text-stone-100  dark:border-gray-600 dark:bg-gray-100 dark:text-stone-100 placeholder-gray-800 dark:placeholder-gray-800 focus:ring-green-100 focus:border-green-100"
          />
        </div>

        {/* Row 3: Combined Add to Favorites Button */}
        <div className="flex justify-center">
          <button
            onClick={handleFavoriteToggle}
            className={`flex items-center justify-center px-6 py-3 rounded-full shadow-lg transition-colors duration-200
                        text-white font-semibold text-lg space-x-2
                        ${isFavorite ? 'bg-pink-500 hover:bg-pink-400' : 'bg-gray-300 dark:bg-gray-700 hover:bg-pink-400 hover:dark:bg-pink-500'}`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <>
                <FaHeart className="text-white text-xl" />
                <span className="text-white">Favorited!</span>
              </>
            ) : (
              <>
                <FaRegHeart className="text-gray-600 dark:text-gray-400 text-xl" />
                <span className="dark:text-dark-text">Add to Favorites</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}