import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useGetStatusUpdate, useUploadFile } from "./hooks";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import PricingTable from "./PricingTier";
import HeroComponent from "./Hero";

function App() {
	const [emails, setEmails] = useState("");
	const [filename, setFileName] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the hidden file input
	const { data: status } = useGetStatusUpdate({ emails: emails, filename: filename });
	const { mutate: upload } = useUploadFile();
	const [sent, setSent] = useState(false);
	const [complete, setComplete] = useState(false);

	// Handle file drop
	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		handleFileChange(event.dataTransfer.files[0]);
	};

	// Prevent default behavior for drag over
	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	// Handle file selection via file input
	const handleFileSelect = () => {
		if (!fileInputRef || !fileInputRef.current) return;
		fileInputRef.current.click();
	};

	// Handle file change for both drop and file input
	const handleFileChange = (selectedFile: File | null) => {
		if (selectedFile) {
			setFileName(selectedFile.name);
			setFile(selectedFile);
		}
	};

	// Handle file upload
	const handleUpload = () => {
		if (file) {
			setSent(true);
			upload({ file, emails });
		} else {
			alert("Please drop a file to upload!");
		}
	};

	useEffect(() => {
		if (status == -404) {
			alert(
				"We're only serving files under 500 words at the moment. If changes were made you must rename your file."
			);
			reset();
		}

		if (status === 100) {
			setComplete(true);
		}
	}, [status]);

	const reset = () => {
		setFile(null);
		setFileName("");
		setSent(false);
	};

	const [login, setLogin] = useState(false);

	const handleGoogleLoginSuccess = (response: any) => {
		console.log("Login Success:", response);
		// Handle the successful response here
		localStorage.setItem("login", "true");
		setLogin(true);
	};

	// setLogin(true);

	useEffect(() => {
		const flag = localStorage.getItem("login") as string;
		if (flag === "true") {
			setLogin(true);
		}
	}, []);
	const handleGoogleLoginFailure = () => {
		console.log("Login Failed:");
		// Handle the failure response here
	};

	return (
		<>
			<GoogleOAuthProvider clientId="190657464674-43rku2k0fj2jsd8cvg6f5o738bkkbb9r.apps.googleusercontent.com">
				{!login ? (
					<>
						<div
							className="slam"
							style={{
								height: "100vh",
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<h1>Correction App</h1>
							<h2>We fix grammar in your.docx</h2>
							<HeroComponent />
						</div>

						<div
							className="slam"
							style={{
								height: "100vh",
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<h1>Unlimited offerings</h1>
							<PricingTable />
						</div>
						<div
							className="slam"
							style={{
								height: "100vh",
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<div className="login" style={{ marginTop: 50 }}>
								<h1>Join Now</h1>
								<h2 style={{ marginBottom: 50 }}>Enjoy $200 free credits</h2>
								<GoogleLogin
									size="large"
									onSuccess={handleGoogleLoginSuccess}
									onError={handleGoogleLoginFailure}
								/>
							</div>
						</div>
						<div
							className="slam"
							style={{
								height: "100vh",
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<a href="https://vitejs.dev" target="_blank" style={{ marginBottom: 90 }}>
								<img
									src={
										"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/RMIT_University_Logo.svg/2560px-RMIT_University_Logo.svg.png"
									}
									className="logo"
									alt="Rmit logo"
								/>
							</a>
						</div>
					</>
				) : (
					<>
						<div className="slam">
							<a href="https://vitejs.dev" target="_blank">
								<img
									src={
										"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/RMIT_University_Logo.svg/2560px-RMIT_University_Logo.svg.png"
									}
									className="logo"
									alt="Rmit logo"
								/>
							</a>
						</div>
						<div className="card">
							<div style={{ position: "relative" }} className="slam">
								<label
									style={{
										position: "absolute",
										left: 0,
										display: "flex",
										flexDirection: "row",
										alignContent: "center",
										gap: 4,
									}}
								>
									Where do want to recieve your files?
								</label>
								<br />
								<input
									placeholder="Each email separated by a comma."
									onChange={(e) => setEmails(e.target.value)}
									style={{
										padding: 20,
										width: 300,
										borderRadius: 5,
										marginTop: 5,
										border: "1px solid #ccc",
										fontSize: 16,
									}}
								></input>
							</div>
							{/* File drop area */}
							<div style={{ position: "relative", marginTop: "20px" }} className="slam">
								<label
									style={{
										position: "absolute",
										left: 0,
										display: "flex",
										flexDirection: "row",
										alignContent: "center",
										gap: 4,
									}}
								>
									Drop a file you want to have fix.
								</label>
								<br />
								<div
									className="slam"
									onDrop={handleDrop}
									onClick={handleFileSelect}
									onDragOver={handleDragOver}
									style={{
										border: "1px dashed #ccc",
										borderRadius: 5,
										padding: "20px",
										marginTop: 5,
									}}
								>
									{filename ? <p>{filename}</p> : <p>Drop a file here</p>}
								</div>
								<input
									type="file"
									ref={fileInputRef}
									onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
									style={{ display: "none" }}
								/>
							</div>
							{/* Upload button */}
							{!sent ? (
								<button
									onClick={handleUpload}
									style={{
										marginTop: 40,
										padding: 20,
									}}
								>
									Start Correction
								</button>
							) : !complete ? (
								<button style={{ marginTop: 40, padding: 20 }}>Status: {status}%</button>
							) : (
								<button
									style={{
										marginTop: 40,
										padding: 20,
										background: "#5dd39e",
										color: "white",
										fontWeight: "bold",
									}}
								>
									Completed: Check your emails
								</button>
							)}
						</div>
					</>
				)}
			</GoogleOAuthProvider>
		</>
	);
}

export default App;
