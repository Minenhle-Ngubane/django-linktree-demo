import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthWrapper from './wrappers/AuthWrapper';
import MainWrapper from './wrappers/MainWrapper';
import PrivateRouteWrapper from './wrappers/PrivateRouteWrapper';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import LinksPage from './pages/LinksPage';
import AppearancePage from './pages/AppearancePage';
import SettingsPage from './pages/SettingsPage';
import PublicPage from './pages/PublicPage';
import AccountPage from './pages/AccountPage';


const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate to="/admin" />} />
				<Route path="/:username" element={<PublicPage />} />
				<Route path="/signin" element={<AuthWrapper><SignInPage /></AuthWrapper>} />
				<Route path="/signup" element={<AuthWrapper><SignUpPage /></AuthWrapper>} />
				<Route path="/password/reset" element={<AuthWrapper><ForgotPasswordPage /></AuthWrapper>} />
				<Route path="/password/reset/confirm/:uidb64/:token/" element={<AuthWrapper><ResetPasswordPage /></AuthWrapper>} />

				<Route path="/admin" element={<PrivateRouteWrapper/>} >
					<Route path="/admin" element={ <MainWrapper><LinksPage /></MainWrapper> } />
					<Route path="/admin/appearance" element={ <MainWrapper><AppearancePage /></MainWrapper> } />
					<Route path="/admin/settings" element={ <MainWrapper><SettingsPage /></MainWrapper> } />
					<Route path="/admin/account" element={ <MainWrapper><AccountPage/></MainWrapper> } />
				</Route>
			</Routes>
		</Router>
	)
}

export default App;