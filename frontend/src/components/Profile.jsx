// src/components/Profile.jsx
import React from 'react';

// Example default profile data (you can replace this with actual user data from Redux)
const defaultProfile = {
  imageUrl: 'https://images-ssl.gotinder.com/u/12oPJKQ98W2pbRuWwsdAxY/kYsnK1rFWyeLk9RWQPhYca.webp?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6IiovdS8xMm9QSktROThXMnBiUnVXd3NkQXhZLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NTAwOTE2MzR9fX1dfQ__&Signature=QNgHehRe5Ax4mmK9wre9Tpl9thUTFF6S2H5Flyqu9Ji3zxz6KSAu~SG8dVdrOYWgqm6eGHxI~s4XlrWQDQSvISQYrONTUqawjAUM7EjsSJ41u8e6BksZ07rlnatdmzCF7ZuV5rm3QNa-bDmoWraCItM00o-BaTLHFl-wteVsJ6PwyssRNjRQwyzuS8HqRV7L8oUAhIGiROCFvnln0M01BAcAm-XaW8Oa0qWDre-4NxECshUKAgQdn643qdmHswshsi0783i4orwutfj3DcpDgwBHNdwfL8RvcR6zRM4UL7C3N6Y0C5fbLXcqswXxoR7B-AZCBXi9KGgTyLmOMK8V3A__&Key-Pair-Id=K368TLDEUPA6OI', // Example placeholder
  name: 'Sofi Ledesma',
  age: 21,
  description: 'Adventurous spirit looking for new experiences. Love hiking, coffee, and good conversations.',
};

export default function Profile({ user }) {
  // If user data comes from Redux, use it, otherwise fallback to default
  const profileData = user && user.profile ? user.profile : defaultProfile;

  return (
    <div className="relative bg-white dark:bg-dark-card rounded-lg shadow-xl w-80 sm:w-96 overflow-hidden">
      {/* Profile Image */}
      <div className="w-full h-80 sm:h-96 overflow-hidden">
        <img
          src={profileData.imageUrl}
          alt={`${profileData.name}'s profile`}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Profile Info Overlay (Gradient for Tinder-like effect) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
        <div className="flex items-center mb-2">
          <h2 className="text-3xl font-bold mr-2">{profileData.name}</h2>
          <span className="text-2xl font-light">{profileData.age}</span>
        </div>
        <p className="text-lg font-light leading-snug">{profileData.description}</p>
      </div>

      {/* Action Buttons (Optional, you can add Swipe/Like/Dislike buttons here later) */}
      {/* <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button className="bg-red-500 text-white p-3 rounded-full shadow-lg">X</button>
        <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg">⭐</button>
        <button className="bg-green-500 text-white p-3 rounded-full shadow-lg">❤️</button>
      </div> */}
    </div>
  );
}