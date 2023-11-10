import { NextPage } from "next";
import Input from "@/components/input";
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

interface IDataForm {
    email : string;
}

const LogIn : NextPage = () => {


    const { register, 
            handleSubmit,
            formState : {errors},
        } = useForm<IDataForm>();

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onValid = async (data : IDataForm) => {
        console.log(`IDataForm`, data);
        

        if (!loading) {
            const request = await fetch("/api/user/log-in", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            });
            if (request.status === 200) {
              router.push("/");
            } else {
              setLoading(false);
            }
          }
    }


    return (
        <div className="mt-16 px-4">
            <h3 className="text-3xl font-bold text-center text-blue-700">Sign In</h3>
            <div className="mt-12">
            <div className="flex flex-col items-center">
                <h5 className="text-xl text-gray-500">Sign In</h5>
                <div className="grid border-b  w-full mt-8 grid-cols-2 "></div>
            </div>
            <form
                onSubmit={handleSubmit(onValid)}
                className="flex flex-col mt-8 space-y-4"
            >
            <Input
                register={register("email", {
                required: true,
                })}
                name="email"
                label="Email address"
                type="email"
            />
            <Button text={loading ? "Loading" : "Sign In"} />
        </form>
      </div>
    </div>
      );
}

export default LogIn;