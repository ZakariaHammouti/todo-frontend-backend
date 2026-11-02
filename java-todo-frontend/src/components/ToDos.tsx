import type {Task} from "../types/Type.ts";
import axios from "axios";
import {useState} from "react";

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function Todos({tasks, setTasks}: Props) {

    const openTasks = tasks.filter(task => task.status === "OPEN");

    function moveToDoing(taskId: string) {
        const task = tasks.find(task => task.id === taskId);

        if (!task) {
            return;
        }

        const updatedTask = {
            id: task.id,
            description: task.description,
            status: "IN_PROGRESS"
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
            <h1>Offene Aufgaben</h1>

            {openTasks.map(task => (
                <section className="task-card" key={task.id}>
                    <p>Aufgabe: {task.description}</p>
                    <p>Status: Offen</p>

                    <button onClick={() => moveToDoing(task.id)}>
                        Task Bearbeiten
                    </button>

                </section>
            ))}
        </>
    );
}