import React, { useState, useEffect } from "react";
import "./Rules.css";
import RuleBar from "./RuleBar";
import RuleBar2 from "./RuleBar2";
import RuleBar3 from "./RuleBar3";
import Button from "react-bootstrap/esm/Button";

const Rules = () => {
  const [ruleComponents, setRuleComponents] = useState([]);

  const addRule = () => {
    setRuleComponents([...ruleComponents, RuleBar]);
  };

  const removeRule = (rule) => {
    setRuleComponents(ruleComponents.filter((i) => i !== rule));
  };

  useEffect(() => {
    const getRuleComponent = localStorage.getItem("ruleComponent");

    if (getRuleComponent) {
      setRuleComponents(JSON.parse(getRuleComponent));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ruleComponent", JSON.stringify(ruleComponents));
  });

  return (
    <>
      <div className="main">
        <h1 className="inner" style={{ color: "black" }}>
          Rules
        </h1>
        <div className="flex-container">
          <RuleBar />
          <RuleBar2 />
          <RuleBar3 />
        </div>
      </div>
    </>
  );
};

export default Rules;
