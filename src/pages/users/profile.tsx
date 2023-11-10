import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import useUser from "../../libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useMutation from "@/libs/client/useMutation";

interface EditProfileForm {
  name: string;
  email: string;
  formErrors?: string;
}

interface EditProfileResponse {
    ok : boolean;
    error? : string;
}

const EditProfile: NextPage = () => {

    const {user} = useUser(); //로그인여부 판단하여 protection 역할함
    console.log(`users in Edit`,{user});
    const {register, setValue,
           formState : {errors},
           handleSubmit,
           setError,
           reset,
    } = useForm<EditProfileForm>({ mode: "onChange"});

    useEffect(() => {
        if(user){
            setValue("name", user.name);
            setValue("email", user.email);
        }
    }, [user, setValue]);

    const [editProfile, {data, loading}] = useMutation<EditProfileResponse>(`/api/users/me`);
    //useMutation : []을 return하며 첫번째는 mutation 발생시키는 함수, 
    //두번째는 [] 인데 mutation에서 return한 data, error등이 담겨있다
    
    const onValid = ({name} : EditProfileForm) => {
        if(loading) return;
        if(user?.name === ""){
            setError("formErrors", {
                message : "Please fill out the form. Name are required."
            });
        }
        editProfile({name});
    }

    useEffect(() => {
        if(data && !data.ok && data.error){
            setError("formErrors", {message : data.error});
        }
    },[data, setError]);

    return (
        <Layout canGoBack title="Profile">
            <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
            <div className="flex items-center space-x-3">
                <div className="w-24 h-24 rounded-full bg-slate-400" />
                <label
                    htmlFor="picture"
                    className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
                >
                Change
                <input
                    id="picture"
                    type="file"
                    className="hidden"
                    accept="image/*"
                />
                </label>
            </div>
            
            <Input
                register={register("name", {required : "Name is required"})}
                label="name"
                name="name"
                type="text"
            />
            {errors.name? (<span className="my-2 text-red-500 text-sm">{errors.name.message}</span>) : null }

            <Input
                register={register("email", {required : "Email is required"})}
                label="Email address"
                name="email"
                type="email"
                kind="email"
                readonly
            />
            {errors.formErrors ? (
            <span className="my-2 text-red-500 font-medium text-center block">
                {errors.formErrors.message}
            </span>
            ) : null}
            <Button text="Update profile" />
        </form>
    </Layout>
      );
    };


export default EditProfile;