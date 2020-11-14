import React from "react";

class Graphic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "How it Works?",
      display: "collapse",
      headerStyle: "",
      cardStyle: "",
      border: ""
    };
  }
  // To Do
  // fix graphics
  // add copy to body.

  // Handle Styling for expanded or collapsed how it works section.
  toggleDisplay() {
    let show = "collapse show";
    let hide = "collapse";
    let showCard = "card";
    let hideCard = "";
    let showText = "How it Works?";
    let hideText = "Collapse";
    let showBorder = "mb-0";
    let hideBorder = "";
    if (this.state.display === show) {
      this.setState({
        display: hide,
        cardStyle: hideCard,
        buttonText: showText,
        border: hideBorder
      });
    } else {
      this.setState({
        display: show,
        cardStyle: showCard,
        buttonText: hideText,
        border: showBorder
      });
    }
  }

  render() {
    return (
      <div id="accordion">
        <div className={this.state.cardStyle}>
          <div className={`m-3 ${this.state.headerStyle}`}>
            <h5 className="mb-0">
              <button
                className="btn btn-outline-primary"
                onClick={() => this.toggleDisplay()}
              >
                {this.state.buttonText}
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className={this.state.display}
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body">
              <div className="jumbotron p-0"> </div>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them
              accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Graphic;
