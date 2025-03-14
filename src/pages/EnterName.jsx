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
                    <div className="form-group text-center">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="form-control"
                                    id="inputLocation"
                                    aria-describedby="promptSpace"
                                    placeholder="Enter a username..."
                                    required
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center mt-2">
                            <div className="col-auto">
                                <button type="submit" className="btn btn-light">
                                    Go
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

EnterName.propTypes = {
    roomCode: PropTypes.string.isRequired,
};

export default EnterName;
