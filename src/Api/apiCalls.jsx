import moment from "moment";
import api from "./appointments";

export function createAppointmentApi(request){
    const promise = api.post("/appointments",
        {
            startDateTime: request.startTime,
            endDateTime: request.endTime,
            title: request.title,
            description: request.description,
            routine: request.selectedRoutine
        });

    return promise;
}

export function getAppointmentApi(selectedDate){
    const promise = api.get("/appointments?date=" + moment(selectedDate).format("YYYY-MM-DD"));

    const getPromise = promise.then((response)=> response.data);

    return getPromise;
}

export function deleteAppointmentApi(id){
    const promise = api.delete("/appointments/" + id);

    const deletePromise = promise.then(console.log("successfully deleted"));

    return deletePromise;
}

export function updateAppointmentApi(id, request){
    const promise = api.put("/appointments/" + id, 
    {
        startDateTime: request.startDateTime,
        endDateTime: request.endDateTime,
        title: request.title,
        description: request.description,
    });

    return promise;
}

export function getRoutines(){
    const promise = api.get("/testApps");
    return promise;
}
export function deleteRoutine(id){
    const promise = api.delete("/testApp/" + id);
    return promise;
}