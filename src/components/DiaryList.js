import React, { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "lastest", name: "최신순" }, //<-it
  { value: "oldest", name: "오래된순" },
];

const filterOptionList = [
  { value: "all", name: "전체" },
  { value: "good", name: "좋은 감정" },
  { value: "bad", name: "나쁜 감정" },
];

//정렬기능
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {/* 최신순 | 오래된순 옵션 */}
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});
/*React.memo ->컴포넌트를 감싸주면=컴포넌트를 리액트 메모의 인자로 전달하면
강화된 컴포넌틀를 돌려줌
=>전달받은 프롭이 변화가 없으면 렌더링 되지않게 메모제이션
*/

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate(); //링크 태그 아닌데 페이지 이동할때
  const [sortType, setSortType] = useState("lastest"); //onChange로 값 변환
  const [filter, setFilter] = useState("all"); // 감정에 따른 필터 만들기

  //필터에 따라 리스트 정렬
  const getProcessedDiaryList = () => {
    // 감정 필터를 위한 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    //객체로 이뤄진 배열 복사는 비교함수를 이용해서 복사해야함
    const compare = (a, b) => {
      if (sortType === "lastest") {
        return parseInt(b.date) - parseInt(a.date); //date가 string 일 수도 있기때문에 parseInt 형변환
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // 깊은 복사        //[] <= string <= [] //diaryList 데이터 배열 손상없게 하기 위해
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare); //비교함수이용해서 리스트 정렬
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {/* 리스트 정렬 적용 */}
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />

        // <div key={it.id}>
        //   {it.content}
        //   {it.emotion}
        // </div>
      ))}
    </div>
  );
};

//DiaryList 정상적인 전달 안될때
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
