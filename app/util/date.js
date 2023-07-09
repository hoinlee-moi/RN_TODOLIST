// export const getFormattedDate = (date) => {
//   const today = new Date()
//   const diff = ((today - date.getTime())/1000)
//   console.log(diff)
//     return `${diff.getMonth() + 1}월${diff.getDate()}일`;
//   };
export const getFormattedDate = (date) => {
  const today = new Date();
  const deadlineDate = new Date(date);

  const daysRemaining = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  if (daysRemaining < 7) {
    return `D-${daysRemaining}`;
  } else {
    const formattedDate = deadlineDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  }
};
export const getDeadLineDate = (date,days) => {
    return new Date()
}