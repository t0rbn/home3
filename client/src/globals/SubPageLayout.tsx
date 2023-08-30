import React, {PropsWithChildren} from "react";
import { Link } from "react-router-dom";

export default function SubPageLayout(props: PropsWithChildren) {
    return (
        <main>
            <Link to="/">back</Link>
            <hr />
            <section>
                {props.children}
            </section>
        </main>
    )
}