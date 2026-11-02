import type {Task} from "../types/Type";
import axios from "axios";

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function Doing({tasks, setTasks}: Props) {

    const doingTasks = tasks.filter(task => task.status === "IN_PROGRESS");

    function changeStatus(taskId: string, newStatus: Task["status"]) {
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
            <h1>In Bearbeitung</h1>

            {doingTasks.map(task => (
                <section className="task-card" key={task.id}>
                    <p>Aufgabe: {task.description}</p>
                    <p>Status: In Bearbeitung</p>

                    <button onClick={() => changeStatus(task.id, "OPEN")}>
                        Task zu Todos bewegen
                    </button>

                    <button onClick={() => changeStatus(task.id, "DONE")}>
                        Task zu Done bewegen
                    </button>
                </section>
            ))}
        </>
    );
}