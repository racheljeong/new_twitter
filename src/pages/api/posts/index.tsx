import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import {withIronSessionApiRoute} from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
 
    if(req.method === "GET") {
        const posts = await client.posts.findMany({})
        
        res.json({ 
            ok :true,
            posts
        });
    }
    

    if(req.method === "POST") {
        
        const {body : {name, contents},
              session : {user}
          } = req;


        const posts = await client.posts.create({
            data : {
                name,
                contents,
                image : "xx",
                user : {
                    connect : {
                        id : user?.id,
                    },
                },
            },
        });

        res.json({ 
            ok :true,
            posts,
        });
    }

}

//private = true일때만 호출가능
//2개이상의 인자가 있다면 객체로 설정값들을 보내준다(클린코드)
//export default withApiSession(withHandler("GET", handler, true));
export default withApiSession(
  withHandler({
    methods: ["GET","POST"],
    handler,
  })
);