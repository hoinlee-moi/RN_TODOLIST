export const getFormattedDate = (date, limitDay) => {
  const targetDate = new Date(date);
  const today = new Date();

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const timeDiff = targetDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (daysDiff < 0) {
    return {
      message: `D+${Math.abs(daysDiff)}`,
      urgent: true,
    };
  }

  if (daysDiff === 0) {
    return {
      message: 'D-day',
      urgent: true,
    };
  }
  
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

export const isPastDate = date => {
  const selectDate = new Date(date);
  const today = new Date();

  selectDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return selectDate < today;
};

