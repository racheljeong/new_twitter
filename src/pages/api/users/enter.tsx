import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";



async function handler

  (req:NextApiRequest, 
  res:NextApiResponse<ResponseType>) {
   
   const {email, name} = req.body;
   console.log(`email : ${email} name, ${name}`);

    const alreadyEx = await client.user.findUnique ({
        where : {
          email,
        }
    });
    if(alreadyEx) {
      console.log(`already existed`);
      return res.json({
        ok: true, 
    });
    }

    const findUser = await client.user.create({
    
        data : {
          name, 
          email
        },
    });

    if(findUser){
      res.status(200).end();
    }

    console.log(`findUser`,findUser);
      
      return res.json({
          ok: true,
      });  
  }
   

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
//1  handler function 작성 : handler
//2  export default function(HTTP method, handler funcion)
//3  withHandler의 역할은 HTTP method 보내는걸 대신 해줌