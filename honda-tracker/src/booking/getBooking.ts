exports.handler = async function (event: any) {
  console.log("request:", JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Get booking will be implemented here`,
  };
};
