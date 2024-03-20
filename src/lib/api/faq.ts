import prismaClient from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

export async function findAll(
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

        const data = await prismaClient.faq.findMany({
            where: {
                userId: session.user.id,
                OR: [
                    {
                        title: {
                            contains: search?.replace(" ", "%"),
                            mode: "insensitive",
                        },
                    },
                    {
                        keywords: {
                            contains: search?.replace(" ", "%"),
                            mode: "insensitive",
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

export async function updateOrCreate(
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
) {
    const { title, description, id, isPublic, keywords } = req.body;

    if (!session.user.id)
        return res
            .status(500)
            .end("O servidor falhou ao obter o ID do usuário da sessão");

    if (title.trim() === "" || description.trim() === "")
        return res.status(400).end("Título não informado");

    try {
        // CRIA OU ALTERA SE EXISTIR
        const data = await prismaClient.faq.upsert({
            create: {
                title,
                description,
                isPublic,
                keywords,
                userId: session.user.id,
            },
            update: {
                title,
                description,
                isPublic,
                keywords,
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

export async function remove(
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
        const faq = await prismaClient.faq.findFirst({
            where: {
                id,
                userId: session.user.id,
            },
        });

        if (!faq) {
            return res
                .status(400)
                .end("Registro não encontrado para o usuário logado");
        }

        await prismaClient.faq.delete({
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
