import React from "react";
import { Link } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import Email from "./Email";
import Errors from "./Errors";
import Graphic from "./Graphic";
import { BrowserRouter } from "react-router-dom";

// see ../../api/apiCalls for options
import apiCalls from "../../api/apiCalls";

class Newsletter extends React.Component {
  constructor(props) {
    super(props);
    // edit unused items in state
    this.state = {
      apiResponse: "",
      email: "",
      selectedTimes: [],
      errors: "",
      displayErrors: "d-none",
      editionID: "",
      newsletterID: "",
      articleID: "",
      articleTitle: "",
      newsletterTitle: "",
      articleCount: 3
    };
    // Bind handlers so 'this' works when passed down.
    this.submitHandler = this.submitHandler.bind(this);
    this.dismissErrors = this.dismissErrors.bind(this);
  }
  submitHandler() {
    console.log("handled");
    apiCalls
      .addNewsletter({ title: this.state.newNewsletter })
      .then(res => {
        console.log(res);
        this.setState({
          newsletterTitle: res.data.newsletter.title,
          newsletter_URL: res.data.newsletter.newsletter_URL,
          newsletter_id: res.data.id
        });
        console.log(this.state);
      })
      .then(res => {
        apiCalls
          .addEdition({
            title: this.state.newEdition,
            newsletter_URL: this.state.newsletter_URL,
            newsletter_id: this.state.newsletter_id
          })
          .then(res => {
            this.setState({
              edition_id: res.data.id,
              edition_URL: res.data.edition.edition_URL,
              editionTitle: res.data.edition.title
            });
            console.log(res);
            console.log(this.state);
          })
          .then(() => {
            apiCalls
              .addArticle({
                title: this.state.newArticle,
                edition_URL: this.state.edition_URL,
                edition_title: this.state.editionTitle,
                edition_id: this.state.edition_id,
                newsletter_title: this.state.newsletterTitle,
                newsletter_id: this.state.newsletter_id
              })
              .then(res => {
                this.setState({
                  newURL:
                    "../select/" +
                    res.data.article.article_URL
                });
                console.log(res);
              });
          });
      })
      .catch(err => console.log(err));
  }
  dismissErrors() {
    console.log("dismiss errors");
  }
  newsletterInputHandler(e) {
    this.setState({ newNewsletter: e.target.value });
  }
  editionInputHandler(e) {
    this.setState({ newEdition: e.target.value });
  }
  articleInputHandler(e) {
    this.setState({ newArticle: e.target.value });
  }
  articleCounterInputHandler(e) {
    if (e.target.value <= 10 && e.target.value >= 0) {
      this.setState({ articleCount: e.target.value });
    } else {
      this.setState({ articleCount: 10 });
    }
    console.log(this.state);
  }

  render() {
    return (
      <div className="newsletter-form-container mt-5">
        {console.log(this.props)}
        <div className="row mx-auto">
          <div className="col-md-8 m-auto center-block">
            <div className="card card-body text-center">
              <div className="text-center mx-auto"> </div>
              <h3 className="text-center mb-3 text-success"> Build Links </h3>
              <Graphic />
              <Errors
                errors={this.state.errors}
                display={this.state.displayErrors}
                dismiss={this.dismissErrors}
              />
              <div className="form-container">
                <form>
                  <div className="form-group row">
                    <label
                      for="newsletter-name"
                      className="col-sm-3 col-form-label"
                    >
                      Newsletter Title:
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control-plaintext"
                        id="newsletter-name"
                        placeholder="Ex. The New York Times"
                        onInput={e => this.newsletterInputHandler(e)}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="edition-name"
                      className="col-sm-3 col-form-label"
                    >
                      Newsletter Edition:
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control-plaintext"
                        id="edition-name"
                        placeholder="Ex. September 2020"
                        onInput={e => this.editionInputHandler(e)}
                      ></input>
                    </div>
                  </div>
                  {/* Add this later */}
                  {/* <div class="form-group row">
                    <div class="input-group">
                      <label
                        for="article-count"
                        className="col-sm-3 col-form-label"
                      >
                        {" "}
                        Article Count:{" "}
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          id="article-count"
                          class="form-control w-25"
                          max-value={10}
                          aria-label="Amount (to the nearest dollar)"
                          value={this.state.articleCount}
                          onInput={e => this.articleCounterInputHandler(e)}
                        ></input>
                        <small
                          id="emailHelp"
                          className="form-text text-muted text-left"
                        >
                          *Maximum 10
                        </small>
                      </div>
                    </div>
                  </div> */}
                  <div className="form-group row">
                    <label
                      for="edition-name"
                      className="col-sm-3 col-form-label"
                    >
                      Article Title:
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control-plaintext"
                        id="article-name"
                        placeholder="Ex. Twelth Night"
                        onInput={e => this.articleInputHandler(e)}
                      ></input>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                {" "}
                <h4> {this.state.newURL} </h4>
              </div>
              <SubmitButton
                submit={this.submitHandler}
                dismiss={this.dismissErrors}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsletter;
