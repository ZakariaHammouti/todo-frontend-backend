import type {Task, TaskStatus} from "../types/Type.ts";

type Props = {
    tasks: Task[];
    changeStatus: (taskId: string, newStatus: TaskStatus) => void;
};

export default function Doing({tasks, changeStatus}: Props) {

    const doingTasks = tasks.filter(task => task.status === "IN_PROGRESS");

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