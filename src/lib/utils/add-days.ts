const addDays = (date: Date, days: number): Date => {
  const tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + days);
  return tempDate;
};

export { addDays };
