import React from "react";
import "./Chat.css";
import VideoCallFrame from "./VideoCallFrame";

// NEED:
/// Routing creation based on passed url.
/////- trim room id from url created in Daily on api side.
/////- pass the trimmed id to event creator.
/////  aka ourURL/video/{id}
/////- add component will mount to grab params here and past it in to video
/////  call url.

/// time constraints
///// this component needs to know time constraints
///// also links need to auto expire.

/// tokens?

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatID: "neuron-test"
    };
  }

  componentWillMount() {
    console.log("mounted");
    // Get video ID from URL
    let params = this.props.location.pathname.split("/");
    console.log("parms", params);

    // Add ELSE statement for error handling
    if (params.length === 3) {
      let ID = params.pop();
      this.setState({
        chatID: ID
      });
    }
  }

  render() {
    return (
      <div className="Chat">
        <header className="Chat-header">
          <h1> Neuron </h1>

          {/* this link needs to be dynamic */}
          <VideoCallFrame
            url={`https://neuron.daily.co/${this.state.chatID}`}
          ></VideoCallFrame>
        </header>
      </div>
    );
  }
}

export default Chat;
