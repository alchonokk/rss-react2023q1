export function validateDate(value: Partial<string>) {
  const selectDateArray = value.split('-');
  const selectYear = Number(selectDateArray[0]);
  const DIFFMONTH = 1;
  const selectMonth = Number(selectDateArray[1]) - DIFFMONTH;
  return selectYear - new Date().getFullYear() === 0 && selectMonth - new Date().getMonth() === 0;
}

export function nameRegExp() {
  return {
    required: true,
    pattern: /[a-zA-Z, а-яА-Я]{3,}/,
  };
}
