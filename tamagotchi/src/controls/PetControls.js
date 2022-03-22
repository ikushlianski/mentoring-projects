import React from "react";

export const PetControls = ({ feed, getOlder, treat }) => {
  const handleFeed = () => {
    feed();
    getOlder();
  };

  const handleTreat = () => {
    treat();
  };

  return (
    <div>
      <div>
        <button onClick={handleFeed}>Feed</button>
      </div>
      <div>
        <button onClick={handleTreat}>Treat</button>
      </div>
    </div>
  );
};
