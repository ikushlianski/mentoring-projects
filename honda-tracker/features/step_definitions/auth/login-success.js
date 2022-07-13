const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');
const { correctCreds, loginUrl } = require('../test-data');

When('the user logs in with correct credentials', async function () {
  // the user's request does not include a sessionId cookie, i.e. they log in for the first time and don't have a previously created session
  const response = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      Cookie: this.sessionCookie || '',
    },
    body: JSON.stringify({
      ...correctCreds,
    }),
  });

  console.log(
    "response.headers.get('Set-Cookie')",
    response.headers.get('Set-Cookie'),
  );

  console.log('response.headers', response.headers);

  this.cookie = response.headers.get('Set-Cookie');
  this.status = response.status;
});

Then('they get a generated session cookie', function () {
  const [key, value] = this.cookie.split('=');
  assert.strictEqual(key, 'sessionId');
  // the cookie is a uuidv4
  assert.strictEqual(value.split('-').length - 1, 4);
});

Then('they get their session cookie back', function () {
  console.log({ cookie: this.cookie });
  const [key, value] = this.cookie.split('=');
  assert.strictEqual(key, 'sessionId');
  assert.strictEqual(value, correctCreds.sessionId);
});

Then('login is successful', function () {
  assert.strictEqual(this.status, 200);
});
