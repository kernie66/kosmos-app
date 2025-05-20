import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Center } from "@mantine/core";
import SelectFile from "./SelectFile";
import { useState } from "react";
import PreviewImage from "./PreviewImage";

export default function AuthModal() {
	const [opened, { open, close }] = useDisclosure(false);
	const [fullScreen, { close: restoreFullScreen, toggle: toggleFullScreen }] =
		useDisclosure(false);
	const [files, setFiles] = useState([]);

	function handleSelectedFile(file) {
		console.log("Selected file:", file);
		setFiles(file);
	}

	function handleImageClicked() {
		console.log("Image clicked");
		toggleFullScreen();
	}

	function handleClose() {
		restoreFullScreen();
		close();
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={handleClose}
				fullScreen={fullScreen}
				size="lg"
				title="Authentication"
			>
				<Text bg="blue">Logga in</Text>
				{!fullScreen && <SelectFile onSelectFile={handleSelectedFile} />}
				<Center mt={files.length > 0 ? "md" : 0}>
					<PreviewImage
						files={files}
						onImageClicked={handleImageClicked}
						height={fullScreen ? "85vh" : 200}
					/>
				</Center>
			</Modal>

			<Button variant="default" onClick={open}>
				Open modal
			</Button>
		</>
	);
}
