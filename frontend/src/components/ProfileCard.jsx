// src/components/ProfileCard.jsx
import React from 'react';

// Default values for a profile card
const defaultProfileCardData = {
  imageUrl: 'https://via.placeholder.com/400x500/A0A0A0/FFFFFF?text=No+Image',
  name: 'Unknown User',
  age: '??',
  description: 'No description available.',
};

export default function ProfileCard({ profile }) { // Now expects 'profile' as a prop
  // Merge provided profile data with defaults to ensure all fields exist
  const data = { ...defaultProfileCardData, ...profile };

  return (
    <div className="relative bg-white dark:bg-dark-card rounded-lg shadow-xl w-80 sm:w-96 overflow-hidden">
      {/* Profile Image */}
      <div className="w-full h-80 sm:h-96 overflow-hidden">
        <img
          src={data.imageUrl}
          alt={`${data.name}'s profile`}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Profile Info Overlay (Gradient for Tinder-like effect) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
        <div className="flex items-center mb-2">
          <h2 className="text-3xl font-bold mr-2">{data.name}</h2>
          <span className="text-2xl font-light">{data.age}</span>
        </div>
        <p className="text-lg font-light leading-snug">{data.description}</p>
      </div>

      {/* Action Buttons (You can uncomment and style these later) */}
      { <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 z-10">
        <button className="bg-red-500 text-white p-3 rounded-full shadow-lg">X</button>
        <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg">⭐</button>
        <button className="bg-green-500 text-white p-3 rounded-full shadow-lg">❤️</button>
      </div>}
    </div>
  );
}