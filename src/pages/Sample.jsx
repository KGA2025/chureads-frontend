import React from "react";
import Greeting from "../components/sample/Greeting";

// 함수 형식과 유사 but 태그를 return함
const Sample = () => {
  // logic
  const handleButtonClick = (data) => {
    console.log("click!!", data);
  };

  // view
  return (
    <div>
      Sample
      <Greeting name="하경아" onButtonClick={handleButtonClick} />
      <Greeting name="최선영" onButtonClick={handleButtonClick} />
      <Greeting onButtonClick={handleButtonClick} />
    </div>
  );
};

// 다른 곳에서 사용할 수 있게 export
export default Sample;
