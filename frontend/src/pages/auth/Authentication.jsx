import { useState } from "react";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import "../../styles/auth/auth.css"

const Authentication = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="auth_page">
			<div className="card company_card">
				Company Things
			</div>
			<div className="card auth_card">
				{isLogin ? (
					<Login switchToRegister={() => setIsLogin(false)} />
				) : (
					<Register switchToLogin={() => setIsLogin(true)} />
				)}
			</div>
		</div>
	);
};

export default Authentication;
