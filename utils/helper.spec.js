import { Certificate } from "crypto";
import { takeCoverage } from "v8";

const { test, expect } = require("@playwright/test");

function getCurrrentDateTimeStamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = (now.getDay() + 1).toString().padStart(2, "0");
  const hours = (now.getHours() + 1).toString().padStart(2, "0");

  return `${year}-${month}-${day}-${hours}`;
}
async function authenticateUser1({ request }) {
  try {
    const apiUrl = await "https://thinking-tester-contact-list.herokuapp.com/";
    const headers = { "Content-Type": "application/json" };
    const response = await request.post(apiUrl + "users/login/", {
      headers,
      data: {
        email: "rijen@gmail.com",
        password: "rijen123",
      },
    });
    const statusCode = response.status();
    if (statusCode !== 200) {
      console.error(`Unexpected status code: ${statusCode}`);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
      throw new Error("Authentication failed");
    }
    const responseBody = await response.json();
    console.log("Authentication successful. Response body:", responseBody);
    return responseBody.token;
  } catch (error) {
    console.error("Error during authentication", error.message);
    throw error;
  }
}

async function createEntity(userData, accessToken, module, { request }) {
  const apiUrl = "https://thinking-tester-contact-list.herokuapp.com/";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: "Bearer " + accessToken,
    //stg: "Automation",
  };
  const response = await request.post(apiUrl + module, {
    headers,
    data: JSON.stringify(userData),
  });
  const responseBody = await response.json();
  const statusCode = response.status();
  expect(statusCode).toBe(201);

  if (responseBody && responseBody.id) {
    return responseBody.id;
  } else {
    return null;
  }
}

module.exports = { createEntity, authenticateUser1 };
