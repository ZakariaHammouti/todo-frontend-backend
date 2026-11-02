export type TaskStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export type Task = {
    id: string;
    description: string;
    status: TaskStatus;
};