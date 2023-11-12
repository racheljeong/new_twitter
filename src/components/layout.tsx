import React from "react";
import Link from "next/link";
import { cls } from "../libs/client/utils";
import { useRouter } from "next/router";
import useUser from "@/libs/client/useUser";

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

  //const { user } = useUser(); 
  
  return (
    <div>
    <div className="justify-center text-lg px-10 py-4 font-medium text-gray-800 border-b top-0 flex items-center">
    <div className="flex justify-center items-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-20 w-20 fill-sky-500 items-center"
          viewBox="0 0 512 512">
          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
        </svg>
      </div>
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
          <span className={cls(canGoBack ? "text-4xl text-center mt-5 font-bold text-sky-500" : "text-6xl text-center mt-5 font-bold text-sky-500", "")}>{title}</span>
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
      </Link>

      <Link href={`/users/id`}
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
    </svg>
      </Link>
  </nav>
  ) : null}
  </div>
  );
  }