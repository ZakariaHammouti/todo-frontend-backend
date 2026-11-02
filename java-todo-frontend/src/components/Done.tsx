import type {Task} from "../types/Type";
import axios from "axios";

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function Done({tasks, setTasks}: Props) {

    const doneTasks = tasks.filter(task => task.status === "DONE");

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

    function deleteTask(taskId: string) {
        axios.delete(`/api/todo/${taskId}`)
            .then(() => {
                setTasks(prevTasks =>
                    prevTasks.filter(task => task.id !== taskId)
                );
            })
            .catch((error) => {
                console.log("Fehler beim Löschen", error);
            });
    }


    return (
        <>
            <h1>Erledigte Aufgaben</h1>

            {doneTasks.map(task => (
                <section className="task-card" key={task.id}>
                    <p>Aufgabe: {task.description}</p>
                    <p>Status: Erledigt</p>

                    <button onClick={() => changeStatus(task.id, "OPEN")}>
                        Zurück zu Todos
                    </button>

                    <button onClick={() => changeStatus(task.id, "IN_PROGRESS")}>
                        Zurück zu Doing
                    </button>

                    <button onClick={() => deleteTask(task.id)}>
                        Task entfernen
                    </button>
                </section>
            ))}
        </>
    );
}