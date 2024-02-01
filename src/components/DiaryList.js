import { useState } from "react";

const sortOptionList = [
  { value: "lastest", name: "최신순" }, //<-it
  { value: "oldest", name: "오래된순" },
];

//정렬기능
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option>{it.name}</option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("lastest");

  //필터에 따라 리스트 정렬
  const getProcessedDiaryList = () => {
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
    const sortedList = copyList.sort(compare); //비교함수이용해서 리스트 정렬
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {/* 리스트 정렬 적용 */}
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

//DiaryList 정상적인 전달 안될때
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
