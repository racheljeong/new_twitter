import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";

const Wrapper = styled.div`
    background-color: white;
    height: 100vh;
`;

export default function Home() {

    return (
        <Wrapper>
             <PostTweetForm />
         </Wrapper>
    
    );
}