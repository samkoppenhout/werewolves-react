import { useNavigate } from "react-router-dom";
import { createRoom } from "../services/putCreateRoom.service";
import { useState } from "react";
import { joinRoomSignedIn } from "../services/postJoinRoomSignedIn.service";

function Home() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");

    const loggedIn = localStorage.getItem("loggedIn");

    const submitActions = async (e) => {
        e.preventDefault();
        try {
            if (localStorage.getItem("loggedIn") === "true") {
                await joinRoomSignedIn(
                    roomCode,
                    localStorage.getItem("accessToken")
                );
            }
            navigate(`/room/${encodeURIComponent(roomCode)}`);
            setRoomCode("");
        } catch (e) {
            setError(e.message);
        }
    };

    const signInActions = () => {
        navigate("/sign-in");
        setRoomCode("");
    };

    const signUpActions = () => {
        navigate("/sign-up");
        setRoomCode("");
    };

    const createRoomActions = () => {
        createRoom(localStorage.getItem("accessToken"));
        navigate("/create-room");
        setRoomCode("");
    };

    return (
        <>
            <div className="card p-5">
                <h1>Enter room code:</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form className="form" onSubmit={submitActions}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            className="form-control"
                            id="inputLocation"
                            aria-describedby="promptSpace"
                            placeholder="Enter a room code..."
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-light mx-2">
                        Go
                    </button>
                </form>
            </div>
            {!loggedIn ? (
                <div className="row pt-4 px-3 justify-content-center">
                    <div className="col">
                        <button
                            type="signIn"
                            className="btn btn-light mx-2"
                            onClick={signInActions}
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="col text-end">
                        <button
                            type="Up"
                            className="btn btn-light mx-2"
                            onClick={signUpActions}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="row pt-4 px-3 justify-content-center">
                        <div className="col row justify-content-center">
                            <button
                                type="createRoom"
                                className="btn btn-light mx-2"
                                onClick={createRoomActions}
                            >
                                Create Room
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Home;
