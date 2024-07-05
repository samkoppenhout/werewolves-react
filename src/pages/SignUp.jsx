import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signUp } from "../services/postSignUp.service";

function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submitActions = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("All fields are required.");
            return;
        } else {
            setError("");
        }

        try {
            await signUp(username, password);
            navigate("/sign-in");
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("loggedIn") === "true") {
            navigate("/");
        }
    }, []);

    return (
        <>
            <div className="card">
                <form onSubmit={submitActions} className="p-5">
                    <h1 className="p-0 pb-1"> Sign Up:</h1>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control form-control-lg"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button
                            type="submit"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-light btn-lg"
                        >
                            {" "}
                            Sign Up
                        </button>
                        <p className="small fw-bold mt-2 pt-1 mb-0 text-center">
                            Already have an account?{" "}
                            <a
                                onClick={() => navigate(`/sign-in`)}
                                className="link-secondary"
                            >
                                Sign In
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignUp;
