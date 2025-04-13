import React from "react";
import {Link} from 'react-router-dom';

function AccessDenied() {
    return (
        <div className="text-center mt-6">
            <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
            <p className="mb-4">You do not have permission to access this page.</p>
            <Link to = "/">Go back to the home page</Link>

        </div>
    )
}

export default AccessDenied;