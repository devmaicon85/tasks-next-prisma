import { publicFaq } from "@/lib/api/public/publicFaq";
import { HttpMethod } from "@/types/http";
import { NextApiRequest, NextApiResponse } from "next";

export default async function publicFaqApi(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case HttpMethod.GET:
            return await publicFaq(req, res);

        default:
            res.setHeader("Allow", [HttpMethod.GET]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
