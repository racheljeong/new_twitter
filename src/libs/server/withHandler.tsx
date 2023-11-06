//helper function
//Next.js에서 api route 만들때 꼭 export default 처리 필요
// == function을 return 해야함!!
//-> Next.js에서 api route를 만들 때는 function을 리턴해야함
//그러면 nextJs가 사용자가 url 호출할때 그 func를 실행하고 
//req, res를 전달해준다
//여기서 withHandler는 handler의 껍데기 역할을 한다.
//withHandler안에서 커스터마이징 한 func을 리턴한 func를 handler에서 가져다쓰는중

import { NextApiRequest, NextApiResponse } from "next"

export interface ResponseType {
    ok : boolean,
    [key : string] : any;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
    methods: method[];
    handler : (req:NextApiRequest, res:NextApiResponse) => void;
    isPrivate? : boolean;
}


export default function withHandler({
    methods, isPrivate = true, handler} : ConfigType) {

//1.HTTP method, 2. handler funcion to excute

    return async function(req:NextApiRequest, res:NextApiResponse) : Promise<any>
    {
    //nextJS가 실행할 함수
        if (req.method && !methods.includes(req.method as any)) {
            return res.status(405).end();
        }
        if(isPrivate && !req.session.user){
            return res.status(401).json({ ok: false, error: "Plz log in." });        }
        try {
            await handler(req, res);
        } catch (error) {
            console.log(`error`,error);
            return res.status(500).json({ error });
        }
    }
}