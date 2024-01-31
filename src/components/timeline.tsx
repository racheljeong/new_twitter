import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
    //트윗 컬럼 타입
    id : string;
    photo? : string;
    tweet : string;
    userId : string;
    username : string;
    createdAt : number;
}

const Wrapper = styled.div``;

export default function Timeline() {

    const [tweets, setTweets] = useState<ITweet[]>([]);
    const fetchTweets = async() => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc")
            //tweets라는 컬렉션을 가져와서 최신순으로 정렬
        );
        const querySnapshot = await getDocs(tweetsQuery);
        const tweets = querySnapshot.docs.map((doc) => {
            const {tweet, createdAt, userId, username, photo} = doc.data();
            //docId는 별도의 필드가 없으므로 지정함
            return {tweet, createdAt, userId, username, photo, id : doc.id}
            //ITweet에 부합한 트윗객체 리턴
        });
        setTweets(tweets);
        console.log(tweets);
    }
    useEffect(()=> {
        fetchTweets();
    },[])
    
    return <Wrapper>
        {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>)}
    </Wrapper>;
}