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
//1  handler function 작성 : handler
//2  export default function(HTTP method, handler funcion)
//3  withHandler의 역할은 HTTP method 보내는걸 대신 해줌