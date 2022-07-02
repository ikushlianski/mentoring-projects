import { APIGatewayEvent } from "aws-lambda";

exports.handler = async function (event: APIGatewayEvent) {
  return {
    statusCode: 200,
    body: "single booking will be returned",
  };
};
