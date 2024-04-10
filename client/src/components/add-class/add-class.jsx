import "./add-class.css";
import { Link } from "react-router-dom";
import ClassSearch from "./ClassSearch/class-search";
import Professor from "./Professor/professor";

export default function AddClass() {
    return (
        <main id="addclass">
            <h1>add class</h1>

            <div>
                <h2> name </h2>
                <ClassSearch />
            </div>

            <div>
                <h2> professors </h2>
                <Professor />
            </div>

            <div>
                <Link to="/home">
                    <input type="button" class="input-button" value="add class" />
                </Link>
            </div>
        </main>
    );
}
