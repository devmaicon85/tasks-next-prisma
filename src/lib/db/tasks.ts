import prisma from "../prisma";

export interface TaskCreateType {
    title: string;
}

export interface TaskEditType {
    id: string;
    title: string;
    isDone: boolean;
}

export async function getAllTasks() {
    const data = await prisma.task.findMany();
    return data;
}

export async function createTask({ title }: TaskCreateType) {
    const data = await prisma.task.create({
        data: {
            title,
            isDone: false,
        },
    });

    return data;
}

export async function editTask({ id, title, isDone }: TaskEditType) {
    const data = await prisma.task.update({
        data: {
            title,
            isDone,
        },
        where: {
            id,
        },
    });

    return data;
}
