import {
	useDisclosure,
	useElementSize,
	useMergedRef,
	useMutationObserver,
	useViewportSize,
} from "@mantine/hooks";
import { Modal, Button, Center, Text, Box } from "@mantine/core";
import SelectFile from "./SelectFile";
import { useEffect, useLayoutEffect, useState } from "react";
import PreviewImage from "./PreviewImage";

export default function FileModal() {
	const [opened, { open, close }] = useDisclosure(false);
	const [fullScreen, { close: restoreFullScreen, toggle: toggleFullScreen }] =
		useDisclosure(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [imageShown, setImageShown] = useState(false);
	const { width: viewportWidth, height: viewportHeight } = useViewportSize();
	const [imageHeight, setImageHeight] = useState("100%");
	const [imageWidth, setImageWidth] = useState("100%");

	const {
		ref: modalContentRef,
		width: modalWidth,
		height: modalHeight,
	} = useElementSize();
	const {
		ref: centerContentRef,
		width: centerWidth,
		height: centerHeight,
	} = useElementSize();

	const centerMutationRef = useMutationObserver(
		() => {
			console.log("Center mutates");
			const centerPosition = centerContentRef.current?.getBoundingClientRect();
			console.log("centerPosition", centerPosition);
			console.log("Center styles:", centerContentRef.current?.style);
			console.log(
				"Center styles:",
				centerContentRef.current?.style["margin-top"],
			);
			console.log("modalContentRef:", modalContentRef.current);
			const modalPosition = modalContentRef.current?.getBoundingClientRect();
			console.log("Modal position:", modalPosition);
			const newWidth = modalPosition.width;
			const newHeight = modalPosition.height;
			console.log("New modal width:", newWidth, "New modal height:", newHeight);
			const scrollWidth = modalContentRef.current?.scrollWidth;
			const scrollHeight = modalContentRef.current?.scrollHeight;
			console.log("ScrollWidth:", scrollWidth);
			console.log("ScrollHeight:", scrollHeight);
		},
		{ attributes: true, childList: true, subtree: true },
	);

	const modalRef = useMergedRef(modalContentRef);
	const centerRef = useMergedRef(centerContentRef, centerMutationRef);

	console.log("Viewport size:", viewportWidth, viewportHeight);
	console.log("Center height", centerHeight, "Center width", centerWidth);

	useLayoutEffect(() => {
		console.log("useLayoutEffect triggered");
		console.log(
			"Closest modalContentRef:",
			modalContentRef.current?.closest("section"),
		);
		console.log("Image shown:", imageShown);
		console.log("Modal height", modalHeight, "Modal width", modalWidth);
		const scrollWidth = modalContentRef.current?.scrollWidth;
		const scrollHeight = modalContentRef.current?.scrollHeight;
		console.log("ScrollWidth:", scrollWidth);
		console.log("ScrollHeight:", scrollHeight);
		const modalPosition = modalContentRef.current?.getBoundingClientRect();
		console.log("Modal position:", modalPosition);
		const centerPosition = centerContentRef.current?.getBoundingClientRect();
		console.log("Center position (layout):", centerPosition);
		console.log("Center styles:", centerContentRef.current?.style);
		console.log("Center styles:", centerContentRef.current?.style.marginTop);
		if (centerContentRef.current) {
			console.log(
				"Computed style",
				getComputedStyle(centerContentRef?.current).marginTop,
			);
		}
		console.log("Top margin", centerPosition?.top - modalPosition?.top);
		console.log("Side margin", centerPosition?.x - modalPosition?.x);
		console.log(
			"Bottom margin",
			modalPosition?.bottom - centerPosition?.bottom,
		);
		console.log("Image height", modalPosition?.bottom - centerPosition?.top);
		// if (!imageShown) {
		if (modalHeight > 300) {
			setImageShown(true);
			// if (scrollWidth < modalWidth) {
			// setImageHeight("100%");
			//	setImageWidth(centerWidth);
			// } else {
			//	setImageHeight("100%");
			//	setImageWidth(centerWidth);
			//}
		}
		//if (modalPosition.bottom - centerPosition.bottom < 16) {
		//console.warn("Center content exceeds modal height, adjusting...");
		if (imageShown) {
			setImageHeight(modalPosition.bottom - centerPosition.top - 16);
		}
		//}
		//}
	}, [modalHeight, modalWidth, modalContentRef, imageShown, centerContentRef]);

	useEffect(() => {
		console.log("useEffect triggered");
		// console.log("Modal height", modalHeight, "Modal width", modalWidth);
		// console.log("Center height", centerHeight, "Center width", centerWidth);
	}, []);

	useEffect(() => {
		// console.log("modalContentRef:", modalContentRef.current);
		const modalPosition = modalContentRef.current?.getBoundingClientRect();
		console.log("Modal position:", modalPosition);
		const scrollWidth = modalContentRef.current?.scrollWidth;
		const scrollHeight = modalContentRef.current?.scrollHeight;
		console.log("ScrollWidth:", scrollWidth);
		console.log("ScrollHeight:", scrollHeight);
	}, [modalContentRef]);

	useEffect(() => {
		const centerPosition = centerContentRef.current?.getBoundingClientRect();
		console.log("Center position (effect):", centerPosition);
	}, [centerContentRef]);

	useLayoutEffect(() => {
		const centerPosition = centerContentRef.current?.getBoundingClientRect();
		console.log("Center position (layout):", centerPosition);
	}, [centerContentRef]);

	// Function to handle button click
	function handleButtonClicked() {
		if (opened) {
			handleClose();
		} else {
			open();
		}
	}

	// Function to handle file selection
	function handleSelectedFile(file) {
		console.log("Selected file:", file);
		setSelectedFile(file);
		if (file) {
			setImageShown(false);
			setImageHeight("100%");
		}
	}

	// Function to handle image click
	function handleImageClicked() {
		console.log("Image clicked");
		toggleFullScreen();
		setImageHeight("100%");
		const modalPosition = modalContentRef.current?.getBoundingClientRect();
		console.log("Modal position:", modalPosition);
	}

	// Function to handle modal close
	function handleClose() {
		restoreFullScreen();
		setSelectedFile(null);
		setImageShown(false);
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
				<Modal.Content ref={modalRef}>
					<Modal.Header p={0} m={0} h={60}>
						<Modal.Title fw={700} fz="xl" p={8} c={"teal.6"}>
							{!fullScreen
								? "Välj en fil att ladda upp"
								: "Klicka på bilden för att gå tillbaka"}
						</Modal.Title>
						<Modal.CloseButton />
					</Modal.Header>
					<Modal.Body>
						{!fullScreen && <SelectFile onSelectFile={handleSelectedFile} />}
						<Center mt="md" ref={centerRef}>
							{selectedFile ? (
								<PreviewImage
									file={selectedFile}
									onImageClicked={handleImageClicked}
									maxHeight={imageHeight}
									maxWidth={imageWidth}
								/>
							) : (
								<Box>
									<Text c="dimmed" fz="md">
										Ingen bild vald
									</Text>
								</Box>
							)}
						</Center>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<Button variant="default" onClick={handleButtonClicked}>
				{!opened ? "Öppna filväljare" : "Stäng filväljare"}
			</Button>
		</>
	);
}
