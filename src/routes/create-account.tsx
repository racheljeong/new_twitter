import styled from "styled-components"

const Wrapper = styled.div``;

const Form = styled.form``;
const Input = styled.input``;

export default function CreateAccount() {


    
    return (
    <Wrapper>
        <h1>CreateAccount</h1>
        <Form>
            <Input name="name" placeholder="Name" type="text" required/>
            <Input name="email" placeholder="Email" type="email" required/>
            <Input name="password" placeholder="Password" type="password" required/>
            <Input type="submit" value="Create Account"/>
        </Form>
    </Wrapper>
    )
}