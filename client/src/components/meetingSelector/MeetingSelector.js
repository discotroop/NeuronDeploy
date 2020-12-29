import React from "react";
import { Link } from "react-router-dom";
import MeetingDescription from "./MeetingDescription";
import TimeSelector from "./TimeSelector";
import GenerateTimes from "./GenerateTimes";
import SubmitButton from "./SubmitButton";
import Email from "./Email";
import Errors from "./Errors";
import Graphic from "./Graphic";
import { DateTime } from "luxon";
import ReactModal from "react-modal";
import FrontendNav from "../frontend_nav/FrontendNav";

// see ../../api/apiCalls for options
import apiCalls from "../../api/apiCalls";

// Modal styles
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class MeetingSelector extends React.Component {
  constructor(props) {
    super(props);
    // tbd: edit unused items in state
    this.state = {
      apiResponse: "",
      dates: GenerateTimes(),
      email: "",
      selectedTimes: [],
      errors: "",
      displayErrors: "d-none",
      editionID: "",
      newsletterID: "",
      articleTitle: "",
      newsletterTitle: "",
      showModal: false
    };

    // bind handler functions so `this` works when passed to other components
    this.submitHandler = this.submitHandler.bind(this);
    this.timeSelectorHandler = this.timeSelectorHandler.bind(this);
    this.emailInputHandler = this.emailInputHandler.bind(this);
    this.dismissErrors = this.dismissErrors.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  // Placeholder Functions to clean up passed params depending on newsletter provider
  cleanEmailParam(string) {
    // do something to the string based on format
    console.log("cleaning email", string);
    if (this.validateEmail(string) === true) {
      return string;
    } else {
      return false;
    }
  }
  cleanEditionParam(string) {
    // do something to the string based on format
    console.log("cleaning edition", string);
    return string;
  }
  cleanArticleParam(string) {
    // do something to the string based on format
    console.log("cleaning article", string);
    return string;
  }

  // handle calling api
  ///// TO DO
  ///// CLEAN THIS MESS UP INTO SOMETHING MORE READABLE AND CLEAN
  fetchDataFromAPI() {
    // Get location string.
    let location = this.props.location.pathname;
    let params = this.props.location.pathname.split("/");
    // clear empty string from params array.

    // set base url to handle matching problem?
    let base = params[0];
    console.log(base);
    params = params.slice(1);

    ///// EMAIL /////
    // Check if last item is an email address and toggle email input
    // based upon results
    let emailParam = this.cleanEmailParam(params[params.length - 1]);
    // If not an email display email input and set email string to empty
    if (emailParam === false) {
      this.setState({ email: "", toggleEmail: "display?" });
      // Else hide email input and set email to passed param
    } else {
      this.setState({ email: emailParam, toggleEmail: "d-none" });
    }
    if (params[2] === "flatly.css") {
      console.log("why");
    }

    ///// NEWSLETTER ////
    // Check for newsletter/edition/article/email pattern
    // By looking for /select/
    if (params[0] !== "select") {
      // We don't need to 'clean' newsletter param because we build that
      // for the client as the base of their URL so it is static.
      let newsletterParam = params[0];
      apiCalls
        // Call newsletter by URL
        .getNewsletterByURL(newsletterParam)
        .then(res => {
          console.log(res);
          // Save newsletter if found
          this.setState({
            preNewsletter: res.data.data
          });
          console.log("pre", this.state.preNewsletter);
        })
        // Do error handling if newsletter not found
        .catch(error => {
          console.log("ERROR: invalid newsletter title", error);
        });

      ///// EDITION /////
      // clean/sanitize edition param
      let editionParam = this.cleanEditionParam(params[1]);

      apiCalls
        // Call newsletter by URL
        .getEditionByURL(editionParam)
        .then(res => {
          console.log(res);
          // Save newsletter if found
          this.setState({
            preEdition: res.data.data[0]
          });
        })
        // save edition if edition not found.
        .catch(error => {
          console.log("ERROR: create Edition!", error);
          this.setState({
            unfoundEdition: params[1]
          });
        });

      ///// ARTICLE /////
      // clean/sanitize article param
      let articleParam = this.cleanArticleParam(params[2]);
      apiCalls
        .getArticleShort(articleParam)
        .then(res => {
          if (res.data.data.length > 0) {
            this.setState({
              apiResponse: res.data.data[0]
            });
          } else {
            ///// THESE ARE THE CALLS TO GENERATE ARTICLE ON THE FLY
            ///// THIS IS NEEDED FOR CASES WHERE THE NEWSLETTER
            ///// PASTES IN THEIR OWN PARAMETERS
            apiCalls
              .addEdition({
                title: params[1],
                newsletter_URL: this.state.preNewsletter.newsletter_URL,
                newsletter_id: this.state.preNewsletter._id
              })
              .then(res => {
                this.setState({
                  edition_id: res.data.id,
                  edition_URL: res.data.edition.edition_URL,
                  editionTitle: res.data.edition.title
                });
              })
              .then(() => {
                apiCalls
                  .addArticle({
                    title: params[2],
                    edition_URL: this.state.edition_URL,
                    edition_title: this.state.editionTitle,
                    edition_id: this.state.edition_id,
                    newsletter_URL: this.state.preNewsletter.newsletter_URL,
                    newsletter_id: this.state.preNewsletter._id,
                    newsletter_title: this.state.preNewsletter.title
                  })
                  .then(res => {
                    console.log(res.data.article);
                  });
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // fetch data from api based on custom URL aka the old way
      console.log(`../../../api${location}`);
      fetch(`../../../api${location}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            apiResponse: res.data[0]
          });
          console.log("response", this.state.apiResponse);
        });
    }
  }

  // Live data from API
  getData() {
    this.fetchDataFromAPI();
    this.setState({
      selectedTimes: [],
      errors: "",
      displayErrors: "d-none"
    });
  }
  // check API before mounting component.
  componentWillMount() {
    this.getData();
  }

  // Rename this function or break out smaller parts
  postTimesToAPI(results, articleID) {
    let unMatched = [];
    // Get users selected times
    results.selectedTimes.forEach(time => {
      // Set meeting ends based on users selected times
      let dtEnd = time.data.plus({ minutes: 30 });

      // collect an array of time objects
      unMatched.push({
        start: time.data,
        end: dtEnd,
        day: time.day,
        timeSlot: time.timeSlot,
        email: results.email,
        isMatched: false,
        matchedEmail: ""
      });
    });
    // this pushes the new times too the article which will check
    // them and either match them or place them in the unmatched array
    // see api/controllers/articleController to see logic.
    console.log("article id", articleID);
    apiCalls.updateArticleById(articleID, { unMatched });

    // reset selected times to nil.
    this.setState({ selectedTimes: [] });

    // Open modal on success.
    this.handleOpenModal();
  }

  // Check to avoid email redundancy
  checkForUserEmail(results) {
    // check if user email is in dbs
    // TO DO function calls based on what emerges
    apiCalls.checkUserByEmail(results.email).then(results => {
      if (results.data.data === "new user") {
        console.log("build new user");
      } else {
        console.log("update old user");
      }
    });
  }

  // Handle validation and submit on submit click
  // Need to add redirect on completion!
  submitHandler() {
    // grab newsletter, email and selected times
    let results = {
      Article_title: this.state.apiResponse.title,
      Article_id: this.state.apiResponse._id,
      email: this.state.email,
      selectedTimes: this.state.selectedTimes
    };
    // check for >= 2 times selected
    if (this.state.selectedTimes.length < 2) {
      let errorMessage = "Please select two or more time slots";
      this.setState({ errors: errorMessage, displayErrors: "d-inline-block" });

      // check for valid email format
    } else if (this.validateEmail(this.state.email) === false) {
      let errorMessage = "Please enter a Valid Email Address";
      this.setState({ errors: errorMessage, displayErrors: "d-inline-block" });

      // If time selection and email valid than send results
    } else {
      console.log("results", results);
      this.checkForUserEmail(results);
      console.log(this.state.apiResponse._id);
      this.postTimesToAPI(results, this.state.apiResponse._id);
    }
  }

  // Handle clearing and dismissing Errors from submitHandler
  dismissErrors() {
    let newErrors = [];
    this.setState({
      errors: newErrors,
      displayErrors: "d-none"
    });
  }

  // Handle tracking what times are selected
  timeSelectorHandler(data, timeSlot, dayNumber) {
    // Newly selected time
    let clickedTime = { data: data, timeSlot: timeSlot, day: dayNumber };
    // Previously selected times
    let previous = this.state.selectedTimes;
    // Check if clickedTime has been previously selected
    // If clickedTime is previously selected remove clickedTime.
    let checkForRedundancy = previous.filter(function(item) {
      return item !== clickedTime;
    });
    // Remove previously selected clickedTime
    if (checkForRedundancy.length !== previous.length) {
      this.setState({ selectedTimes: checkForRedundancy });

      // Otherwise add clickedTime to selected times.
    } else {
      previous.push(clickedTime);
      this.setState({ selectedTimes: previous });
    }
  }

  // Email input handling and validation
  validateEmail(email) {
    // Regex Ripped from stack overflow
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Returns true for match false for none match.
    return pattern.test(email);
  }
  // Takes string passed from Email.js and sets it to this.state.email
  emailInputHandler(string) {
    this.setState({ email: string });
  }
  // Toggle modal on.
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  // Toggle modal off.
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  // Send Everything to the DOM and pass relevant elements to other components
  render() {
    return (
      <div className="news-container">
        <FrontendNav />
        <div className="row mx-auto bottom_buffer">
          <div className="col-md-10 m-auto center-block">
            <div className="card card-body text-center">
              <MeetingDescription
                articleName={this.state.apiResponse.title}
                newsletter={this.state.apiResponse.newsletter_title}
                edition={this.state.apiResponse.edition_title}
                firstDate={this.state.dates.first.name}
                thirdDate={this.state.dates.third.name}
              />

              <div>
                <ReactModal
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example"
                  style={customModalStyles}
                >
                  <div className="text-center">
                    <h4> Success! </h4>
                    <p> Keep an eye on your inbox! </p>
                    <Link to="/faq#introduction" className="btn btn-primary">
                      {" "}
                      Ok, great!{" "}
                    </Link>
                  </div>
                </ReactModal>
              </div>

              <TimeSelector className="text-left"
                dates={this.state.dates}
                timeHandler={this.timeSelectorHandler}
                dismiss={this.dismissErrors}
              />
              <Errors
                errors={this.state.errors}
                display={this.state.displayErrors}
                dismiss={this.dismissErrors}
              />
              <SubmitButton
                submit={this.submitHandler}
                input={this.emailInputHandler}
                dismiss={this.dismissErrors}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MeetingSelector;
