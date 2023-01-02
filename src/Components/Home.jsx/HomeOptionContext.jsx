import React, { createContext, useState, useRef, useEffect } from "react";

export const HomeOptionContext = createContext("");

export default function HomeOptionProvider({children}){

    const [selectedOption, setSelectedOption] = useState("home");
    const prevOption = useRef("home");
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        prevOption.current = selectedOption;
    },[selectedOption])

    return (
        <HomeOptionContext.Provider value={{option : [selectedOption, setSelectedOption], prevOption : prevOption, eventList:[events, setEvents] }}>
            {children}
        </HomeOptionContext.Provider>
    )
}