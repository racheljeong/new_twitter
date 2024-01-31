import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;



export default function PostTweetForm() {

    const [isLoading, isSetLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File|null>(null);
    
    const onChange = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    }

    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //e.target.file
        const { files } = e?.target;
        
        if(files && files.length === 1){
            //setFile(files[0]);
            const chosenFile = files[0];
            const maxFileSize = 1 * 1024 * 1024; //1MB
            if(chosenFile.size >= maxFileSize){
              //console.log(chosenFile.size);
              alert("The maximum file size is 1MB");
              return;
            }
            setFile(chosenFile);
        }
    }

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>)=> {
      e.preventDefault();
      const user = auth.currentUser;
      if(!user || isLoading || tweet === "") return;

      try{
        isSetLoading(true);
        //firebase SDK 어떤 컬렉션에 어떤 docs를 추가할지
        const doc = await addDoc(collection(db, "tweets"), {
          tweet,
          createdAt: Date.now(),
          username : user.displayName || "Anonymous",
          userId : user.uid,
        });
        //file 첨부여부 확인
        if(file){
         
          //업로드 파일의 폴더명, 파일명 지정 : userId/docId 로 빠르게 crud가능
          const locationRef = ref(
            storage, 
            `tweets/${user.uid}-${user.displayName}/${doc.id}`
            );
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref); //result의 public URL return

          //업로드할 doc,data를 인자로 넘긴다
          await updateDoc(doc, {
            photo : url,
          });
        }
        setTweet("");
        setFile(null);
      }catch(e){
        console.log(e);
      }finally {
        isSetLoading(false);
      }

    }

    return (
        <Form onSubmit={onSubmit}>
            <TextArea required rows={5} maxLength={180} value={tweet} onChange={onChange} placeholder="Whassup" />
            <AttachFileButton htmlFor="file">{file? "Added✅" : "Add"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={isLoading ? "Posting.." : "Post Tweet"}/>
        </Form>
    );
}