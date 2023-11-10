import { NextPage } from "next";
import Layout from "@/components/layout";
import Link from "next/link";
import Button from "@/components/button";


const Profile : NextPage = () => {

return (
    <Layout canGoBack>
    <div className="px-4  py-4">
    <div className="mb-8">
      <div className="h-96 bg-slate-300" />
      <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-slate-300" />
      </div>
        <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900"></h1>
            <p className=" my-6 text-gray-700"></p>
            <div className="flex items-center justify-between space-x-2"></div>
        </div>
      </div>
    </div>
  </Layout>
  );
}

export default Profile;