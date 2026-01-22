import { useState } from "react";
import { login } from "../../api/auth";
import toast from "react-hot-toast";
import { MdEmail, MdLock } from "react-icons/md";

const Login = ({ switchToRegister }) => {
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
			setErr(error.message);
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

	const handleRegisterButtonPress = () => {
		switchToRegister();
	};

	return (
		<div className="auth_element login">
			{/* Logo / Website name */}
			<div className="company_section">
				<img className="note_paper" src="paper.png" />
				<h2>Byte Notes</h2>
			</div>

			{/* Login Form */}
			<div className="login_section">
				<div className="login_title">
					<h2>Log in Your Account</h2>
				</div>
				<div className="login_form">
					<form onSubmit={handleSubmit}>
						<div className="input_wrapper">
							<MdEmail className="input_icon" />
							<input
								className="login_email"
								name="email"
								type="email"
								placeholder="Enter Your Email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="input_wrapper">
							<MdLock className="input_icon" />
							<input
								className="login_password"
								name="password"
								type="password"
								placeholder="Enter Your Password"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>
						<button className="login_button" type="submit">
							Log In
						</button>
					</form>
				</div>
				<div className="login_footer">
					<div className="footer_content">
						<div className="footer_text">
							<p>
								Don't have an account?{" "}
								<span
									className="login_register_btn"
									onClick={handleRegisterButtonPress}
								>
									Register
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
