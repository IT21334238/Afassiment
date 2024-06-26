import { Link } from "react-router-dom";

export default function Error() {
    return(
        <>
        <section className="flex flex-col items-center justify-center text-center h-screen text-white">
            <h1 className="mb-3">Error | The requested resource could not be found</h1>
            <Link to="/" className="btn">&larr; Back to Homepage</Link>
        </section>
        </>
    )
}