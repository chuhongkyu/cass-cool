import { Link } from "react-router-dom";

export default function Nav(){
    return(
        <nav className="nav">
            <Link to={`/home`}>
                home
            </Link>
            <Link to={`/call`}>
                call
            </Link>
            <Link to={`/play`}>
                play
            </Link>
        </nav>
    )
}