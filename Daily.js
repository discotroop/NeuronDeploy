const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

// MAKE SURE YOU HAVE ADDED YOUR API KEY IN THE .env file
const BASE_URL = "https://api.daily.co/v1/";
// const API_AUTH = process.env.DAILY_API_KEY;

// create an axios instance that includes the BASE_URL and your auth token
// this may be useful to put in an external file to it can be referenced
// elsewhere once your application grows
const apiDaily = axios.create({
  baseURL: BASE_URL,
  // timeout: 5000,
  headers: {
    Authorization: `Bearer a4e7868ee8548e4fb5137d444f8d6fa0cc2b0b64bd5610e000651fd97e547544`
  }
});

const fetch = require("node-fetch");

let url = "https://api.daily.co/v1/rooms";

function createRoom(eventData) {
  // Add body with parameter to create automatic room deletion
  // The above can be done with 'exp' thing from daily co, once the room is expired, dailyco auto cleans it.
  // https://docs.daily.co/reference#delete-room
  // async
  // https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

  // Set Time Data to Seconds and add/subtract five minutes.
  let start = new Date(eventData.dtStart);
  let end = new Date(eventData.dtEnd);
  let startSeconds = start.getTime() / 1000 - 300;
  let endSeconds = end.getTime() / 1000 + 300;
  console.log(startSeconds, endSeconds);

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer a4e7868ee8548e4fb5137d444f8d6fa0cc2b0b64bd5610e000651fd97e547544"
    },
    body: `{"properties":{"nbf":${startSeconds},"exp":${endSeconds}}}`
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return json;
    })
    .catch(err => console.error("error:" + err));

  // return apiHelper("post", "/rooms");
}

// this shorter version seems to work too, needs error handling
const apiHelper = (method, endpoint, body = {}) => {
  const response = apiDaily.request({
    url: endpoint,
    method: method,
    data: body
  });
  console.log(response.data);
  return response.data;
};


module.exports = {
  createRoom
};
