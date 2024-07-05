import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoom } from "../services/getRoom.service";
import { startGame } from "../services/postStartGame.service";
import { closeRoom } from "../services/postCloseRoom.service";

function CreateRoom() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState("");
    const [werewolfPercentage, setWerewolfPercentage] = useState(0.25);
    const [isOwnerPlaying, setIsOwnerPlaying] = useState(true);
    const [playersArray, setPlayersArray] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [reload, setReload] = useState(true);

    const fetchRoom = async () => {
        let data = {
            room_code: "",
            settings: { werewolf_ratio: 0.25, owner_is_playing: true },
        };
        try {
            data = await getRoom(localStorage.getItem("accessToken"));
            setRoomCode(data.room_code);
            setWerewolfPercentage(data.settings.werewolf_ratio);
            setIsOwnerPlaying(data.settings.owner_is_playing);
            setPlayersArray(data.players);
        } catch (error) {
            console.error("Failed to fetch room info:", error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("loggedIn") != "true") {
            navigate("/");
            return;
        }

        fetchRoom();
    }, [reload]);

    useEffect(() => {
        let newTableRows = playersArray.map((player, index) => (
            <p className="text-start px-3" key={player.user_id}>
                {index + 1}: {player.username}
            </p>
        ));
        setTableRows(newTableRows);
    }, [playersArray]);

    const closeRoomActions = async () => {
        await closeRoom(localStorage.getItem("accessToken"));
        navigate(`/`);
    };

    const submitActions = async (e) => {
        e.preventDefault();
        const settings = {
            werewolf_ratio: werewolfPercentage,
            owner_is_playing: isOwnerPlaying,
        };
        await startGame(localStorage.getItem("accessToken"), settings);
        navigate(`/room/${roomCode}`);
    };

    return (
        <>
            <div className="card px-5 py-2 text-center">
                <div className="row">
                    <h5>Game code: {roomCode}</h5>
                </div>
                <div className="row card">
                    <h4 className="p-0 pt-2 m-0">Players:</h4>
                    {tableRows}
                </div>
                <div className="row text-start">
                    <form onSubmit={submitActions}>
                        <div className="col-auto">
                            <label
                                htmlFor="werewolfPercentage"
                                className="col-form-label"
                            >
                                Percentage of Werewolves:
                            </label>
                        </div>
                        <div className="col-auto">
                            <input
                                type="number"
                                id="werewolfPercentage"
                                className="form-control"
                                placeholder={werewolfPercentage}
                                min="0"
                                max="1"
                                step="any"
                                value={werewolfPercentage}
                                onChange={(e) =>
                                    setWerewolfPercentage(e.target.value)
                                }
                            />
                        </div>
                        <div className="my-2">
                            <label
                                className="form-check-label"
                                htmlFor="isOwnerPlaying"
                            >
                                Owner playing?
                            </label>
                            <input
                                className="form-check-input mx-2"
                                type="checkbox"
                                value=""
                                checked={isOwnerPlaying}
                                id="isOwnerPlaying"
                                onChange={(e) =>
                                    setIsOwnerPlaying(e.target.checked)
                                }
                            />
                        </div>
                        <div className="row">
                            <button
                                type="submit"
                                className="btn btn-light mx-2"
                            >
                                Start Game
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row pt-4 px-3">
                <div className="col">
                    <button
                        type="closeRoom"
                        className="btn btn-light ml-2"
                        onClick={closeRoomActions}
                    >
                        Close Room
                    </button>
                </div>
                <div className="col text-end">
                    <button
                        type="Up"
                        className="btn btn-light mr-2"
                        onClick={() => {
                            setReload(!reload);
                        }}
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateRoom;
