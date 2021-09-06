const addDays = (date: Date, days: number): Date => {
  const tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + days);
  return tempDate;
};

const dateExpired = (date: Date): boolean => {
  const currentDate = new Date();
  return date < currentDate;
};

export { addDays, dateExpired };
