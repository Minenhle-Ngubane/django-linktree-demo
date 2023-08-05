import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
		<div className="col-md-12 mb-3 text-center mt-5 px-5">
			<div className="status-code">404</div>
			<p>The page you’re looking for doesn’t exist.</p>
			<p>Want this to be your username? <Link className="text-decoration-underline ps-2" to="/signup">Create your Linktree now.</Link></p>
		</div>
    )
}

export default PageNotFound;