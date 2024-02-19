import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]); // 날짜에 해당하는 월에 다이어리 리스트만 받아오기

  // 날짜 저장
  const [curDate, setCureDate] = useState(new Date());
  // getMonth()-> 0월 부터 시작
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // 날짜에 해당하는 월에 다이어리 리스트만 받아오기
  useEffect(() => {
    if (diaryList.length >= 1) {
      // diaryList-> 0일 때는 업데이트 안해도 됨
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1, //1일
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59, // 23,59,59 ->new Date() 는 마지막 시분초도 설정해야 마지막 날짜가 화면에 보여짐
      ).getTime();

      // 업데이트 되는 리스트 범위 설정
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay),
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // 날짜를 늘려주는
  const increaseMonth = () => {
    setCureDate(
      //curDate.getDate() 현재 날짜도 가져와 줌
      new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        curDate.getDate(),
      ),
    );
  };

  const decreaseMonth = () => {
    setCureDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth() - 1,
        curDate.getDate(),
      ),
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
