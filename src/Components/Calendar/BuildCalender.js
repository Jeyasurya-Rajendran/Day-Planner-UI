import moment from "moment";

export default function buildCalender(value){
    const startDay = moment(value).clone().startOf("month").startOf("week");
    const endDay = moment(value).clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");
    const calendar = [];
  
    let count = 0;
    // day.isBefore(endDay, "day")
    while(count<6){
      calendar.push(
        Array(7).fill(0).map(()=> day.add(1,"day").clone())
      );
      count++;
    }

    return calendar;

}