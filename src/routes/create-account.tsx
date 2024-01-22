import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FirebaseError } from "firebase/app";


export default function CreateAccount() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;
      if (name === "name") {
        setName(value);
      } else if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      }
    };
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      if (isLoading || name === "" || email === "" || password === "") return;
      try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
            navigate("/");
        } catch (e) {
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
    <Wrapper>
        <Title>Join X</Title>
        <Form onClick={onSubmit}>
            <Input name="name" placeholder="Name" type="text" required onChange={onChange}/>
            <Input name="email" placeholder="Email" type="email" required onChange={onChange}/>
            <Input name="password" placeholder="Password" type="password" required onChange={onChange}/>
            <Input type="submit" value={isLoading ? "Loading..." : "Create Account"}/>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Already have one?<Link to ="/login">Create one &rarr;</Link>
        </Switcher>
    </Wrapper>
    )
}