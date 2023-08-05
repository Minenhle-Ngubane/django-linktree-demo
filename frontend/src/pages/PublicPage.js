import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Profile from '../components/public page/Profile';
import SocialIcon from '../components/public page/SocialIcon';
import Link from '../components/public page/Link';
import PageNotFound from '../components/public page/PageNotFound';
import Loader from '../components/common/Loader';

import '../css/publicPage.css';

const PublicPage = () => {
	const { username } = useParams();
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUserData = async (username) => {
			try {
				const response = await axios.get(`public/api/${username}`);
				setUserData(response.data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchUserData(username);
	}, [username]);

	if (loading) {
		return <Loader />;
	}

	if (error || !userData) {
		return <PageNotFound />;
	}

	const { profile, icons, links } = userData;

	return (
		<div className="mx-auto mt-5 mb-0 px-3 py-3 text-center col-sm-10 col-md-8 col-lg-6">
			<div className="page-background" style={{ backgroundImage: `url(${profile?.avatar})` }} />
			<div className="glass-overlay" />

			<Profile
				username={userData.username}
				avatar={profile.avatar}
				title={profile.title}
				bio={profile.bio}
			/>

			<div className="my-4 d-flex justify-content-center align-items-center w-100">
				{icons.map((icon, index) => (
					<Fragment key={index}>
						<SocialIcon icon={icon} />
					</Fragment>
				))}
			</div>

			<Fragment>
				{links.map((link, index) => (
					<Link link={link} key={index} />
				))}
			</Fragment>
		</div>
	);
};

export default PublicPage;