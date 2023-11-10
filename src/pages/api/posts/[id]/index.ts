import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import {withIronSessionApiRoute} from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {

    //쿼리에서 id를 받고 session에서 user 받아오기
    const {query : {id}, session : {user}} = req;

    const posts = await client.posts.findUnique({
        where : {
            id : Number(id),
        },
        include : {
            user : {
                select : {
                    id : true,
                    name : true,
                    avatar : true,
                },
            },
        },
    });
    console.log(posts);
    
    const terms = posts?.name.split(" ").map((word) => ({
        //obj로 리턴할거임
        name : {
            contains : word,
        }
    }));

    const relatedPosts = await client.posts.findMany({
        where : {
            OR : terms,
            AND : {
                id : {
                    not : posts?.id,
                }
            }
        },
        take : 4   //UI에서 그리는 갯수를 여기서 같이담아줌
    });
    console.log(`relatedPosts`, relatedPosts);

    const isLiked = Boolean(
        await client.fav.findFirst({
          where: {
            postsId: posts?.id,
            userId: user?.id,
          },
          select: {
            id: true,
          },
        })
      );

    res.json({ok : true , posts, isLiked, relatedPosts});
 
}


export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
