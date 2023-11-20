import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";


async function handler
(req:NextApiRequest, 
res:NextApiResponse<ResponseType>) {
   
    const {email} = req.body;
    console.log(`email in loginApi : ${email}`)

    const user = await client.user.findUnique({
        where: {
            email
            },
        });

        if(!user){
            return res.status(404).end();
        }
        req.session.user = {
            id: user.id
        };
        await req.session.save();
    
        return res.json({
            ok: true,
            user,
        });  
    }


export default withApiSession(
    withHandler({ methods: ["POST"], handler, isPrivate: false })
  );
