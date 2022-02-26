import React from "react";
import "./RuleBar.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
// import TimeRangePicker from "./dist/TimeRangePicker";
import { GithubPicker } from "react-color";
import ReactHowler from "react-howler";
import Localbase from "localbase";

// let db = new Localbase("db");

// db.collection('rules').add({

// })

class RuleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      time: ["00:00", "00:00"],
      contentDisplay: "none",
      colour: "",
      audio: this.props.audio,
      playing: false,
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidUpdate() {
    console.log("active: " + this.state.active);
    console.log("time range: " + this.state.time);
    console.log(
      "colour: " + this.state.colour + "   " + typeof this.state.colour
    );
    console.log("audio file:" + this.state.audio);
  }

  handlePlay() {
    this.setState({
      playing: true,
    });
  }

  handleTimeChange = async (time) => {
    await this.setState({ time: time });
    await console.log(this.state.time);
  };

  // handleCheckbox() {
  //   this.setState({
  //     active: true,
  //   });
  //   console.log(this.state.active);
  // }

  handleCheckbox = async () => {
    if (!this.state.active) {
      await this.setState({ active: true });
    } else if (this.state.active) {
      await this.setState({ active: false });
    }
    await console.log(this.state.active);
  };

  handlePause() {
    this.setState({
      playing: false,
    });
  }

  displayContent = () => {
    if (this.state.contentDisplay === "none") {
      this.setState({
        contentDisplay: "block",
      });
    } else {
      this.setState({
        contentDisplay: "none",
      });
    }
  };

  // handleChangeComplete = (colour) => {
  //   this.setState({ colour: colour.hex });
  // };

  handleChangeComplete = async (colour) => {
    await this.setState({ colour: colour.hex });
    await console.log(this.state.colour);
  };

  endAudio = () => {
    this.setState({ playing: false });
  };

  render() {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <div className=" item form-check">
              <input
                className="form-check-input"
                defaultChecked={this.state.active}
                type="checkbox"
                onChange={this.handleCheckbox}
                value=""
                id="flexCheckDefault"
              />
            </div>

            <div className="item date">
              <TimeRangePicker
                value={this.state.time}
                onChange={this.handleTimeChange}
              />
            </div>
            <div className="item event-trigger">
              <p>{this.props.trigger}</p>
            </div>
            {/* <div className="item audio-btn">
              <Button>Audio</Button>
            </div> */}
            <div className="item more-btn">
              <Button onClick={this.displayContent}>Expand</Button>
            </div>
            <div
              className="extra-content"
              style={{ display: this.state.contentDisplay }}
            >
              <div className="item record-controls">
                <ReactHowler
                  src={this.state.audio}
                  playing={this.state.playing}
                  onEnd={this.endAudio}
                />
                <button onClick={this.handlePause}>Pause</button>
                <button onClick={this.handlePlay}>Play</button>
              </div>
              <div className="colour-picker">
                <GithubPicker
                  color={this.state.colour}
                  onChangeComplete={this.handleChangeComplete}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RuleBar;
