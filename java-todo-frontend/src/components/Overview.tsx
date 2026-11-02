import {useState} from "react";
import axios from "axios";
import type {SubmitEvent} from "react";
import '../styles/Overview.css'
import type {Dispatch} from "react";
import type {SetStateAction} from "react";

import type {Task} from "../types/Type.ts";

type Props = {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function Overview({tasks, setTasks}: Props) {

    const [error, setError] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        axios.post<Task>("/api/todo", {
            description: description,
            status: "OPEN"
        }).then(response => {
            setTasks(prevTasks => [...prevTasks, response.data]);
            setError("");
            console.log(tasks);
            setDescription("");
        }).catch((error) => {
            setError("Task konnte nicht gespeichert werden.");
        });
    }

    return (
        <>
            <h1>Tasks Overview</h1>

            <form onSubmit={handleSubmit}>
                <input
                    required
                    name="description"
                    type="text"
                    placeholder="Deine Aufgabe"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <button type="submit">Hinzufügen</button>
            </form>

            {tasks.map(task => (
                <section className="task-card" key={task.id}>
                    <p>Aufgabe: {task.description}</p>
                    <p>Status: {task.status === "OPEN" ? "Offen" :
                        task.status === "IN_PROGRESS" ? "In Bearbeitung" :
                            "Erledigt"}</p>
                </section>
            ))}
        </>
    );
}
