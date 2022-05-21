import { HttpMethod } from "@/types/http";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

import {
    createTask,
    deleteTask,
    getAllTasks,
    updateTask,
} from "@/lib/api/tasks";
import { authOptions } from "../auth/[...nextauth]";

async function index(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession({ req, res }, authOptions);
    if (!session) return res.status(401).end();

    const token = await getToken({ req, secret });
    if (!token) return res.status(401).end();

    switch (req.method) {
        case HttpMethod.POST:
            return await createTask(req, res, session);
        case HttpMethod.DELETE:
            return await deleteTask(req, res, session);
        case HttpMethod.GET:
            return await getAllTasks(req, res, session);
        case HttpMethod.PUT:
            return await updateTask(req, res, session);

        default:
            res.setHeader("Allow", [
                HttpMethod.GET,
                HttpMethod.POST,
                HttpMethod.PUT,
                HttpMethod.DELETE,
            ]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
export default index;
