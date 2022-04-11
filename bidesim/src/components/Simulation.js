import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import { AudioPlayerProvider } from "react-use-audio-player";
import AudioPlayer from "./AudioPlayer";
import { parseISO, parse, format } from "date-fns";
import { Howl, Howler } from "howler";
import { get, set } from "idb-keyval";
import DeviceWhite from "./Images/bide_display.png";
import DeviceOff from "./Images/bide_display_off.png";
import DeviceAmber from "./Images/bide_display_amber.png";
import DeviceGreen from "./Images/bide_display_green.png";
import DeviceBideGreen from "./Images/bide_display_off_green.png";
import DeviceBidePurple from "./Images/bide_display_off_purple.png";
import DeviceRed from "./Images/bide_display_red.png";
import DeviceBlue from "./Images/bide_display_blue.png";
import DeviceBrightBlue from "./Images/bide_display_bright_blue.png";
import DeviceBrightGreen from "./Images/bide_display_bright_green.png";
import DeviceBrightPurple from "./Images/bide_display_bright_purple.png";
import DeviceBrightYellow from "./Images/bide_display_bright_yellow.png";
import DeviceDarkBlue from "./Images/bide_display_dark_blue.png";
import DeviceDarkGreen from "./Images/bide_display_dark_green.png";
import DeviceLightRed from "./Images/bide_display_light_red.png";
import DeviceMintGreen from "./Images/bide_display_mint_green.png";
import DevicePeach from "./Images/bide_display_peach.png";
import DeviceVeryBrightBlue from "./Images/bide_display_very_bright_blue.png";
import DeviceYellow from "./Images/bide_display_yellow.png";
import Button from "react-bootstrap/esm/Button";
import "./Simulation.css";
import ReactHowler from "react-howler/lib/ReactHowler";
import Localbase from "localbase";
import Moment from "moment";
import { extendMoment } from "moment-range";

const Simulation = () => {
  const [currentTime, setCurrentTime] = useState("00:00");
  const [contentDisplay, setContentDisplay] = useState("none");
  const [bideState, setBideState] = useState(DeviceOff);
  const [bideSwitch, setBideSwitch] = useState(false);
  const [bideText, setBideText] = useState("On");
  const [eventBar, setEventBar] = useState("Device Off");
  const [eventBarColour, setEventBarColour] = useState("red");
  const [movement1, setMovement1] = useState(localStorage.getItem("trigger"));
  const [movement2, setMovement2] = useState(localStorage.getItem("trigger2"));
  const [movement3, setMovement3] = useState(localStorage.getItem("trigger3"));
  const [playing, setPlaying] = useState(false);
  const [theAudio, setTheAudio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [effect, setEffect] = useState(localStorage.getItem("effect"));
  const [effect2, setEffect2] = useState(localStorage.getItem("effect2"));
  const [effect3, setEffect3] = useState(localStorage.getItem("effect3"));
  const [effectLoop, setEffectLoop] = useState(false);
  const [colour1, setColour1] = useState(localStorage.getItem("colour"));
  const [colour2, setColour2] = useState(localStorage.getItem("colour2"));
  const [colour3, setColour3] = useState(localStorage.getItem("colour3"));

  const [active1, setActive1] = useState(localStorage.getItem("active"));
  const [active2, setActive2] = useState(localStorage.getItem("active2"));
  const [active3, setActive3] = useState(localStorage.getItem("active3"));
  const [ruleOneTime, setRuleOneTime] = useState(
    JSON.parse(localStorage.getItem("time"))
  );
  const [ruleTwoTime, setRuleTwoTime] = useState(
    JSON.parse(localStorage.getItem("time2"))
  );
  const [ruleThreeTime, setRuleThreeTime] = useState(
    JSON.parse(localStorage.getItem("time3"))
  );

  let db = new Localbase("db");

  useEffect(() => {
    const getActive1 = localStorage.getItem("active");
    const getActive2 = localStorage.getItem("active2");
    const getActive3 = localStorage.getItem("active3");
    const getRuleOneTime = localStorage.getItem("time");
    const getRuleTwoTime = localStorage.getItem("time2");
    const getRuleThreeTime = localStorage.getItem("time3");

    if (getActive1) {
      setActive1(JSON.parse(getActive1));
    }
    if (getActive2) {
      setActive2(JSON.parse(getActive2));
    }
    if (getActive3) {
      setActive3(JSON.parse(getActive3));
    }
    if (getRuleOneTime) {
      setRuleOneTime(JSON.parse(getRuleOneTime));
    }
    if (getRuleTwoTime) {
      setRuleTwoTime(JSON.parse(getRuleTwoTime));
    }
    if (getRuleThreeTime) {
      setRuleThreeTime(JSON.parse(getRuleThreeTime));
    }
    console.log(active1);
    console.log(active2);
    console.log(active3);
    console.log(ruleOneTime);
    console.log(ruleTwoTime);
    console.log(ruleThreeTime);
  }, []);

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

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleTimeChange = async (time) => {
    await setCurrentTime(time);
    await console.log(currentTime);
  };

  const renderActiveRuleList = (rule1, rule2, rule3) => {
    return <ul>{rule1 === true && <li>{rule1}</li>}</ul>;
  };

  const conflictHandler = (currentTime) => {
    if ((active1 && active2) || (active1 && active3) || (active2 && active3)) {
      //time 1
      const parseTimeOneStart = parse(ruleOneTime[0], "HH:mm", new Date());
      const timeStartOne = format(parseTimeOneStart, "HH:mm");
      const parseTimeOneEnd = parse(ruleOneTime[1], "HH:mm", new Date());
      const timeEndOne = format(parseTimeOneEnd, "HH:mm");

      //time 2
      const parseTimeTwoStart = parse(ruleTwoTime[0], "HH:mm", new Date());
      const timeStartTwo = format(parseTimeTwoStart, "HH:mm");
      const parseTimeTwoEnd = parse(ruleTwoTime[1], "HH:mm", new Date());
      const timeEndTwo = format(parseTimeTwoEnd, "HH:mm");

      //time 3
      const parseTimeThreeStart = parse(ruleThreeTime[0], "HH:mm", new Date());
      const timeStartThree = format(parseTimeThreeStart, "HH:mm");
      const parseTimeThreeEnd = parse(ruleThreeTime[1], "HH:mm", new Date());
      const timeEndThree = format(parseTimeThreeEnd, "HH:mm");

      let time1 = [Moment(parseTimeOneStart), Moment(parseTimeOneEnd)];
      let time2 = [Moment(parseTimeTwoStart), Moment(parseTimeTwoEnd)];
      let time3 = [Moment(parseTimeThreeStart), Moment(parseTimeThreeEnd)];

      let theCurrentTime = Moment(currentTime);

      if (theCurrentTime.isBetween(time1[0], time2[1])) {
        console.log("time is in rule 1 and rule 2 range");
      } else {
        console.log("time is not in rule 1 and rule 2 range");
      }
    }
  };

  const handleBideSwitch = async () => {
    conflictHandler();
    if (!bideSwitch) {
      await setBideState(DeviceBideGreen);
      await setEventBar("Device Booting...");
      await setEventBarColour("Orange");
      await delay(2000);
      await setBideState(DeviceBidePurple);
      await delay(2000);
      setBideSwitch(true);
      setContentDisplay("");
      setBideText("Off");
      await setBideState(DeviceWhite);
      setEventBar("Device On");
      setEventBarColour("Green");
      setPlaying(true);
    } else if (bideSwitch) {
      setBideSwitch(false);
      setContentDisplay("none");
      setBideText("On");
      await setEventBar("Device Shutting Down...");
      await setEventBarColour("Orange");
      await delay(2000);
      setBideState(DeviceOff);
      setEventBar("Device Off");
      setEventBarColour("Red");
    }
  };

  const checkForConflict = (
    timeStart1,
    timeEnd1,
    timeStart2,
    timeEnd2,
    timeStart3,
    timeEnd3
  ) => {};

  const handShake = async () => {
    if (bideState !== DeviceWhite) {
      await setBideState(DeviceWhite);
      await setEventBar("Trigger Acknowledged");
      await setEventBarColour("Green");
      await setEffectLoop(false);
      await console.log(effectLoop);
      await setIsPlaying(false);
    } else {
      await setEventBar("No Trigger to Acknowledge");
      await setEventBarColour("Red");
    }
  };

  const colourChecker = async () => {
    const colourObject = JSON.parse(colour1);
    const colourObject2 = JSON.parse(colour2);
    const colourObject3 = JSON.parse(colour3);
    console.log(effectLoop);

    console.log(colourObject.hex);
    console.log(colourObject2.hex);
    console.log(colourObject3.hex);

    console.log("rule 1 status: " + active1);
    console.log("rule 2 status: " + active2);
    console.log("rule 3 status: " + active3);
    console.log(active3 === true);

    //rule1

    console.log(JSON.parse(effect));
    if (active1 === true) {
      if (JSON.parse(effect) === "Solid") {
        if (colourObject.hex === "#b80000" || colourObject.hex === "db3e00") {
          setBideState(DeviceRed);
          console.log("red true");
          return;
        } else if (colourObject.hex === "#db3e00") {
          setBideState(DeviceAmber);
          console.log("amber true");
          return;
        } else if (colourObject.hex === "#008b02") {
          setBideState(DeviceGreen);
          console.log("green true");
          return;
        } else if (colourObject.hex === "#1273de") {
          setBideState(DeviceBlue);
          console.log("blue true");
          return;
        } else if (colourObject.hex === "#c4def6") {
          setBideState(DeviceBrightBlue);
          console.log("bright blue true");
          return;
        } else if (colourObject.hex === "#bedadc") {
          setBideState(DeviceBrightGreen);
          console.log("bright green true");
          return;
        } else if (colourObject.hex === "#d4c4fb") {
          setBideState(DeviceBrightPurple);
          console.log("bright purple true");
          return;
        } else if (colourObject.hex === "#fef3bd") {
          setBideState(DeviceBrightYellow);
          console.log("bright yellow true");
          return;
        } else if (colourObject.hex === "#004dcf") {
          setBideState(DeviceDarkBlue);
          console.log("dark blue true");
          return;
        } else if (colourObject.hex === "#006b76") {
          setBideState(DeviceDarkGreen);
          console.log("dark green true");
          return;
        } else if (colourObject.hex === "#eb9694") {
          setBideState(DeviceLightRed);
          console.log("light red true");
          return;
        } else if (colourObject.hex === "#c1e1c5") {
          setBideState(DeviceMintGreen);
          console.log("mint green true");
          return;
        } else if (colourObject.hex === "#fad0c3") {
          setBideState(DevicePeach);
          console.log("peach true");
          return;
        } else if (colourObject.hex === "#5300eb") {
          setBideState(DeviceBidePurple);
          console.log("purple true");
          return;
        } else if (colourObject.hex === "#c4def6") {
          setBideState(DeviceVeryBrightBlue);
          console.log("very bright blue true");
          return;
        } else if (colourObject.hex === "#fccb00") {
          setBideState(DeviceYellow);
          console.log("yellow true");
          return;
        }
      }
    }

    //rule2
    if (active2 === true) {
      if (JSON.parse(effect2) === "Solid") {
        if (colourObject2.hex === "#b80000" || colourObject2.hex === "db3e00") {
          setBideState(DeviceRed);
          console.log("red true");
          return;
        } else if (colourObject2.hex === "#db3e00") {
          setBideState(DeviceAmber);
          console.log("amber true");
          return;
        } else if (colourObject2.hex === "#008b02") {
          setBideState(DeviceGreen);
          console.log("green true");
          return;
        } else if (colourObject2.hex === "#1273de") {
          setBideState(DeviceBlue);
          console.log("blue true");
          return;
        } else if (colourObject2.hex === "#c4def6") {
          setBideState(DeviceBrightBlue);
          console.log("bright blue true");
          return;
        } else if (colourObject2.hex === "#bedadc") {
          setBideState(DeviceBrightGreen);
          console.log("bright green true");
          return;
        } else if (colourObject2.hex === "#d4c4fb") {
          setBideState(DeviceBrightPurple);
          console.log("bright purple true");
          return;
        } else if (colourObject2.hex === "#fef3bd") {
          setBideState(DeviceBrightYellow);
          console.log("bright yellow true");
          return;
        } else if (colourObject2.hex === "#004dcf") {
          setBideState(DeviceDarkBlue);
          console.log("dark blue true");
          return;
        } else if (colourObject2.hex === "#006b76") {
          setBideState(DeviceDarkGreen);
          console.log("dark green true");
          return;
        } else if (colourObject2.hex === "#eb9694") {
          setBideState(DeviceLightRed);
          console.log("light red true");
          return;
        } else if (colourObject2.hex === "#c1e1c5") {
          setBideState(DeviceMintGreen);
          console.log("mint green true");
          return;
        } else if (colourObject2.hex === "#fad0c3") {
          setBideState(DevicePeach);
          console.log("peach true");
          return;
        } else if (colourObject2.hex === "#5300eb") {
          setBideState(DeviceBidePurple);
          console.log("purple true");
          return;
        } else if (colourObject2.hex === "#c4def6") {
          setBideState(DeviceVeryBrightBlue);
          console.log("very bright blue true");
          return;
        } else if (colourObject2.hex === "#fccb00") {
          setBideState(DeviceYellow);
          console.log("yellow true");
          return;
        }
      }
    }

    //rule3
    if (active3 === true) {
      if (JSON.parse(effect3) === "Solid") {
        if (colourObject3.hex === "#b80000" || colourObject3.hex === "db3e00") {
          setBideState(DeviceRed);
          console.log("red true");
          return;
        } else if (colourObject3.hex === "#db3e00") {
          setBideState(DeviceAmber);
          console.log("amber true");
          return;
        } else if (colourObject3.hex === "#008b02") {
          setBideState(DeviceGreen);
          console.log("green true");
          return;
        } else if (colourObject3.hex === "#1273de") {
          setBideState(DeviceBlue);
          console.log("blue true");
          return;
        } else if (colourObject3.hex === "#c4def6") {
          setBideState(DeviceBrightBlue);
          console.log("bright blue true");
          return;
        } else if (colourObject3.hex === "#bedadc") {
          setBideState(DeviceBrightGreen);
          console.log("bright green true");
          return;
        } else if (colourObject3.hex === "#d4c4fb") {
          setBideState(DeviceBrightPurple);
          console.log("bright purple true");
          return;
        } else if (colourObject3.hex === "#fef3bd") {
          setBideState(DeviceBrightYellow);
          console.log("bright yellow true");
          return;
        } else if (colourObject3.hex === "#004dcf") {
          setBideState(DeviceDarkBlue);
          console.log("dark blue true");
          return;
        } else if (colourObject3.hex === "#006b76") {
          setBideState(DeviceDarkGreen);
          console.log("dark green true");
          return;
        } else if (colourObject3.hex === "#eb9694") {
          setBideState(DeviceLightRed);
          console.log("light red true");
          return;
        } else if (colourObject3.hex === "#c1e1c5") {
          setBideState(DeviceMintGreen);
          console.log("mint green true");
          return;
        } else if (colourObject3.hex === "#fad0c3") {
          setBideState(DevicePeach);
          console.log("peach true");
          return;
        } else if (colourObject3.hex === "#5300eb") {
          setBideState(DeviceBidePurple);
          console.log("purple true");
          return;
        } else if (colourObject3.hex === "#c4def6") {
          setBideState(DeviceVeryBrightBlue);
          console.log("very bright blue true");
          return;
        } else if (colourObject3.hex === "#fccb00") {
          setBideState(DeviceYellow);
          console.log("yellow true");
          return;
        }
      }
    }

    if (JSON.parse(effect) === "Traffic Light") {
      await setBideState(DeviceRed);
      await delay(1000);
      await setBideState(DeviceAmber);
      await delay(1000);
      await setBideState(DeviceGreen);
      await delay(1000);
    }

    console.log(JSON.parse(effect) === "Slow Flash");
    if (JSON.parse(effect) === "Slow Flash") {
      if (colourObject.hex === "#b80000" || colourObject.hex === "db3e00") {
        await setBideState(DeviceRed);
        await delay(1000);
        await setBideState(DeviceWhite);
        await delay(1000);
        await setBideState(DeviceRed);
        await delay(1000);
        await setBideState(DeviceWhite);
        await delay(1000);
        await setBideState(DeviceRed);
        await delay(1000);
        await setBideState(DeviceWhite);
        await delay(1000);

        console.log("red true");
      } else if (colourObject.hex === "#fccb00") {
        await setBideState(DeviceAmber);
        await delay(1000);
        await setBideState(DeviceWhite);
        await delay(1000);
        await setBideState(DeviceAmber);
        await delay(1000);
        await setBideState(DeviceWhite);
        await delay(1000);
        await setBideState(DeviceAmber);
        await delay(1000);
        await setBideState(DeviceWhite);
        await delay(1000);
        console.log("amber true");
      } else if (
        colourObject.hex === "#008b02" ||
        colourObject.hex === "006B76"
      ) {
        setBideState(DeviceGreen);
        await setBideState(DeviceGreen);
        await delay(1000);
        await setBideState(DeviceWhite);
        await delay(1000);
        await setBideState(DeviceGreen);
        await delay(1000);
        await setBideState(DeviceWhite);
        await delay(1000);
        await setBideState(DeviceGreen);
        await delay(1000);
        await setBideState(DeviceWhite);
        await delay(1000);
        console.log("green true");
      }
    }
  };

  const detectHandWaveHandler = async () => {
    console.log(movement1);
    //time 1 conversion
    console.log("time one:");
    const parseTimeOneStart = parse(ruleOneTime[0], "HH:mm", new Date());
    const timeStartOne = format(parseTimeOneStart, "HH:mm");
    console.log(timeStartOne);
    const parseTimeOneEnd = parse(ruleOneTime[1], "HH:mm", new Date());
    const timeEndOne = format(parseTimeOneEnd, "HH:mm");
    console.log(timeEndOne);

    //time 2 conversion
    console.log("time two:");
    const parseTimeTwoStart = parse(ruleTwoTime[0], "HH:mm", new Date());
    const timeStartTwo = format(parseTimeTwoStart, "HH:mm");
    console.log(timeStartTwo);
    const parseTimeTwoEnd = parse(ruleTwoTime[1], "HH:mm", new Date());
    const timeEndTwo = format(parseTimeTwoEnd, "HH:mm");
    console.log(timeEndTwo);

    //time 3 conversion
    console.log("time three:");
    const parseTimeThreeStart = parse(ruleThreeTime[0], "HH:mm", new Date());
    const timeStartThree = format(parseTimeThreeStart, "HH:mm");
    console.log(timeStartThree);
    const parseTimeThreeEnd = parse(ruleThreeTime[1], "HH:mm", new Date());
    const timeEndThree = format(parseTimeThreeEnd, "HH:mm");
    console.log(timeEndThree);

    //current time conversion
    console.log("current time:");
    const parseTimeCurrentTime = parse(currentTime, "HH:mm", new Date());
    const timeCurrent = format(parseTimeCurrentTime, "HH:mm");
    console.log(timeCurrent);
    console.log(parseTimeCurrentTime.getTime());

    if (active1 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeOneStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeOneEnd.getTime()
      ) {
        if (JSON.parse(movement1) === "Hand Wave") {
          console.log("true");
          setEventBar("Hand Wave Event Detected");
          setEventBarColour("Green");
          await colourChecker();
        } else {
          setEventBar("No Hand Wave Event Detected");
          setEventBarColour("red");
          await console.log("No Hand Wave Detected");
        }
      } else {
        setEventBar("No Hand Wave Event Detected");
        setEventBarColour("red");
        await console.log("No Hand Wave Event Detected");
      }
    } else {
      setEventBar("No Hand Wave Event Detected");
      setEventBarColour("red");
      await console.log("No Hand Wave Detected");
    }
    if (active2 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeTwoStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeTwoEnd.getTime()
      ) {
        if (JSON.parse(movement2) === "Hand Wave") {
          console.log("true");
          setEventBar("Hand Wave Event Detected");
          setEventBarColour("Green");
          await colourChecker();
        } else {
          setEventBar("No Hand Wave Event Detected");
          setEventBarColour("red");
          await console.log("No Hand Wave Detected");
        }
      } else {
        setEventBar("No Hand Wave Event Detected");
        setEventBarColour("red");
        await console.log("No Hand Wave Event Detected");
      }
    } else {
      setEventBar("No Hand Wave Event Detected");
      setEventBarColour("red");
      await console.log("No Hand Wave Detected");
    }
    if (active3 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeThreeStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeThreeEnd.getTime()
      ) {
        if (JSON.parse(movement3) === "Hand Wave") {
          console.log("true");
          setEventBar("Hand Wave Event Detected");
          setEventBarColour("Green");
          await colourChecker();
        } else {
          setEventBar("No Hand Wave Event Detected");
          setEventBarColour("red");
          await console.log("No Hand Wave Detected");
        }
      } else {
        setEventBar("No Hand Wave Event Detected");
        setEventBarColour("red");
        await console.log("No Hand Wave Event Detected");
      }
    }
  };

  const detectMovementHandler = async () => {
    //time 1 conversion
    console.log("time one:");
    const parseTimeOneStart = parse(ruleOneTime[0], "HH:mm", new Date());
    const timeStartOne = format(parseTimeOneStart, "HH:mm");
    console.log(timeStartOne);
    const parseTimeOneEnd = parse(ruleOneTime[1], "HH:mm", new Date());
    const timeEndOne = format(parseTimeOneEnd, "HH:mm");
    console.log(timeEndOne);

    //time 2 conversion
    console.log("time two:");
    const parseTimeTwoStart = parse(ruleTwoTime[0], "HH:mm", new Date());
    const timeStartTwo = format(parseTimeTwoStart, "HH:mm");
    console.log(timeStartTwo);
    const parseTimeTwoEnd = parse(ruleTwoTime[1], "HH:mm", new Date());
    const timeEndTwo = format(parseTimeTwoEnd, "HH:mm");
    console.log(timeEndTwo);

    //time 3 conversion
    console.log("time three:");
    const parseTimeThreeStart = parse(ruleThreeTime[0], "HH:mm", new Date());
    const timeStartThree = format(parseTimeThreeStart, "HH:mm");
    console.log(timeStartThree);
    const parseTimeThreeEnd = parse(ruleThreeTime[1], "HH:mm", new Date());
    const timeEndThree = format(parseTimeThreeEnd, "HH:mm");
    console.log(timeEndThree);

    //current time conversion
    console.log("current time:");
    const parseTimeCurrentTime = parse(currentTime, "HH:mm", new Date());
    const timeCurrent = format(parseTimeCurrentTime, "HH:mm");
    console.log(timeCurrent);
    console.log(parseTimeCurrentTime.getTime());

    if (active1 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeOneStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeOneEnd.getTime()
      ) {
        if (JSON.parse(movement1) === "Movement") {
          setIsPlaying(true);
          console.log("true");
          setEventBar("Movement Event Detected");
          setEventBarColour("Green");
          await colourChecker();
          return;
        } else {
          setEventBar("No Movement Event Detected");
          setEventBarColour("red");
          await console.log("No Movement Detected");
        }
      } else {
        setEventBar("No Movement Event Detected");
        setEventBarColour("red");
        await console.log("No Movement Detected");
      }
    } else {
      setEventBar("No Movement Event Detected");
      setEventBarColour("red");
      await console.log("No Movement Detected");
    }
    if (active2 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeTwoStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeTwoEnd.getTime()
      ) {
        if (JSON.parse(movement2) === "Movement") {
          console.log("true");
          setEventBar("Movement Event Detected");
          setEventBarColour("Green");
          await colourChecker();
          return;
        } else {
          setEventBar("No Movement Event Detected");
          setEventBarColour("red");
          await console.log("No Movement Detected");
        }
      } else {
        setEventBar("No Movement Event Detected");
        setEventBarColour("red");
        await console.log("No Movement Detected");
      }
    } else {
      setEventBar("No Movement Event Detected");
      setEventBarColour("red");
      await console.log("No Movement Detected");
    }
    if (active3 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeThreeStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeThreeEnd.getTime()
      ) {
        if (JSON.parse(movement3) === "Movement") {
          console.log("true");
          setEventBar("Movement Event Detected");
          setEventBarColour("Green");
          await colourChecker();
          return;
        } else {
          setEventBar("No Movement Event Detected");
          setEventBarColour("red");
          await console.log("No Movement Detected");
        }
      } else {
        setEventBar("No Movement Event Detected");
        setEventBarColour("red");
        await console.log("No Movement Detected");
      }
    } else {
      setEventBar("No Movement Event Detected");
      setEventBarColour("red");
      await console.log("No Movement Detected");
    }
  };

  const detectSoundHandler = async () => {
    //time 1 conversion
    console.log("time one:");
    const parseTimeOneStart = parse(ruleOneTime[0], "HH:mm", new Date());
    const timeStartOne = format(parseTimeOneStart, "HH:mm");
    console.log(timeStartOne);
    const parseTimeOneEnd = parse(ruleOneTime[1], "HH:mm", new Date());
    const timeEndOne = format(parseTimeOneEnd, "HH:mm");
    console.log(timeEndOne);

    //time 2 conversion
    console.log("time two:");
    const parseTimeTwoStart = parse(ruleTwoTime[0], "HH:mm", new Date());
    const timeStartTwo = format(parseTimeTwoStart, "HH:mm");
    console.log(timeStartTwo);
    const parseTimeTwoEnd = parse(ruleTwoTime[1], "HH:mm", new Date());
    const timeEndTwo = format(parseTimeTwoEnd, "HH:mm");
    console.log(timeEndTwo);

    //time 3 conversion
    console.log("time three:");
    const parseTimeThreeStart = parse(ruleThreeTime[0], "HH:mm", new Date());
    const timeStartThree = format(parseTimeThreeStart, "HH:mm");
    console.log(timeStartThree);
    const parseTimeThreeEnd = parse(ruleThreeTime[1], "HH:mm", new Date());
    const timeEndThree = format(parseTimeThreeEnd, "HH:mm");
    console.log(timeEndThree);

    //current time conversion
    console.log("current time:");
    const parseTimeCurrentTime = parse(currentTime, "HH:mm", new Date());
    const timeCurrent = format(parseTimeCurrentTime, "HH:mm");
    console.log(timeCurrent);
    console.log(parseTimeCurrentTime.getTime());

    if (active1 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeOneStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeOneEnd.getTime()
      ) {
        if (JSON.parse(movement1) === "Sound") {
          console.log("true");
          setEventBar("Sound Event Detected");
          setEventBarColour("Green");
          await colourChecker();
        } else {
          setEventBar("No Sound Event Detected");
          setEventBarColour("red");
          await console.log("No Sound Detected");
        }
      } else {
        setEventBar("No Sound Event Detected");
        setEventBarColour("red");
        await console.log("No Sound Detected");
      }
    } else {
      setEventBar("No Sound Event Detected");
      setEventBarColour("red");
      await console.log("No Sound Detected");
    }
    if (active2 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeTwoStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeTwoEnd.getTime()
      ) {
        if (JSON.parse(movement2) === "Sound") {
          console.log("true");
          setEventBar("Sound Event Detected");
          setEventBarColour("Green");
          await colourChecker();
        } else {
          setEventBar("No Sound Event Detected");
          setEventBarColour("red");
          await console.log("No Sound Detected");
        }
      } else {
        setEventBar("No Sound Event Detected");
        setEventBarColour("red");
        await console.log("No Sound Detected");
      }
    } else {
      setEventBar("No Sound Event Detected");
      setEventBarColour("red");
      await console.log("No Sound Detected");
    }
    if (active3 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeThreeStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeThreeEnd.getTime()
      ) {
        if (JSON.parse(movement3) === "Sound") {
          console.log("true");
          setEventBar("Sound Event Detected");
          setEventBarColour("Green");
          await colourChecker();
        } else {
          setEventBar("No Sound Event Detected");
          setEventBarColour("red");
          await console.log("No Sound Detected");
        }
      } else {
        setEventBar("No Sound Event Detected");
        setEventBarColour("red");
        await console.log("No Sound Detected");
      }
    } else {
      setEventBar("No Sound Event Detected");
      setEventBarColour("red");
      await console.log("No Sound Detected");
    }
  };

  const isConditionMet = () => {
    let sound = new Howl({
      src: [get("rule1").then((val) => val)],
    });

    sound.play();

    console.log(sound);

    //time 1 conversion
    console.log("time one:");
    const parseTimeOneStart = parse(ruleOneTime[0], "HH:mm", new Date());
    const timeStartOne = format(parseTimeOneStart, "HH:mm");
    console.log(timeStartOne);
    const parseTimeOneEnd = parse(ruleOneTime[1], "HH:mm", new Date());
    const timeEndOne = format(parseTimeOneEnd, "HH:mm");
    console.log(timeEndOne);

    //time 2 conversion
    console.log("time two:");
    const parseTimeTwoStart = parse(ruleTwoTime[0], "HH:mm", new Date());
    const timeStartTwo = format(parseTimeTwoStart, "HH:mm");
    console.log(timeStartTwo);
    const parseTimeTwoEnd = parse(ruleTwoTime[1], "HH:mm", new Date());
    const timeEndTwo = format(parseTimeTwoEnd, "HH:mm");
    console.log(timeEndTwo);

    //time 3 conversion
    console.log("time three:");
    const parseTimeThreeStart = parse(ruleThreeTime[0], "HH:mm", new Date());
    const timeStartThree = format(parseTimeThreeStart, "HH:mm");
    console.log(timeStartThree);
    const parseTimeThreeEnd = parse(ruleThreeTime[1], "HH:mm", new Date());
    const timeEndThree = format(parseTimeThreeEnd, "HH:mm");
    console.log(timeEndThree);

    //current time conversion
    console.log("current time:");
    const parseTimeCurrentTime = parse(currentTime, "HH:mm", new Date());
    const timeCurrent = format(parseTimeCurrentTime, "HH:mm");
    console.log(timeCurrent);
    console.log(parseTimeCurrentTime.getTime());

    //checking conditions

    //check for conflicts
    // if()

    if (active1 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeOneStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeOneEnd.getTime()
      ) {
        console.log("condition reached");
        console.log(localStorage.getItem("colour"));
        console.log(localStorage.getItem("effect"));
        console.log(localStorage.getItem("trigger"));
      } else {
        console.log("no condition");
      }
    }
    if (active2 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeTwoStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeTwoEnd.getTime()
      ) {
        console.log("condition reached");
        console.log(localStorage.getItem("colour2"));
        console.log(localStorage.getItem("effect2"));
        console.log(localStorage.getItem("trigger2"));
      } else {
        console.log("no condition");
      }
    }
    if (active3 === true) {
      if (
        parseTimeCurrentTime.getTime() >= parseTimeThreeStart.getTime() &&
        parseTimeCurrentTime.getTime() <= parseTimeThreeEnd.getTime()
      ) {
        console.log("condition reached");
        console.log(localStorage.getItem("colour3"));
        console.log(localStorage.getItem("effect3"));
        console.log(localStorage.getItem("trigger3"));
      } else {
        console.log("no condition");
      }
    }
  };

  const playAudio = () => {
    db.collection("audio")
      .doc({ id: "audio1" })
      .get()
      .then((document) => {
        console.log(document.audio);
        return (
          <div>
            <ReactHowler src={document.audio} playing={true} />;
          </div>
        );
      });
  };

  if (isLoading) {
    return <div>Audio is loading</div>;
  }

  return (
    <div>
      <div className="inner" style={{ backgroundColor: eventBarColour }}>
        {eventBar}
      </div>
      <div className="container">
        <div className="button-control">
          <h1>Trigger Buttons</h1>
          <Button className="btn-item" onClick={handleBideSwitch}>
            {bideText}
          </Button>
          <br></br>
          <Button
            style={{ display: contentDisplay }}
            onClick={detectMovementHandler}
          >
            Movement
          </Button>
          <Button
            className="btn-item"
            style={{ display: contentDisplay }}
            onClick={detectHandWaveHandler}
          >
            Hand Wave
          </Button>
          <Button
            className="btn-item"
            style={{ display: contentDisplay }}
            onClick={detectSoundHandler}
          >
            Sound
          </Button>
          <Button
            className="btn-item"
            style={{ display: contentDisplay }}
            onClick={handShake}
          >
            Handshake
          </Button>
        </div>
        <div className="bide-sim">
          <img src={bideState} className="center" />
        </div>
        <div>
          <div>
            <h1>Current Time:</h1>
            <TimePicker onChange={handleTimeChange} value={currentTime} />
          </div>
          <ReactHowler src={theAudio} playing={isPlaying} />
        </div>
      </div>
    </div>
  );
};

export default Simulation;
