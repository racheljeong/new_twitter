import {withIronSessionApiRoute} from "iron-session/next";
//wrapper class

declare module "iron-session" {
    interface IronSessionData {
       user? : {
         id : number;
       };
    }
 }
 
const cookieOptions = {
    cookieName : "carrotSession",
    password : process.env.COOKIE_PASSWORD!,
};
//1. api routes에서 session을 받아오기위한 function
//2. page rendering할때 Next.js의 Server Side Rendering 에서 session을 받아오는 function
export function withApiSession(fn :any) {
    return withIronSessionApiRoute(fn, cookieOptions);
}