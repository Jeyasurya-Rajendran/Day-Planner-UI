import moment from "moment";

function isSelected(day,selectedDay){
    // return selectedDay.isSame(day, "day");
    return moment(selectedDay).isSame(moment(day),"day")
  }
  function beforeToday(day){
    return day.isBefore(new Date(), "day");
  }
  function isToday(day){
    return moment(day).isSame(moment(), "day");
  }

export default function dayStyles(day,selectedDay){
    if(beforeToday(day)) return "before day-container";
    if(isSelected(day,selectedDay)) return "selected day-container";
    if(isToday(day)) return "today day-container";
    return "day-container";
  }