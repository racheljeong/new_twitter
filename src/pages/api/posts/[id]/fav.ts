import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";
import client from "../../../../libs/server/client";
import { withApiSession } from "../../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
//productId가 query의 id와 같을뿐 아니라 
//userId가 session의 user.id와 같은 fav 데이터를 찾는중이다
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await client.fav.findFirst({
    where: {
      postsId: Number(id),  // = product의 id
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    //delete는 unique에 의해서만 삭제가능하다
    // -> fav 데이터의 id에 의해서만 가능
    //unique가 없다면 await client.fav.deleteMany 사용 
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        posts: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);