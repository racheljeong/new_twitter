import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import {withIronSessionApiRoute} from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  
  console.log(`req.session`, req.session);
  const { token } = req.body;
  //토큰이 있다면 return, 없다면 404
  const foundToken = await client.token.findUnique({
    where : {
      payload : token
    },
});
  
  if(!foundToken) return res.status(404).end();
  
  req.session.user = {
    id : foundToken.userId,
  }
  await req.session.save();
  //토큰 찾고나서 삭제처리 필요 -> 무거워짐
  await client.token.deleteMany({
     where : {
      userId : foundToken.userId,
     },
  });
  res.json({ok : true});
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);