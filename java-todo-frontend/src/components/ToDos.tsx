import type {Task, TaskStatus} from "../types/Type.ts";

type Props = {
    tasks: Task[];
    changeStatus: (taskId: string, newStatus: TaskStatus) => void;
};

export default function Todos({tasks, changeStatus}: Props) {

    const openTasks = tasks.filter(task => task.status === "OPEN");

    return (
        <>
            <h1>Offene Aufgaben</h1>

            {openTasks.map(task => (
                <section className="task-card" key={task.id}>
                    <p>Aufgabe: {task.description}</p>
                    <p>Status: Offen</p>

                    <button onClick={() => changeStatus(task.id, "IN_PROGRESS")}>
                        Task Bearbeiten
                    </button>

                </section>
            ))}
        </>
    );
}