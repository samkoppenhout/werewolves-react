import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const loggedIn = localStorage.getItem("loggedIn");
    return (
        <>
            <nav className="navbar bg-body-tertiary position-absolute top-0 start-50 translate-middle-x vw-100">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img
                            src="/images/wolf.png"
                            alt="Werewolves"
                            width="30"
                            height="24"
                        />
                    </Link>
                    {loggedIn ? (
                        <Link to="/" className="nav-link" onClick={logout}>
                            Log Out
                        </Link>
                    ) : (
                        <></>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Header;
