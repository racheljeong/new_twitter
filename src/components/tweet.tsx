import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 15px;
`;

const Column = styled.div`
    &:last-child {
    place-self: end;
  }
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
`;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
`;

const DeleteButton = styled.button`
    background-color: white;
    color: tomato;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`;

const EditButton = styled.button`
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

const ButtonDiv = styled.div`
    display: flex;
    gap: 5px;
`;

export default function Tweet({username, photo, tweet, userId, id} : ITweet) {
    const user = auth.currentUser;

    const onDelete = async() => {
        const ok = confirm("Do you want to delete ?");
        if(!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "tweets", id));
            //db 내에 tweets 컬렉션에 있고, 동일한 id를가진 doc을 삭제하겠다
            //이미지 삭제 : 저장시  `tweets/${user.uid}-${user.displayName}/${doc.id}`
            if(photo){
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    }

    const onEdit = async() => {
        const ok = confirm("Do you want to edit ?");
        if(!ok || user?.uid !== userId) return;
        try {
            const updated = doc(db, "tweet", id); 
            //원글 가져오기
            //추가할 트윗내용
            //추가
            await updateDoc(updated, {tweet : "abc"});
        }catch(e) {
            console.log(e);
        }finally{

        }
    }
    return (
        <Wrapper>
            <Column>
                <Username>{username}</Username>
                <Payload>{tweet}</Payload>
                {user?.uid === userId ? 
                <ButtonDiv>
                    <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                    <EditButton onClick={onEdit}>Edit</EditButton>
                </ButtonDiv> 
                : null }
            </Column>
            <Column>
                {photo ? <Photo src={photo}/> : null }
            </Column>
        </Wrapper>
    );

}