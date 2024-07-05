import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateRoom from "./pages/CreateRoom";
import EnterName from "./pages/EnterName";
import Home from "./pages/Home";
import ShowRole from "./pages/ShowRole";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import { getUserExists } from "./services/getUserExists.service";

function App() {
    const [roomCode, setRoomCode] = useState("");

    useEffect(() => {
        const checkUserId = async () => {
            if (!localStorage.getItem("id")) {
                return;
            }
            if (!(await getUserExists(localStorage.getItem("id")))) {
                localStorage.clear();
            }
        };
        checkUserId();
    });

    return (
        <>
            <Header />
            <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                <div className="row justify-content-center d-flex">
                    <div className="col">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                exact
                                path="/create-room"
                                element={<CreateRoom />}
                            />
                            <Route
                                exact
                                path="/enter-name"
                                element={
                                    <EnterName
                                        roomCode={roomCode}
                                        setRoomCode={setRoomCode}
                                    />
                                }
                            />
                            <Route
                                exact
                                path="/room/:code"
                                element={
                                    <ShowRole
                                        roomCode={roomCode}
                                        setRoomCode={setRoomCode}
                                    />
                                }
                            />
                            <Route exact path="/sign-up" element={<SignUp />} />
                            <Route exact path="/sign-in" element={<SignIn />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
