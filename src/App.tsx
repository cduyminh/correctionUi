import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGetStatusUpdate, useUploadFile } from "./hooks";

function App() {
	const [emails, setEmails] = useState("");
	const [filename, setFileName] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the hidden file input
	const { data: status } = useGetStatusUpdate({ emails: emails, filename: filename });
	const { mutate: upload } = useUploadFile();

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
			upload({ file, emails });
		} else {
			alert("Please drop a file to upload!");
		}
	};
	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>

			<div className="card">
				<button>Status: {status}%</button>
				<br />
				<br />
				<input placeholder="Emails" onChange={(e) => setEmails(e.target.value)}></input>
				{/* File drop area */}

				<div
					onDrop={handleDrop}
					onClick={handleFileSelect}
					onDragOver={handleDragOver}
					style={{ border: "2px dashed gray", padding: "20px", marginTop: "20px" }}
				>
					Drop a file here to update the filename
				</div>
				<input
					type="file"
					ref={fileInputRef}
					onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
					style={{ display: "none" }}
				/>
				{filename && <p>Uploaded file: {filename}</p>}

				{/* Upload button */}
				<button onClick={handleUpload} style={{ marginTop: 40 }}>
					Start Correction
				</button>
			</div>
		</>
	);
}

export default App;
