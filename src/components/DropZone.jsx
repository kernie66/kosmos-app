import { useState } from "react";
import { FilePond } from "react-filepond";

export default function DropZone() {
	const [files, setFiles] = useState([]);

	const checkFile = (error, file) => {
		console.log("id", file.id);
		console.log("server id", file.serverId);
		console.log("origin", file.origin);
		console.log("file", file.file);
		console.log("fileExtension", file.fileExtension);
		console.log("fileSize", file.fileSize);
		console.log("filename", file.filename);
		console.log("filenameWithoutExtension", file.filenameWithoutExtension);
	};

	console.log("files", files[0]?.file);
	console.log("Number of files:", files.length);
	return (
		<div className="App">
			<FilePond
				files={files}
				onupdatefiles={setFiles}
				onprocessfile={checkFile}
				allowMultiple={true}
				maxFiles={3}
				server="/upload"
				name="files"
				labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
			/>
		</div>
	);
}
