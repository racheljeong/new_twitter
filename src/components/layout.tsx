import React from "react";
import Link from "next/link";
import { cls } from "../libs/client/utils";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };
  
  return (
    <div>
    <div className="justify-center text-lg px-10 font-medium text-gray-800 border-b top-0 flex items-center">
    {canGoBack ? (
         <button onClick={onClick} className="absolute left-4 m-0">
         <svg
           className="w-10 h-10"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M15 19l-7-7 7-7"
           ></path>
         </svg>
       </button>
     ) : null}
      {title ? (
          <span className={cls(canGoBack ? "mx-auto" : "text-6xl text-center mt-5 font-bold text-sky-500", "")}>{title}</span>
        ) : null}
      </div>
      <div className={cls("pt-12", hasTabBar ? "my-4" : "")}>{children}</div>
      {hasTabBar ? (
        <nav className="bg-white max-w-3xl text-gray-700 border-t bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
          <Link href="/"
          className={cls(
            "flex flex-col items-center space-y-2 ",
            router.pathname === "/"
              ? "text-sky-500"
              : "hover:text-gray-500 transition-colors"
          )}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          {/* <span>홈</span> */}
      </Link>

    <Link href="/profile"
      className={cls(
        "flex flex-col items-center space-y-2 ",
        router.pathname === "/profile"
          ? "text-blue-500"
          : "hover:text-gray-500 transition-colors"
      )}
    >
    <svg
      className="w-10 h-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      ></path>
    </svg>
    </Link>
  </nav>
  ) : null}
  </div>
  );
  }