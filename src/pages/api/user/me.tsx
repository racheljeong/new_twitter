import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import {withIronSessionApiRoute} from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

//로그인 상태가 아니라면 아래 코드는 실행되지 않아야하므로
//wrapper function으로 다시 한번 감싸준다
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  
  console.log(`req.session.user`, req.session.user);
  
  const profile = await client.user.findUnique({
    where: {id: req.session.user?.id},
  });

  res.json({ 
    ok :true,
    profile,
});
}

//private = true일때만 호출가능
//2개이상의 인자가 있다면 객체로 설정값들을 보내준다(클린코드)
//export default withApiSession(withHandler("GET", handler, true));
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);