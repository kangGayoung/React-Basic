import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate(); //링크 태그 클릭 안해도 페이지변환가능 -> 예)로그인 안한 유저> 로그인 페이지로 보내기
  const [serchParams, setSearchParams] = useSearchParams();

  //get을 통해서 전달받은 쿼리스트링을 꺼내 쓸 수 있음
  const id = serchParams.get("id");
  console.log("id:", id);

  const mode = serchParams.get("mode");
  console.log("mode:", mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이 곳은 Edit.</p>
      <button onClick={() => setSearchParams({ who: "gaga" })}>Qs바꾸기</button>
      <br />
      <button onClick={() => navigate("/home")}>home으로 가기</button>
      <br />
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
};

export default Edit;
