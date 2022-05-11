// withBorder.js
import React from "react";

export const Button = () => {
  return <button disabled>text</button>;
};

const withBorder = (Component, color) => {
  return <Component style={{ border: `1px solid ${color}` }} />;
};

const WithLogging = (props) => {
  console.log(`I logged ${props.children}`);

  return props.children;
};

export const BlueBorderButton = withBorder(Button, "blue");

// some other file
export const SomePage = () => {
  return (
    <div>
      <Button>Text</Button>
      <BlueBorderButton />
      <WithLogging>
        <p>Hey!</p>
        <Button>text</Button>
      </WithLogging>
    </div>
  );
};
