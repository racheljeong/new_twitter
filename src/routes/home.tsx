import { auth } from "../firebase";


export default function Home() {

    //firebase logout
    const logout = (() => {
        auth.signOut();
    })
    return (
    <h1>Home
        <button onClick={logout}>Log out</button>
    </h1>
    );
}