import React from 'react';
import Information from '../components/account page/Information';
import Actions from '../components/account page/Actions';
import DangerZone from '../components/account page/DangerZone';


const AccountPage = () => {
    return (
        <div className="container mx-auto align-self-center my-5">
            <h2 className="text-center my-5">My Account</h2>
			<div className="row mt-3 d-grid gap-5">
				<Information />
                <Actions />
                <DangerZone />
			</div>
		</div>
    )
}

export default AccountPage;