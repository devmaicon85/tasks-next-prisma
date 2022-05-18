import { Task } from "@prisma/client";
import prisma from "../prisma";

export interface TaskCreateType {
    title: string;
    userId: string;
}

export interface TaskEditType {
    id: string;
    title: string;
    isDone: boolean;
}

export async function getAllTasks(userId: string) {
    const data = await prisma.task.findMany({ where: { userId } });
    return data;
}

export async function createTask({ title, userId }: TaskCreateType) {
    const data = await prisma.task.create({
        data: {
            title,
            userId,
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
