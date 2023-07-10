//날짜 포멧팅 함수
export const getFormattedDate = (date, limitDay) => {
  const targetDate = new Date(date);
  const today = new Date();
  //월,일로 계산하기에 시간은 전부 0으로 초기화
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  //서로 시간 계산
  const timeDiff = targetDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //음수시 시간 넘어감
  if (daysDiff < 0) {
    return {
      message: `D+${Math.abs(daysDiff)}`,
      urgent: true,
    };
  }
  //0은 당일
  if (daysDiff === 0) {
    return {
      message: 'D-day',
      urgent: true,
    };
  }
    //양수시 아직 남아있지만 limitDay로 제한 시간을 받기
  if (daysDiff < limitDay) {
    return {
      message: `D-${daysDiff}`,
      urgent: daysDiff<=1||false,
    };
  }

  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  return {
    message: `${month}월 ${day}일`,
    urgent: false,
  };
};

//과거를 선택했는지 검증 로직
export const isPastDate = date => {
  const selectDate = new Date(date);
  const today = new Date();

  selectDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return selectDate < today;
};

