import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
    //트윗 컬럼 타입
    id : string;
    photo? : string;
    tweet : string;
    userId : string;
    username : string;
    createdAt : number;
}

const Wrapper = styled.div`
    display: flex;
    gap : 10px;
    flex-direction: column;
    //overflow-y: scroll;
`;

export default function Timeline() {
    let unsubscribe : Unsubscribe | null = null;
    const [tweets, setTweets] = useState<ITweet[]>([]);
    useEffect(()=> {
        const fetchTweets = async() => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createdAt", "desc"),
                limit(10)
                //tweets라는 컬렉션을 가져와서 최신순으로 정렬
            );
            // const querySnapshot = await getDocs(tweetsQuery);
            // const tweets = querySnapshot.docs.map((doc) => {
            //     const {tweet, createdAt, userId, username, photo} = doc.data();
            //     //docId는 별도의 필드가 없으므로 지정함
            //     return {tweet, createdAt, userId, username, photo, id : doc.id}
            //     //ITweet에 부합한 트윗객체 리턴
            // });

            //connect to EventListener
            unsubscribe = await onSnapshot(tweetsQuery,(snapshot) => {
                const tweets = snapshot.docs.map((doc)=> {
                        const {tweet, createdAt, userId, username, photo} = doc.data();
                        //docId는 별도의 필드가 없으므로 지정함
                        return {tweet, createdAt, userId, username, photo, id : doc.id}
                        //ITweet에 부합한 트윗객체 리턴
                    });
                    setTweets(tweets);
                    console.log(tweets);
                });
            }; 
        fetchTweets();
        //useEffect의 tear down, cleanup 기능
        //유저가 해당 컴포넌트를 사용하지않을때 이 함수를 호출
        //unsubscribe : 사용하지 않을경우 이벤트 자체를 끈다고 생각하면됨
        return () => {
            unsubscribe && unsubscribe();
        }
    },[])
    //useEffect에서 fetchTweets 리턴할때 unsubscribe func을 호출
    return <Wrapper>
        {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>)}
    </Wrapper>;

}