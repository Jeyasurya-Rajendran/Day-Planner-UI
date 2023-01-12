function isSelected(day,value){
    return value.isSame(day, "day");
  }
  function beforeToday(day){
    return day.isBefore(new Date(), "day");
  }
  function isToday(day){
    return day.isSame(new Date(), "day");
  }

export default function dayStyles(day,value){
    if(beforeToday(day)) return "before day-container";
    if(isSelected(day,value)) return "selected day-container";
    if(isToday(day)) return "today day-container";
    return "day-container";
  }