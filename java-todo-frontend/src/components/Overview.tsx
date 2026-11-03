import {useState} from "react";
import axios from "axios";
import type {SubmitEvent} from "react";
import '../styles/Overview.css'
import {useNavigate} from "react-router";
import type {Task} from "../types/Type.ts";

type Props = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
};

export default function Overview({tasks, setTasks}: Props) {

    const [error, setError] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        axios.post<Task>("/api/todo", {
            description: description,
            status: "OPEN"
        }).then(response => {
            //füge respose data in die Liste ein
            const newTasks = tasks.concat(response.data);
            setTasks(newTasks);
            setError("");
            setDescription("");
            navigate("/todo");
        }).catch((error) => {
            setError(" Task konnte nicht gespeichert werden:" + error);
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
            {error && <p>{error}</p>}
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
