import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRole } from "../services/getRole.service";
import { getRoom } from "../services/getRoom.service";
import { endGame } from "../services/postEndGame.service";
import { closeRoom } from "../services/postCloseRoom.service";
import { leaveRoom } from "../services/postLeaveRoom.service";
import { getUserExists } from "../services/getUserExists.service";

function ShowRole({ setRoomCode }) {
    const { code } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [reload, setReload] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [getRoleError, setGetRoleError] = useState(null);
    const [hasJoined, setHasJoined] = useState(false);

    useEffect(() => {
        setRoomCode(code);
        setHasJoined(false);
        if (!localStorage.getItem("id")) {
            navigate("/enter-name");
            return;
        }
        setHasJoined(true);
        const checkOwner = async () => {
            let room = null;
            if (localStorage.getItem("accessToken")) {
                room = await getRoom(localStorage.getItem("accessToken"));
            }
            if (room) {
                setIsOwner(true);
            }
        };
        checkOwner();
    }, []);

    // useEffect(() => {
    //     const unmountAction = async () => {
    //         console.log("leaving game");
    //         if (localStorage.getItem("accessToken")) {
    //             await closeRoom(localStorage.getItem("accessToken"));
    //         } else {
    //             await leaveRoom(localStorage.getItem("id"));
    //             localStorage.clear();
    //         }
    //     };
    //     return () => {
    //         unmountAction();
    //     };
    // }, []);

    useEffect(() => {
        setGetRoleError(null);
        const fetchRole = async () => {
            let data = null;
            try {
                data = await getRole(localStorage.getItem("id"));
                setRole(data.role);
                setUsername(data.username);
            } catch (error) {
                setGetRoleError(error);
            }
        };

        const clearTempUserId = async () => {
            const userId = localStorage.getItem("id");
            const userExists = await getUserExists(userId);

            if (!userExists) {
                localStorage.clear();
            }

            if (!userExists && hasJoined) {
                navigate("/");
            }
        };

        clearTempUserId();
        fetchRole();
    }, [reload]);

    const leaveGameAction = async () => {
        if (!(await getUserExists(localStorage.getItem("id")))) {
            localStorage.clear();
            navigate("/");
            return;
        }
        if (localStorage.getItem("accessToken")) {
            await closeRoom(localStorage.getItem("accessToken"));
        }
        if (localStorage.getItem("id")) {
            await leaveRoom(localStorage.getItem("id"));
            localStorage.clear();
        }
        navigate("/");
    };

    const endGameAction = async () => {
        await endGame(localStorage.getItem("accessToken"));
        navigate("/create-room");
    };
    const refresh = () => {
        setReload(!reload);
    };

    return (
        <>
            <div className="card p-5 text-center">
                {getRoleError ? (
                    <h3>{getRoleError.message}</h3>
                ) : (
                    <>
                        <h3>{username}</h3>
                        <h3>You are a...</h3>
                        <h1>{role}!</h1>
                    </>
                )}
            </div>
            <div className="row pt-4 px-3">
                <div className="col">
                    {isOwner ? (
                        <button
                            type="signIn"
                            className="btn btn-light mx-2"
                            onClick={endGameAction}
                        >
                            End Game
                        </button>
                    ) : (
                        <button
                            type="signIn"
                            className="btn btn-light mx-2"
                            onClick={leaveGameAction}
                        >
                            Leave Game
                        </button>
                    )}
                </div>
                <div className="col text-end">
                    <button
                        type="Up"
                        className="btn btn-light mx-2"
                        onClick={refresh}
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </>
    );
}

ShowRole.propTypes = {
    setRoomCode: PropTypes.func.isRequired,
};

export default ShowRole;
