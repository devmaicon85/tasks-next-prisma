import prismaClient from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export async function publicFaq(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { search, key, per_page } = req.query;

        if (Array.isArray(search)) {
            return res.status(400).end("Busca inválida");
        }

        if (Array.isArray(key)) {
            return res.status(400).end("Key inválido");
        }

        const data = await prismaClient.faq.findMany({
            where: {
                userId: key,
                isPublic: true, // SOMENTE FAQ PUBLICAS
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
            select: {
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
            },

            skip: 0,
            take: Number(per_page ?? 2),

            orderBy: { createdAt: "desc" },
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}
