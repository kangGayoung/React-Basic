const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;

/*
1. onClick={() => onClick(emotion_id)}

2. onClick 이벤트로 DiaryEditor 페이지에서 [오늘의 감정] handleClickEmote 함수 실행

3. emotion_id 값을 handleClickEmote(emotion) 으로 받음


isSelected 으로 받은 값을

isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}

=> 클래스로 스타일 변경해주기      
*/
