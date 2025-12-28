import { useState } from "react";
import { login } from "../../api/auth";
import toast from "react-hot-toast";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [err, setErr] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await login(formData.email, formData.password);
			console.log(data);
			setErr(null);
		} catch (error) {
			const errMessage = error.message || "Login failed!";
			setErr(error.message );
			console.log(errMessage);
			toast.error(errMessage);
		}
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
							required
						/>
						<input
							name="password"
							type="password"
							placeholder="Enter Your Password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<button type="submit">Log In</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
