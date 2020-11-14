const { google } = require("googleapis");
const daily = require("./Daily");

// OAUTH to connect to our NeuronConnector google calendar.
const oAuth2Client = new google.auth.OAuth2(
  "963904079530-r3e6revucftfm8v80pkurk9cme59b797.apps.googleusercontent.com",
  "LrMuJ3-pvT1olCzZ4BjeNdGk"
);
oAuth2Client.setCredentials({
  refresh_token:
    "1//04KSjJH9uQlwsCgYIARAAGAQSNwF-L9IrZXD-3rB0Zpk5-8HofCAfOYDF0OHYnkCl-7kOVgfxg6qODKJ1Ed4Nr-8LiqxwLla4VHU"
});

// Grab our calendar
const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

// Create Calendar Event
// Add a link to the google API documentaton for the parameters here.
const createCalendarEvent = function(eventData) {
  console.log(eventData.videoID);

  // pass in NBF and EXP to limit entry and exit time from rooms
  // Take eventData.dtStart and dtEnd and convert to correct form to pass to
  // daily co then pass em.
  const videoLink = daily.createRoom(eventData).then(res => {
    console.log("video link", res);
    const event = {
      // NEED to PASS in OUR own LINK here.
      summary: "Neuron Live Discussion",
      // Will need to edit localhost at some point
      description:
        "Meeting Link: " +
        "http://localhost:3000/chat/" +
        `${res.name}` +
        "\n" +
        "\n" +
        "Check out the meeting guidelines before you’re scheduled to meet. If you need to reschedule, email your partner and adjust this calendar item. Go forth, learn, and have fun!",
      start: {
        dateTime: eventData.dtStart
      },
      end: {
        dateTime: eventData.dtEnd
      },

      attendees: [{ email: eventData.email1 }, { email: eventData.email2 }],
      colorId: 1
    };
    // send event to google calendar

    calendar.events.insert(
      {
        auth: oAuth2Client,
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
        sendNotifications: true
      },
      (err, event) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Event created: %s", event.htmlLink);
      }
    );
    return "hi";
  });

  // return apiHelper("post", "/rooms");

  // let room = "";
  // let videoLink = daily.createRoom().then(res => console.log("hi", res));
  // console.log("video link", videoLink);
  // MOVE TO FETHC
  // https://docs.daily.co/reference#create-room

  // trim end from videoLink, added it to OUR base URL aka localhost:3000/chat/{linkID}

  // email1, email2, dtStart, dtEnd, timeZone, description;
  // const event = {
  //   // Allows conference data support
  //   conferenceDataVersion: 1,

  //   // NEED to PASS in OUR own LINK here.
  //   summary: "Neuron Live Discussion",
  //   description:
  //     "Check out the meeting guidelines before you’re scheduled to meet. If you need to reschedule, email your partner and adjust this calendar item. Go forth, learn, and have fun!" + "test" + `${res.name}`,
  //   start: {
  //     dateTime: eventData.dtStart
  //   },
  //   end: {
  //     dateTime: eventData.dtEnd
  //   },

  //   attendees: [{ email: eventData.email1 }, { email: eventData.email2 }],
  //   colorId: 1,
  //   conferenceData: {
  //     createRequest: {
  //       requestId: eventData.email1 + eventData.email2 + "",
  //       conferenceSolutionKey: {
  //         type: "hangoutsMeet"
  //       }
  //     },
  //     entryPoints: [
  //       {
  //         entryPointType: "video",
  //         accessCode: "123"
  //       }
  //     ]
  //   }
  // };
  // // send event to google calendar

  // calendar.events.insert(
  //   {
  //     auth: oAuth2Client,
  //     calendarId: "primary",
  //     resource: event,
  //     conferenceDataVersion: 1,
  //     sendNotifications: true
  //   },
  //   (err, event) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log("Event created: %s", event.htmlLink);
  //   }
  // );
  // return "hi";
};

module.exports = {
  createCalendarEvent
};
