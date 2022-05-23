const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hi");
  }, 1000);

  // but sometimes it rejects
  // reject(
  //   'ouch!'
  // )
});

console.log(myPromise);

// --------
myPromise.then((result) => {
  console.log(result);
});

// will run before `then`
console.log("will I run?");

// ---------

const asyncFunc = async () => {
  return await myPromise;
};

asyncFunc().then(console.log);

(async () => {
  await asyncFunc();
})();

// errors
myPromise
  .then((result) => {
    // do sth with the result
  })
  .catch(async (error) => {
    const loggingSystem = { send: async (err: Error) => {} };
    // complex logic
    const result = await loggingSystem.send(error);

    // will run after `await`
    console.log(result);
  })
  .catch(console.error);

(async () => {
  try {
    await asyncFunc();

    console.log("hi");
  } catch (e) {
    console.log(e);
  }
})();
