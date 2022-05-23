import prismaClient from "@/lib/prismaClient";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";

export async function searchTasks(
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
) {
    try {
        const { search } = req.query;

        if (!session.user.id)
            return res
                .status(500)
                .end("O servidor falhou ao obter o ID do usuário da sessão");

        if (Array.isArray(search)) {
            return res.status(400).end("Busca inválida");
        }

        const data = await prismaClient.task.findMany({
            where: {
                userId: session.user.id,
                OR: [
                    {
                        title: {
                            contains: search.replace(" ", "%"),
                        },
                    },
                    {
                        description: {
                            contains: search.replace(" ", "%"),
                        },
                    },
                ],
            },
            orderBy: { createdAt: "desc" },
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}

export async function updateCreateTask(
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
) {
    const { title, description, id, isPublic } = req.body;

    if (!session.user.id)
        return res
            .status(500)
            .end("O servidor falhou ao obter o ID do usuário da sessão");

    if (title.trim() === "" || description.trim() === "")
        return res.status(400).end("Título não informado");

    try {
        // CRIA OU ALTERA SE EXISTIR
        const data = await prismaClient.task.upsert({
            create: {
                title,
                description,
                isPublic,
                userId: session.user.id,
            },
            update: {
                title,
                description,
                isPublic,
                userId: session.user.id,
            },
            where: { id },
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

    if (!session.user.id)
        return res
            .status(500)
            .end("O servidor falhou ao obter o ID do usuário da sessão");

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
                .end("Registro não encontrado para o usuário logado");
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
