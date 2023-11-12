import { NextPage } from "next";
import Input from "@/components/input";
import Button from "@/components/button";
import Layout from "@/components/layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useMutation from "../libs/client/useMutation";

interface IDataForm {
    email : string;
}

interface MutationResult {
  ok: boolean;
  error? : boolean;
}

const LogIn : NextPage = () => {

  const [login, { loading, data }] = 
            useMutation<MutationResult>("/api/users/log-in");

  const { register, 
          handleSubmit,
          formState : {errors},
        } = useForm<IDataForm>();

    //const [isLoading, setLoading] = useState(false);
    const router = useRouter();
   

    const onValid = async (data : IDataForm) => {
        console.log(`IDataForm`, data);
        if (loading) return;
        login(data);
    }

    useEffect(() => {
      console.log(data);
      if (data?.ok) {
        alert("Login Seccess");
        router.replace("/");

      } else if (data?.error) {
        alert("Login Failed");
      }
    }, [data, router]);


  //     if (!loading) {
  //         const request = await fetch("/api/users/log-in", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json"
  //           },
  //           body: JSON.stringify(data)
  //         });
  //         if (request.status === 200) {
  //           router.push("/");
  //         } else {
  //           setLoading(false);
  //         }
  //       }
  // }


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
                  required: "Email is reuired.",
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
};

export default LogIn;