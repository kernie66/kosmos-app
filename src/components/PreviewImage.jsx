import { Image, UnstyledButton, Loader } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useImageSize } from "react-image-size";

export default function PreviewImage({ file, onImageClicked, height, width }) {
	const imageUrl = useMemo(
		() => (file ? URL.createObjectURL(file) : null),
		[file],
	);
	const [dimensions, { loading, error }] = useImageSize(imageUrl);
	const { height: viewportHeight, width: viewportWidth } = useViewportSize();
	const [imageHeight, setImageHeight] = useState(0);
	const [imageWidth, setImageWidth] = useState(0);
	const [maxImageHeight, setMaxImageHeight] = useState("80vh");
	const imageRef = useRef(null);

	useLayoutEffect(() => {
		const aspectRatio = dimensions?.width / dimensions?.height;
		const imagePosition = imageRef.current?.getBoundingClientRect();
		const parentElement = imageRef.current?.parentElement;
		const parentPosition = parentElement?.getBoundingClientRect();

		console.log("dimensions", dimensions);
		console.log("imagePosition", imagePosition);
		console.log("clientWidth", imageRef.current?.clientWidth);
		console.log("scrollWidth", imageRef.current?.scrollWidth);
		console.log("closest div", parentElement);
		console.log("parentElement", parentElement?.getBoundingClientRect());
		console.log("parentElement.clientWidth", parentElement?.clientWidth);
		console.log("parentElement.clientHeight", parentElement?.clientHeight);
		console.log("clientTop", parentPosition?.top);

		if (aspectRatio > 1) {
			setImageWidth(parentElement?.clientWidth);
			setImageHeight("auto");
			setMaxImageHeight("100vh"); // `${height}px`;
		} else {
			setImageWidth(parentElement?.clientWidth * aspectRatio);
			setImageHeight("auto");
			setMaxImageHeight("900vh");
		}
	}, [dimensions]);

	if (loading) {
		return <Loader color="teal" />;
	}
	if (error) {
		console.error("Error loading image:", error);
		if (error === "Url is not defined") {
			return null;
		}
		return <div>Error loading image: {error}</div>;
	}
	const fileName = file?.name.split(".").slice(0, -1).join(".");

	console.log("fileName", fileName);
	console.log("file", file);
	console.log("imageWidth", imageWidth);
	console.log("imageHeight", imageHeight);
	console.log("viewportWidth", viewportWidth);
	console.log("viewportHeight", viewportHeight);

	return (
		<UnstyledButton onClick={onImageClicked} ref={imageRef}>
			<Image
				key={fileName}
				src={imageUrl}
				onLoad={() => URL.revokeObjectURL(imageUrl)}
				h={imageHeight}
				mah={maxImageHeight}
				w={imageWidth}
				maw="100vw"
				fit="contain"
				alt={fileName}
				radius={"md"}
			/>
		</UnstyledButton>
	);
}
