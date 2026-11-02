import {useState} from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import axios from "axios";
import {Routes, Route} from "react-router";
import NavigationBar from "./NavigationBar.tsx";
import ToDos from "./components/ToDos.tsx";
import Doing from "./components/Doing.tsx";
import Done from "./components/Done.tsx";
import Overview from "./components/Overview.tsx";

import type {Task} from "./types/Type.ts";

function App() {

    const [tasks, setTasks] = useState<Task[]>([]);

    function handleButton() {
        console.log("handle Button");
        axios.get("/api/todo")
            .then((response) => {
                console.log(response.data);
                setTasks(response.data);
            })
            .catch((error) => {
                console.log("Error");
            });
    }

    return (
        <>
            <NavigationBar/>

            <main>
                <button className={"load-button"} onClick={handleButton}>Todos Laden von Backend MongoDB</button>
                <Routes>
                    <Route path={"/"} element={<Overview
                        tasks={tasks}
                        setTasks={setTasks}/>}/>

                    <Route path={"/todo"} element={<ToDos
                        tasks={tasks}
                        setTasks={setTasks}/>}/>

                    <Route path={"/doing"} element={<Doing
                        tasks={tasks}
                        setTasks={setTasks}/>}/>

                    <Route path={"/done"} element={<Done
                        tasks={tasks}
                        setTasks={setTasks}/>}/>

                </Routes>

            </main>
        </>
    )
}

export default App
