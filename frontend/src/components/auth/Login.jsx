import { useState } from "react";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="login">
			{/* Logo / Website name */}
			<div className="company_section"></div>

			{/* Login Form */}
			<div className="login_section">
				<div className="login_title">
					<h2>Log in Your Account</h2>
				</div>
				<div className="login_form">
					<form onSubmit={handleSubmit}>
						<input
							name="email"
							type="email"
							placeholder="Enter Your Email"
							value={formData.email}
							onChange={handleChange}
						/>
						<input
							name="password"
							type="password"
							placeholder="Enter Your Password"
							value={formData.password}
							onChange={handleChange}
						/>
						<button type="submit">Log In</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
