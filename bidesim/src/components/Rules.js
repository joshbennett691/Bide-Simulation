import React from "react";
import "./Rules.css";
import RuleBar from "./RuleBar";
import TestAudioOne from "./Audio/test_1.mp3";
import TestAudioTwo from "./Audio/test_2.mp3";
import TestAudioThree from "./Audio/test_3.mp3";
import TestAudioFour from "./Audio/test_4.mp3";
import TestAudioFive from "./Audio/test_5.mp3";

class Rules extends React.Component {
  state = {};

  render() {
    return (
      <>
        <h1>Rules</h1>
        <div className="flex-container">
          <RuleBar trigger="Movement" audio={TestAudioOne} />
          <RuleBar trigger="Movement" audio={TestAudioTwo} />
          <RuleBar trigger="Hand Wave" audio={TestAudioThree} />
          <RuleBar trigger="Movement" audio={TestAudioFour} />
          <RuleBar trigger="Movement" audio={TestAudioFive} />
        </div>
      </>
    );
  }
}

export default Rules;
