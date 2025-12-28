import { useState } from "react";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";

const Authentication = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="auth_page">
			<div className="auth_card">
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
