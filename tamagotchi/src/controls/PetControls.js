import React from "react";

export const PetControls = ({ feed, getOlder, treat, isSick, isAlive }) => {
  const handleFeed = () => {
    feed();
    getOlder();
  };

  const handleTreat = () => {
    treat();
  };

  const isDead = !isAlive;

  return (
    <div>
      <div>
        <button disabled={isDead || isSick} onClick={handleFeed}>
          Feed
        </button>
      </div>
      <div>
        <button disabled={isDead || !isSick} onClick={handleTreat}>
          Treat
        </button>
      </div>
    </div>
  );
};
