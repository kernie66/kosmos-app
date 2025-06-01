import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Center } from "@mantine/core";
import SelectFile from "./SelectFile";
import { useRef, useState } from "react";
import PreviewImage from "./PreviewImage";

export default function FileModal() {
	const [opened, { open, close }] = useDisclosure(false);
	const [fullScreen, { close: restoreFullScreen, toggle: toggleFullScreen }] =
		useDisclosure(false);
	const [files, setFiles] = useState([]);
	// const { ref, width, height } = useElementSize();
	const centerRef = useRef(null);
	const centerPosition = centerRef.current?.getBoundingClientRect();
	console.log("centerPosition", centerPosition);

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
		setFiles([]);
		close();
	}

	return (
		<>
			<Modal.Root
				opened={opened}
				onClose={handleClose}
				fullScreen={fullScreen}
				size="lg"
			>
				<Modal.Content>
					<Modal.Header>
						<Modal.Title>
							{!fullScreen
								? "Välj en fil att ladda upp"
								: "Klicka på bilden för att gå tillbaka"}
						</Modal.Title>
						<Modal.CloseButton />
					</Modal.Header>
					<Modal.Body>
						{!fullScreen && <SelectFile onSelectFile={handleSelectedFile} />}
						<Center mt={files.length > 0 ? "md" : 0} ref={centerRef}>
							<PreviewImage
								file={files[0]}
								onImageClicked={handleImageClicked}
								height={centerRef.current?.clientHeight}
								width={centerRef.current?.clientWidth}
							/>
						</Center>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<Button variant="default" onClick={open}>
				Open modal
			</Button>
		</>
	);
}
