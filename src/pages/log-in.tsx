import { NextPage } from "next";
import Input from "@/components/input";
import Button from "@/components/button";
import Layout from "@/components/layout";
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
            const request = await fetch("/api/users/log-in", {
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
      <Layout canGoBack title="Sign In">
        <div className="mt-16 px-4">
            <div className="mt-12">
              <form
                  onSubmit={handleSubmit(onValid)}
                  className="flex flex-col mt-8 space-y-8"
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
    </Layout>
      );
}

export default LogIn;