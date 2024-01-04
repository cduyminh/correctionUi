import { useRef, useState } from "react";
import "./App.css";
import { useGetStatusUpdate, useUploadFile } from "./hooks";
import { IconExclamationCircle } from "@tabler/icons-react";

function App() {
	const [emails, setEmails] = useState("");
	const [filename, setFileName] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the hidden file input
	const { data: status } = useGetStatusUpdate({ emails: emails, filename: filename });
	const { mutate: upload } = useUploadFile();
	const [sent, setSent] = useState(false);

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
	return (
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
						placeholder="Each email should be separated by a comma."
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
						style={{ border: "1px dashed #ccc", padding: "20px", marginTop: 5 }}
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
					<button onClick={handleUpload} style={{ marginTop: 40, padding: 20 }}>
						Start Correction
					</button>
				) : (
					<button>Status: {status}%</button>
				)}
			</div>
		</>
	);
}

export default App;
