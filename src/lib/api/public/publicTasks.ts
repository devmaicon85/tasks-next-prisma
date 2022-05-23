import prismaClient from "@/lib/prismaClient";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";

export async function publicTasks(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { search, key } = req.query;

        if (Array.isArray(search)) {
            return res.status(400).end("Busca inválida");
        }

        if (Array.isArray(key)) {
            return res.status(400).end("Key inválido");
        }

        const data = await prismaClient.task.findMany({
            where: {
                userId: key,
                isPublic: true, // SOMENTE TASKS PUBLICAS
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
            select: {
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}
