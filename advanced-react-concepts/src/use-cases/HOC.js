import React, { useState } from "react";

export const HOC = ({ text, icon = false }) => {
  return (
    <div>
      {icon && <img />}
      <button>{text}</button>
    </div>
  );
};

export default withAuth(HOC);

// const LoginPage = () => {
//   const [loggedIn, setLoggedIn] = useState(false)
//
//   return (
//     <div>
//       {loggedIn && <use-cases icon={'icon'} text={'Log out'} />}
//
//     </div>
//   );
// };

export const withAuth = async (WrappedComponent) => {
  const result = fetch("/login", { method: "POST" });
  const { loggedIn } = await result.json();

  if (loggedIn) {
    return <WrappedComponent text={"Log out"} newProps={"newnew"} />;
  }

  return <WrappedComponent text={"Log in"} icon={"please log in"} />;
};
