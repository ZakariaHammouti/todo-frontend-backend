import axios from "axios";
import type {Task, TaskStatus} from "../types/Type.ts";

export type Props = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    changeStatus: (taskId: string, newStatus: TaskStatus) => void;
};

export default function Done({tasks, setTasks, changeStatus}: Props) {

    const doneTasks = tasks.filter(task => task.status === "DONE");

    function deleteTask(taskId: string) {
        axios.delete(`/api/todo/${taskId}`)
            .then(() => {
                const newTasksListAfterRemoving = tasks.filter(
                    task => task.id !== taskId
                );

                setTasks(newTasksListAfterRemoving);
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