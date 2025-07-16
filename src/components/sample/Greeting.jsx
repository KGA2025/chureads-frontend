import React, { useState } from "react";

/**
 *
 * 사용자의 이름을 입력받아서 인사 문구와 함께 메세지를 보여주는 컴포넌트
 */

const Greeting = ({ name = "???", onButtonClick }) => {
  // logic
  // my data
  // PascalCase : MyData
  // camelcase : myData
  // snake-case : my-data

  // let userName = "kga";
  // state 반환값 : 첫번째 - 데이터, 두번째 - 함수
  // 두번째 함수를 이용해서만 userName을 수정할 수 있다
  // const [userName, setUserName] = useState(name);

  const handleClick = () => {
    // 데이터 수정
    // userName = userName.toUpperCase();
    // console.log("🚀 ~ userName:", userName);
    // setUserName(userName.toUpperCase());
    onButtonClick(name);
  };
  // view
  return (
    <div className="aaa">
      <p> {name}님! 반갑습니다!</p>
      <p> 오늘도 좋은 하루 되세요😆</p>
      <button
        type="button"
        className="border border-white "
        onClick={handleClick}
      >
        {" "}
        대문자로 수정
      </button>
    </div>
  );
};

export default Greeting;
