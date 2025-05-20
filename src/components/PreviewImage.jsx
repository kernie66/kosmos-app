import { Image, UnstyledButton } from "@mantine/core";

export default function PreviewImage({ files, onImageClicked, height = 200 }) {
	if (files.length === 0) {
		return null;
	}
	const imageUrl = URL.createObjectURL(files[0]);
	const fileName = files[0].name.split(".").slice(0, -1).join(".");
	console.log("fileName", fileName);
	console.log("file", files[0]);
	return (
		<UnstyledButton onClick={onImageClicked}>
			<Image
				key={fileName}
				src={imageUrl}
				onLoad={() => URL.revokeObjectURL(imageUrl)}
				h={height}
				w="auto"
				fit="contain"
				alt={fileName}
				radius={"md"}
			/>
		</UnstyledButton>
	);
}
