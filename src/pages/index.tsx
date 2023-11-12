import type { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "../../src/components/floating-button";
import Layout from "../../src/components/layout";
import useUser from "@/libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Posts } from "@prisma/client";
import posts from "./api/posts";
import Item from "../../src/components/postItem";

interface PostsResponse {
  ok: boolean;
  posts: Posts[];  //Posts types coming from Prisma
}

const Live: NextPage = () => {
  //useSWR을 사용하여 데이터를 읽어온다
  const {data} = useSWR<PostsResponse>("/api/posts");
  console.log(`home : posts`, data);

  const {user, isLoading } = useUser();
  return (
    <Layout hasTabBar title="Twitter" >
      <Head>
        <title>
          Home
        </title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
      {data?.posts?.map((posts) => (
        <Item
          id={posts.id}
          key={posts.id}
          title={posts.name}
          comments={1}
          hearts={1}
      />
      ))}
      <FloatingButton href="/posts/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </div>
    </Layout>
  );
};
export default Live;