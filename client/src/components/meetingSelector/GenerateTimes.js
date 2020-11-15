import { DateTime } from "luxon";

function GenerateTimes() {
  // grab local time
  let today = DateTime.local();
  let day1 = today.plus({ days: 1 });
  let day2 = today.plus({ days: 2 });
  let day3 = today.plus({ days: 3 });

  // Set hours for meeting times.
  // To Do:
  // make this accessible from the outside for dynamic setting.
  function makeMeetingTimes(day) {

    let first = day.set({ hour: 9, minute: 30 });
    let second = day.set({ hour: 12, minute: 30 });
    let third = day.set({ hour: 18, minute: 0 });
    let firstString = first.toLocaleString(DateTime.TIME_SIMPLE);
    let secondString = second.toLocaleString(DateTime.TIME_SIMPLE);
    let thirdString = third.toLocaleString(DateTime.TIME_SIMPLE);
    return {
      data: [first, second, third],
      strings: [firstString, secondString, thirdString]
    };
  }

  // Get weekday string from DateTime number
  function getWeekDay(number) {
    switch (number) {
      case 1:
        return "Monday";
        break;
      case 2:
        return "Tuesday";
        break;
      case 3:
        return "Wednesday";
        break;
      case 4:
        return "Thursday";
        break;
      case 5:
        return "Friday";
        break;
      case 6:
        return "Saturday";
        break;
      case 7:
        return "Sunday";
        break;
      default:
        return "";
        break;
    }
  }

  // Get month String from DateTime number
  function getMonth(number) {
    switch (number) {
      case 1:
        return "January";
        break;
      case 2:
        return "February";
        break;
      case 3:
        return "March";
        break;
      case 4:
        return "April";
        break;
      case 5:
        return "May";
        break;
      case 6:
        return "June";
        break;
      case 7:
        return "July";
        break;
      case 8:
        return "August";
        break;
      case 9:
        return "September";
        break;
      case 10:
        return "October";
        break;
      case 11:
        return "November";
        break;
      case 12:
        return "December";
        break;
      default:
        return "";
        break;
    }
  }

  // Get abbreviated month String from DateTime
  function getShortMonth(number) {
    switch (number) {
      case 1:
        return "Jan.";
        break;
      case 2:
        return "Feb.";
        break;
      case 3:
        return "Mar.";
        break;
      case 4:
        return "Apr.";
        break;
      case 5:
        return "May";
        break;
      case 6:
        return "June";
        break;
      case 7:
        return "July";
        break;
      case 8:
        return "Aug.";
        break;
      case 9:
        return "Sept.";
        break;
      case 10:
        return "Oct.";
        break;
      case 11:
        return "Nov.";
        break;
      case 12:
        return "Dec.";
        break;
      default:
        return "";
        break;
    }
  }

  // Set date number to String for DOM use.
  function getDate(number) {
    return number + "";
  }
  // return object with 1st, 2nd and 3rd days objects
  return {
    first: {
      name:
        getWeekDay(day1.weekday) +
        ", " +
        getMonth(day1.month) +
        " " +
        getDate(day1.day),
      shortName:
        getWeekDay(day1.weekday) +
        ", " +
        getShortMonth(day1.month) +
        " " +
        getDate(day1.day),
      day: day1,
      times: makeMeetingTimes(day1)
    },
    second: {
      name:
        getWeekDay(day2.weekday) +
        ", " +
        getMonth(day2.month) +
        " " +
        getDate(day2.day),
      shortName:
        getWeekDay(day2.weekday) +
        ", " +
        getShortMonth(day2.month) +
        " " +
        getDate(day2.day),
      day: day2,
      times: makeMeetingTimes(day2)
    },
    third: {
      name:
        getWeekDay(day3.weekday) +
        ", " +
        getMonth(day3.month) +
        " " +
        getDate(day3.day),
      shortName:
        getWeekDay(day3.weekday) +
        ", " +
        getShortMonth(day3.month) +
        " " +
        getDate(day3.day),
      day: day3,
      times: makeMeetingTimes(day3)
    }
  };
}

export default GenerateTimes;
