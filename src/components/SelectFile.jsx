import { TbPhoto, TbX } from "react-icons/tb";
import { TbUpload } from "react-icons/tb";
import { useState } from "react";
import { Text, Group, Stack } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export default function SelectFile({ onSelectFile, test }) {
	const [subText, setSubText] = useState("Välj en bildfil på max 5 MB");

	console.log(typeof onSelectFile, test);
	const fileError = (errorObject) => {
		const error = errorObject.errors[0];
		console.log("error", error);
		if (error.code === "file-invalid-type") {
			setSubText(
				"Ogiltig filtyp. Vänligen ladda upp en bildfil (jpg, png, gif).",
			);
		} else if (error.code === "file-too-large") {
			setSubText("Filen är för stor. Vänligen ladda upp en mindre bild.");
		} else if (error.code === "too-many-files") {
			setSubText("För många filer. Vänligen ladda upp endast en bild.");
		} else {
			setSubText("Ett okänt fel inträffade, försök igen med en giltig fil.");
		}
	};

	const handleDrop = (acceptedFiles) => {
		console.log("acceptedFiles", acceptedFiles);
		setSubText("Bilden är redo för att laddas upp");
		onSelectFile(acceptedFiles);
	};

	const handleReject = (rejectedFiles) => {
		console.log("rejectedFiles", rejectedFiles);
		fileError(rejectedFiles[0]);
	};

	const restoreSubText = () => {
		setSubText("Välj en bildfil på max 5 MB");
	};

	return (
		<>
			<Dropzone
				accept={IMAGE_MIME_TYPE}
				onDrop={handleDrop}
				onReject={handleReject}
				onDragEnter={restoreSubText}
				onFileDialogOpen={restoreSubText}
				maxFiles={1}
			>
				<Group
					justify="center"
					gap="xl"
					mih={110}
					style={{ pointerEvents: "none" }}
				>
					<Dropzone.Accept>
						<TbUpload size={52} />
					</Dropzone.Accept>
					<Dropzone.Reject>
						<TbX size={52} />
					</Dropzone.Reject>
					<Dropzone.Idle>
						<TbPhoto size={52} color="teal" />
					</Dropzone.Idle>

					<Stack gap={2}>
						<Text size="xl">Dra bilder hit eller klicka för att välja fil</Text>
						<Text size="md" c="dimmed">
							{subText}
						</Text>
					</Stack>
				</Group>
			</Dropzone>
		</>
	);
}
