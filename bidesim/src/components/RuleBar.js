import React, { useState, useEffect, useRef } from "react";
import "./RuleBar.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import { Button } from "@mui/material";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
// import TimeRangePicker from "./dist/TimeRangePicker";
import { GithubPicker } from "react-color";
import ReactHowler from "react-howler";
import Localbase from "localbase";
import Dropdown from "react-bootstrap/Dropdown";
import { ReactAudioRecorder } from "@sarafhbk/react-audio-recorder";
import TestAudioOne from "./Audio/test_1.mp3";
import TestAudioTwo from "./Audio/test_2.mp3";
import TestAudioThree from "./Audio/test_3.mp3";
import TestAudioFour from "./Audio/test_4.mp3";
import TestAudioFive from "./Audio/test_5.mp3";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import { AudioPlayerProvider } from "react-use-audio-player";
import AudioPlayer from "./AudioPlayer";
import Button from "react-bootstrap/esm/Button";
import Dexie from "dexie";
import { get, set } from "idb-keyval";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import { ArrowDownCircleFill, ArrowUpCircleFill } from "react-bootstrap-icons";

// let blob = {};
//     let chunks = [];
//     let duration = {};
//     let url = "";

const RuleBar = () => {
  const audioCtx = new AudioContext();
  let buffer = null;
  const audioRef = useRef();
  const [active, setActive] = useState(false);
  const [blob, setBlob] = useState({});
  const [chunks, setChunks] = useState([]);
  const [duration, setDuration] = useState({});
  const [url, setUrl] = useState("");
  const [time, setTime] = useState(["02:00", "05:00"]);
  const [expand, setExpand] = useState("fas fa-caret-down");
  const [theAudio, setTheAudio] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [contentDisplay, setContentDisplay] = useState("none");
  const [colour, setColour] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [document, setDocument] = useState(false);
  const [audio, setAudio] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: null,
      m: null,
      s: null,
    },
  });
  const [playing, setPlaying] = useState(false);
  const [trigger, setTrigger] = useState("Movement");
  const [effect, setEffect] = useState("");
  const [colourDisplay, setColourDisplay] = useState("block");
  const [audioDetails, setAudioDetails] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: null,
      m: null,
      s: null,
    },
  });

  let db = new Localbase("db");

  useEffect(() => {
    initializeDB();
    const getActive = localStorage.getItem("active");
    const getTime = localStorage.getItem("time");
    const getCheckboxValue = localStorage.getItem("checkboxValue");
    // const getContentDisplay = localStorage.getItem("contentDisplay");
    const getColour = localStorage.getItem("colour");
    const getAudio = localStorage.getItem("audio");
    const getPlaying = localStorage.getItem("playing");
    const getTrigger = localStorage.getItem("trigger");
    const getEffect = localStorage.getItem("effect");
    const getColourDisplay = localStorage.getItem("colourDisplay");
    const getDocument = localStorage.getItem("document");

    if (getActive) {
      setActive(JSON.parse(getActive));
    }
    if (getTime) {
      setTime(JSON.parse(getTime));
    }
    // if (getContentDisplay) {
    //   setContentDisplay(JSON.parse(getContentDisplay));
    // }
    if (getColour) {
      setColour(JSON.parse(getColour));
    }
    if (getAudio) {
      setAudio(JSON.parse(getAudio));
    }
    if (getPlaying) {
      setPlaying(JSON.parse(getPlaying));
    }
    if (getTrigger) {
      setTrigger(JSON.parse(getTrigger));
    }
    if (getEffect) {
      setEffect(JSON.parse(getEffect));
    }
    if (getColourDisplay) {
      setColourDisplay(JSON.parse(getColourDisplay));
    }
    if (getCheckboxValue) {
      setCheckboxValue(JSON.parse(getCheckboxValue));
    }
    if (getDocument) {
      setCheckboxValue(JSON.parse(getDocument));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("active", JSON.stringify(active));
    localStorage.setItem("time", JSON.stringify(time));
    localStorage.setItem("contentDisplay", JSON.stringify(contentDisplay));
    localStorage.setItem("checkboxValue", JSON.stringify(checkboxValue));
    localStorage.setItem("colour", JSON.stringify(colour));
    localStorage.setItem("audio", JSON.stringify(audio));
    localStorage.setItem("playing", JSON.stringify(playing));
    localStorage.setItem("trigger", JSON.stringify(trigger));
    localStorage.setItem("effect", JSON.stringify(effect));
    localStorage.setItem("colourDisplay", JSON.stringify(colourDisplay));
    localStorage.setItem("document", JSON.stringify(document));
  });

  useEffect(() => {
    db.collection("audio")
      .doc({ id: "audio1" })
      .get()
      .then((document) => {
        console.log(document.audio);
        setTheAudio(document.audio);
        setIsLoading(false);
      });
  }, [theAudio]);

  const handleAudioStop = async (data) => {
    setAudioDetails(data);
  };

  const handleAudioUpload = async (file) => {};

  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: null,
        m: null,
        s: null,
      },
    };
    setAudioDetails(reset);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const handleCheckbox = () => {
    if (!active) {
      setActive(true);
    } else if (active) {
      setActive(false);
    }
  };

  const changeTriggerToMovement = () => {
    setTrigger("Movement");
  };

  const changeTriggerToHandWave = () => {
    setTrigger("Hand Wave");
  };

  const changeTriggerToSound = () => {
    setTrigger("Sound");
  };

  const changeEffectToSolid = () => {
    setEffect("Solid");
    setColourDisplay("block");
  };

  const changeEffectToSlowFlash = () => {
    setEffect("Slow Flash");
    setColourDisplay("block");
  };

  const changeEffectToTrafficLight = () => {
    setEffect("Traffic Light");
    setColourDisplay("none");
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const displayContent = () => {
    if (contentDisplay === "none") {
      setContentDisplay("block");
      setExpand("fas fa-caret-up");
    } else {
      setContentDisplay("none");
      setExpand("fas fa-caret-down");
    }
  };

  const displayColourContent = () => {
    if (effect === "Traffic Light") {
      setColourDisplay("none");
    } else {
      setColourDisplay("block");
    }
  };

  const handleChangeComplete = (colour) => {
    setColour(colour);
  };

  const endAudio = () => {
    setPlaying(false);
  };

  //AUDIO STUFF
  let recorder;

  const startRecording = () => {
    recorder.startRecording();
  };

  const updateSound = (src) => {
    setAudio(src);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const stopRecording = () => {
    recorder.stopRecording(() => {
      let blob = recorder.getBlob();
      // invokeSaveAsDialog(blob);this is a tst to see how good it works and how long the audio can keep recording for
      blobToBase64(blob);
      // updateSound();
      db.collection("audio")
        .doc({ id: "audio1" })
        .get()
        .then((document) => {
          console.log(document.audio);
          updateSound(document.audio);
          window.location.reload();
        });
    });
  };

  const getAudio = () => {
    db.collection("audio")
      .doc({ id: "audio1" })
      .get()
      .then((document) => {
        return document.audio;
      });
  };

  const microphoneRecorder = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then(async function (stream) {
        recorder = RecordRTC(stream, {
          type: "audio",
        });
      });
  };

  const blobToBase64 = (blob) => {
    var reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      let base64data = reader.result;
      db.collection("audio").doc({ id: "audio1" }).update({
        audio: base64data,
      });
    };
  };


  const initializeDB = () => {
    db.collection("audio")
      .get()
      .then((audioData) => {
        if (audioData.length === 0) {
          db.collection("audio").add({
            id: "audio1",
            audio: "",
          });
        } else {
        }
      });
  };


  if (isLoading) {
    return <div>Rule is loading</div>;
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="checkbox-item form-check">
            <input
              className="form-check-input"
              checked={active}
              type="checkbox"
              onChange={handleCheckbox}
              id="flexCheckDefault"
            />
          </div>

          <div className="item date">
            <TimeRangePicker onChange={handleTimeChange} value={time} />
          </div>
          <div className="item event-trigger">
            <h6>{trigger}</h6>
          </div>
          <div className="item audio-btn">
            {/* <Button>Audio</Button> */}
            {/* <AudioPlayerProvider>
              <AudioPlayer file={audioDetails.url} />
            </AudioPlayerProvider> */}
            <audio controls ref={audioRef}>
              <source src={theAudio}></source>
            </audio>
          </div>
          <div className="item more-btn">
            <Button onClick={displayContent}>
              <i class={expand}></i>
            </Button>
          </div>
          <div
            className="extra-content flex-container"
            style={{ display: contentDisplay }}
          >
            <div className="audio-controls flex-item">
              {/* <Recorder
                record={true}
                audioURL={audioDetails.url}
                handleAudioStop={(data) => handleAudioStop(data)}
                handleAudioUpload={(data) => handleAudioUpload(data)}
                handleReset={() => handleReset()}
                uploadButtonDisabled={true}
                mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
              /> */}
              {/* <ReactHowler
                  src={this.state.audio}
                  playing={this.state.playing}
                  onEnd={this.endAudio}
                /> */}
              {/* <form>
                  <input type="file" name="file" />
                  <button>File Sumbit</button>
                </form> */}
              {/* <button onClick={this.handlePause}>Pause</button>
                <button onClick={this.handlePlay}>Play</button> */}
              <Button onClick={microphoneRecorder}>
                <i class="fas fa-microphone"></i> Allow Mic
              </Button>
              <Button onClick={startRecording}>
                <i class="fas fa-circle"></i> Start Recording
              </Button>
              <Button onClick={stopRecording}>
                {" "}
                <i class="fas fa-stop"></i> Stop Recording
              </Button>
            </div>

            <div className="trigger-event right-item">
              <Dropdown>
                <Dropdown.Toggle variant="Primary" id="dropdown-basic">
                  Trigger Choice
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={changeTriggerToMovement}>
                    Movement
                  </Dropdown.Item>
                  <Dropdown.Item onClick={changeTriggerToHandWave}>
                    Hand Wave
                  </Dropdown.Item>
                  <Dropdown.Item onClick={changeTriggerToSound}>
                    Sound
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="colour-picker " style={{ display: colourDisplay }}>
              <GithubPicker
                color={colour}
                onChangeComplete={handleChangeComplete}
              />
            </div>
            <div className="effect-event right-item">
              <Dropdown>
                <Dropdown.Toggle variant="Primary" id="dropdown-basic">
                  Colour Effect
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={changeEffectToSolid}>
                    Solid
                  </Dropdown.Item>
                  <Dropdown.Item onClick={changeEffectToSlowFlash}>
                    Slow Flashing
                  </Dropdown.Item>
                  <Dropdown.Item onClick={changeEffectToTrafficLight}>
                    Traffic Light
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RuleBar;
