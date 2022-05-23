import { HttpMethod } from "@/types/http";
import { NextApiRequest, NextApiResponse } from "next";
import { publicTasks } from "@/lib/api/public/publicTasks";

export default async function publicTasksApi(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case HttpMethod.GET:
            return await publicTasks(req, res);

        default:
            res.setHeader("Allow", [HttpMethod.GET]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
