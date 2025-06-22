import { Image, UnstyledButton, Loader } from "@mantine/core";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useImageSize } from "react-image-size";

export default function PreviewImage({
	file,
	onImageClicked,
	maxHeight,
	maxWidth,
}) {
	if (file) {
		console.log("PreviewImage file", file);
	} else {
		console.log("PreviewImage no file");
	}
	const imageUrl = useMemo(
		() => (file ? URL.createObjectURL(file) : null),
		[file],
	);
	const [dimensions, { loading, error }] = useImageSize(imageUrl);
	const [imageHeight, setImageHeight] = useState(0);
	const [imageWidth, setImageWidth] = useState(0);
	const [maxImageHeight, setMaxImageHeight] = useState("80vh");
	const imageRef = useRef(null);

	useLayoutEffect(() => {
		const aspectRatio = dimensions?.width / dimensions?.height;

		if (aspectRatio > 1) {
			let newMaxWidth = maxWidth || "100%";
			if (newMaxWidth > maxHeight * aspectRatio) {
				newMaxWidth = maxHeight * aspectRatio;
			}
			console.log("newMaxWidth", newMaxWidth);
			setImageWidth(newMaxWidth || "100%");
			setImageHeight("auto");
			setMaxImageHeight(maxHeight); // `${height}px`;
		} else {
			setImageWidth("auto");
			setImageHeight(maxHeight || "100%");
			setMaxImageHeight("90vh");
		}
	}, [dimensions, maxHeight, maxWidth]);

	if (loading) {
		return <Loader color="teal" />;
	}
	if (error) {
		if (error === "Url is not defined") {
			return null;
		}
		console.error("Error loading image:", error);
		return <div>Error loading image: {error}</div>;
	}
	const fileName = file?.name.split(".").slice(0, -1).join(".");

	console.log("fileName", fileName);
	console.log("file", file);
	console.log("imageWidth", imageWidth);
	console.log("imageHeight", imageHeight);

	return (
		<UnstyledButton
			onClick={onImageClicked}
			h={imageHeight}
			mah={maxImageHeight}
			w={imageWidth}
			maw="100vw"
		>
			<Image
				key={fileName}
				src={imageUrl}
				onLoad={() => URL.revokeObjectURL(imageUrl)}
				fit="contain"
				alt={fileName}
				radius={"md"}
				ref={imageRef}
				h={imageHeight}
				mah={maxImageHeight}
				w={imageWidth}
			/>
		</UnstyledButton>
	);
}
