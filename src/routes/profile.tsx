import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;
const AvatarrUpload = styled.label`
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    background-color: #1d9bf0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
    width: 50px;
    }
`;
const AvatarImg = styled.img`
    width: 100%;
`;
const AvatarInput = styled.input`
    display: none;
`;
const Name = styled.span`
    font-size: 22px;
`;

const NameInput = styled.input`
    border: none;
    border-radius: 15px;
`;

const TweetsContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const NameEditBtn = styled.button`
    background-color: white;
    color: #4e4e4e;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`;

export default function Profile() {

    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [name, setName] = useState(user?.displayName ?? "Anonymous");
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const [editYn, setEditYn] = useState(false);
    
    const avatarChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        
        const {files} = e.target; //e.target.files

        if(!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            //location찾고 - byte로 업로드 - url로 다운받아 보여준다
            //경로를 userId로 지정 - 동일한파일이더라도 user가 동일하면 파일자체가 교체됨(중복파일금지)            
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL : avatarUrl,
            });

        }
    }
    const fetchTweets = async() => {
        const tweetQuery = query(
            collection(db, "tweets"),
            where("userId", "==" , user?.uid), //storage userId필드값과 같은 uid 찾기
            orderBy("createdAt", "desc"),
            limit(10)    
        //firebase에서는 필터링을 제공하지 않음, 브라우저 에러에서 제공하는 url을 통해 필터링만들어야힘
        );
        const snapShot = await getDocs(tweetQuery);
        const tweets = snapShot.docs.map((doc) => {
            const {tweet, createdAt, userId, username, photo} = doc.data();
            return {tweet, createdAt, userId, username, photo, id:doc.id};
        });
        setTweets(tweets);
    };

    useEffect(() => {
        fetchTweets();
    },[]);

    const nameEdit = async() => {
        setEditYn((prev) => !prev);
        if(!editYn){
            const ok = confirm("Do you want to edit?");
        }
        if(!name || !user || !editYn) return
   
        try {
            await updateProfile(user, { displayName : name});
            //setName(nameChanged);
        } catch (error) {
            console.log(error);            
        } finally {
            setEditYn(false);
        }
        
    }

    const changeName = (e : React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    // const setEditMode = (prev) => {
    //     setEditYn((prev)=> !prev);
    // }
    return (
        <Wrapper>
            <AvatarrUpload htmlFor="avatar">
                {avatar ? (<AvatarImg src={avatar}/>) 
                : (<svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    >
                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                    </svg>
                )}
                
            </AvatarrUpload>
            <AvatarInput onChange={avatarChange}  
                         id="avatar"
                         type="file"
                         accept="image/*"/>
            <Name>{name}</Name>
            {editYn &&
                <NameInput onChange={changeName} value={name} />             
            }
            <NameEditBtn onClick={nameEdit}>{editYn ? "Save" : "Edit"}</NameEditBtn>
            <TweetsContainer>
                {tweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
            </TweetsContainer>
        </Wrapper>
    );
}