import "./App.css";
import { AppShell, Container, Text } from "@mantine/core";
import DropZone from "./components/DropZone";

// Import React FilePond
import { registerPlugin } from "react-filepond";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Header from "./components/Header";
import AuthModal from "./components/AuthModal";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function App() {
	const currentURL = window.location.href;
	const currentPath = window.location.pathname;
	const currentPathname = currentURL.substring(
		currentURL.indexOf(currentPath) + currentPath.length,
	);

	return (
		<AppShell
			header={{ height: 60, lineHeight: 1 }}
			padding="md"
			bg={"#224e18"}
		>
			<AppShell.Header>
				<Header />
			</AppShell.Header>
			<AppShell.Main>
				<Container fluid>
					<AuthModal />
					<Text>Current URL: {currentURL}</Text>
					<Text>Current Path: {currentPath}</Text>
					<Text>Current Pathname: {currentPathname}</Text>
					<Text>Current Hostname: {window.location.hostname}</Text>
					<DropZone />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
