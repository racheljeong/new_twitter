import { PrismaClient } from "@prisma/client";
//client가 계속 생성되는것 방지. db연결에 한계가 있음
//처음실행시 global.client가 없으면 new PrismaClient();로 생성됨

declare global {
    var client : PrismaClient | undefined
}

const client = global.client || new PrismaClient();
if(process.env.NODE_ENV === "development") global.client = client;


export default client;
