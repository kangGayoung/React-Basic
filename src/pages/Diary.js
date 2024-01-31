import { useParams } from "react-router-dom";

const Diary = () => {
  // path variable:useParams
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>New</h1>
      <p>이 곳은 Diary.</p>
    </div>
  );
};

export default Diary;
