import React, { useEffect, useState } from "react";

export const Form = ({ name, password, ...props }) => {
  return (
    <div>
      <label htmlFor="id1">
        Name
        <input id={"id1"} type="text" value={name} />
      </label>

      <label htmlFor="id2">
        Password
        <input
          id={"id2"}
          type="password"
          value={password}
          style={{ background: props.color || "red" }}
        />
      </label>
    </div>
  );
};

export const Page = () => {
  return (
    <FetchDataForFormOnMyPage
      displayed={true}
      render={({ password, loggedIn, name }) => {
        const color = loggedIn ? "blue" : "green";

        return (
          loggedIn && <Form name={name} password={password} color={color} />
        );
      }}
    />
  );
};

// you could create a separate component for fetching data and immediately rendering the result

export const FetchDataAndRenderForm = () => {
  const [loggedIn, setLoggedIn] = useState();
  const [name, setname] = useState();
  const [password, setpassword] = useState();

  // fetch your data
  useEffect(() => {
    // fetch ...
  }, []);

  // render based on data
  return <Form password={password} name={name} />;
};

// But we could separate data fetching and rendering into different components

// This component only fetches data and exposes a `render` method (could be named however you want)
export const FetchDataForFormOnMyPage = ({ render }) => {
  const [loggedIn, setLoggedIn] = useState();
  const [name, setname] = useState();
  const [password, setpassword] = useState();

  // fetch your data
  useEffect(() => {
    // const response = fetch ...
  }, []);

  return render({
    loggedIn,
    name,
    password,
  });
};
