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

  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });

    //res 죽이기위해 return 추가
    return res.json({
      ok: true,
      profile,
    });
  }

  

  // if (req.method === "POST") {
  //   const { session: { user }, body: { name },} = req;

  //   const currentUser = await client.user.findUnique({
  //     where: {
  //       id: user?.id,
  //     },
  //   });

  //   if (name && name !== currentUser?.name) {
  //       //변경하려는 로직
  //     const alreadyExists = Boolean(
  //       await client.user.findUnique({
  //         where: {
  //           name,
  //         },
  //         select: {
  //           id: true,
  //         },
  //       })
  //     );

  //     if (alreadyExists) {
  //       return res.json({
  //         ok: false,
  //         error: "Name already taken.",
  //       });
  //     }

  //     await client.user.update({
  //       where: {
  //         id: user?.id,
  //       },
  //       data: {
  //         name,
  //       },
  //     });
  //     res.json({ ok: true });
   
  //   }
  // }
}



export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);