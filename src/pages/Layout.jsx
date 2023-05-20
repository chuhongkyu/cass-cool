import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import Play from "./Play";
import Call from "./Call";
import Home from "./Home"
import Nav from "../components/Nav";
import { useEffect } from "react";

export default function Layout(){
    const location = useLocation()
    useEffect(() => {
        console.log(location)
    }, [])

    return(
            <div className="layout" style={{backgroundImage:`url("img/bg.png"})`}}>
                <Nav/>
                <AnimatePresence initial={false} mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="home" element={<Home />} />
                    <Route path="call" element={<Call />} />
                    <Route path="play" element={<Play />} />
                </Routes>
                </AnimatePresence>
            </div>
    )
}