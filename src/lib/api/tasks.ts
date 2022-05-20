import prismaClient from "@/lib/prismaClient";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

export async function getAllTasks(
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
) {
    try {
        const { search } = req.query;

        if (Array.isArray(search)) {
            return res.status(400).end("Título inválido");
        }

        const data = await prismaClient.task.findMany({
            where: {
                userId: session.user.id,
                title: {
                    contains: search,
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}

export async function createTask(
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
) {
    const { title } = req.body;
    // const { query } = req.query;

    if (!session.user.id)
        return res.status(500).end("Server failed to get session user ID");

    if (title === "") return res.status(400).end("Título inválido");

    try {
        const data = await prismaClient.task.create({
            data: {
                title,
                userId: session.user.id,
            },
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}

export async function deleteTask(
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
) {
    const { id } = req.query;

    if (Array.isArray(id)) {
        return res.status(400).end("Id inválido");
    }

    try {
        const task = await prismaClient.task.findFirst({
            where: {
                id,
                userId: session.user.id,
            },
        });

        if (!task) {
            return res
                .status(400)
                .end("Tarefa não encontrada para o usuário logado");
        }

        await prismaClient.task.delete({
            where: {
                id,
            },
        });

        return res.status(200).end();
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}

export async function updateTask(
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
) {
    const { id } = req.query;

    const { task } = req.body;

    if (Array.isArray(id)) {
        return res.status(400).end("Id não enviado");
    }

    if (Array.isArray(task.title)) {
        return res.status(400).end("Title não enviado");
    }

    try {
        const task = await prismaClient.task.findFirst({
            where: {
                id,
                userId: session.user.id,
            },
        });

        if (!task) {
            return res
                .status(400)
                .end("Tarefa não encontrada para o usuário logado");
        }

        const response = await prismaClient.task.update({
            where: {
                id,
            },
            data: {
                title: task.title,
            },
        });

        return res.status(200).end(response);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}
