import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { joinRoomTemp } from "../services/postJoinRoomTemp.service";

function EnterName({ roomCode }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("id")) {
            navigate(`/room/${roomCode}`);
        }
    }, []);

    const submitActions = async (e) => {
        e.preventDefault();
        try {
            let response = await joinRoomTemp(roomCode, username);
            localStorage.setItem("id", response.details._id);
            navigate(`/room/${roomCode}`);
            setUsername("");
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <>
            <div className="card p-5">
                <h1>Enter a username:</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form className="form" onSubmit={submitActions}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            id="inputLocation"
                            aria-describedby="promptSpace"
                            placeholder="Enter a username..."
                        />
                    </div>
                    <button type="submit" className="btn btn-light mx-2">
                        Go
                    </button>
                </form>
            </div>
        </>
    );
}

EnterName.propTypes = {
    roomCode: PropTypes.string.isRequired,
};

export default EnterName;
