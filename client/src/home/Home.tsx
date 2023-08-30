import Scenes from "../scenes/Scenes";
import React from "react";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Scenes />
            <div>
                <Link to="/lights">Lights</Link>
            </div>
        </div>
    )
}