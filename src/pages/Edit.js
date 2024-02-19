import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  //targetDiary 저장할 state
  const [originData, setOriginData] = useState();

  const navigate = useNavigate(); //링크 태그 클릭 안해도 페이지변환가능 -> 예)로그인 안한 유저> 로그인 페이지로 보내기
  const { id } = useParams(); //id와 일치하는 diaryList 페이지 가져오기

  const diaryList = useContext(DiaryStateContext);

  // mount 될때 id 값과 일치하는 list data 가져오기
  useEffect(() => {
    if (diaryList.length >= 1) {
      // diaryList 하나라도 있을때
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id),
      ); //useParams=>id
      //console.log(targetDiary);

      if (targetDiary) {
        setOriginData(targetDiary); //초기화
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
