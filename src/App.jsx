import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import { AppShell, MantineProvider } from "@mantine/core";

function DropZone() {
	const [files, setFiles] = useState([]);
	return (
		<div className="App">
			<FilePond
				files={files}
				onupdatefiles={setFiles}
				allowMultiple={true}
				maxFiles={3}
				server="/upload"
				name="files"
				labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
			/>
		</div>
	);
}

export default function App() {
	const [count, setCount] = useState(0);

	return (
		<MantineProvider>
			<AppShell>
				<AppShell.Main>
					<div>
						<a href="https://vite.dev" target="_blank" rel="noreferrer">
							<img src={viteLogo} className="logo" alt="Vite logo" />
						</a>
						<a href="https://react.dev" target="_blank" rel="noreferrer">
							<img src={reactLogo} className="logo react" alt="React logo" />
						</a>
					</div>
					<h1>Vite + React</h1>
					<div className="card">
						<button
							type="button"
							onClick={() => setCount((count) => count + 1)}
						>
							Count is {count}
						</button>
						<p>
							Edit <code>src/App.jsx</code> and save to test HMR
						</p>
					</div>
					<p className="read-the-docs">
						Click on the Vite and React logos to learn more
					</p>
					<DropZone />
				</AppShell.Main>
			</AppShell>
		</MantineProvider>
	);
}
