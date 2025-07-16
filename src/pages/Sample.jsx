import React, { useEffect, useState } from "react";
import Greeting from "../components/sample/Greeting";

// 함수 형식과 유사 but 태그를 return함
const Sample = () => {
  // logic
  const handleButtonClick = (data) => {
    console.log("click!!", data);
  };

  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    // 컴포넌트 생성시 딱 한번만 실행됨
    const nameDatas = ["하경아", "최선영", "송의진"];
    setUserNames(nameDatas);
  }, []);
  // view
  return (
    <div>
      Sample
      {userNames.map((userName, index) => (
        <Greeting
          key={`userName${index}`}
          name={userName}
          onButtonClick={handleButtonClick}
        />
      ))}
    </div>
  );
};

// 다른 곳에서 사용할 수 있게 export
export default Sample;
