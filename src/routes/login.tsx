import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";

export default function Login() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;
     if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      }
    };
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      if (isLoading || email === "" || password === "") return;
      try {
            setLoading(true);
            await signInWithEmailAndPassword(auth,email,password);
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
        <Title>Login X</Title>
        <Form onClick={onSubmit}>
            <Input name="email" placeholder="Email" type="email" required onChange={onChange}/>
            <Input name="password" placeholder="Password" type="password" required onChange={onChange}/>
            <Input type="submit" value={isLoading ? "Loading..." : "Login"}/>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Don't have an account?<Link to ="/create-account">Create one &rarr;</Link>
        </Switcher>
    </Wrapper>
    )
}

