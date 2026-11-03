import {useState} from 'react'
import './App.css'

import axios from "axios";
import {Routes, Route} from "react-router";
import NavigationBar from "./NavigationBar.tsx";
import ToDos from "./components/ToDos.tsx";
import Doing from "./components/Doing.tsx";
import Done from "./components/Done.tsx";
import Overview from "./components/Overview.tsx";

import type {Task, TaskStatus} from "./types/Type.ts";

function App() {

    const [tasks, setTasks] = useState<Task[]>([]);

    function handleButton() {

        axios.get("/api/todo")
            .then((response) => {
                console.log(response.data);
                setTasks(response.data);
            })
            .catch((error) => {
                console.log("Error beim Laden: ", error);
            });
    }

    function changeStatus(taskId: string, newStatus: TaskStatus) {
        const task = tasks.find(task => task.id === taskId);

        if (!task) {
            return;
        }

        const updatedTask = {
            id: task.id,
            description: task.description,
            status: newStatus
        };

        axios.put<Task>(`/api/todo/${taskId}/update`, updatedTask)
            .then((response) => {
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === taskId
                            ? response.data
                            : task
                    )
                );
            })
            .catch((error) => {
                console.log("Fehler beim Aktualisieren", error);
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
                        changeStatus={changeStatus}/>}/>

                    <Route path={"/doing"} element={<Doing
                        tasks={tasks}
                        changeStatus={changeStatus}/>}/>

                    <Route path={"/done"} element={<Done
                        tasks={tasks}
                        setTasks={setTasks}
                        changeStatus={changeStatus}/>}/>

                </Routes>

            </main>
        </>
    )
}

export default App
