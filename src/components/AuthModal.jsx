import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text } from "@mantine/core";

export default function AuthModal() {
	const [opened, { open, close }] = useDisclosure(false);

	function handleClose() {
		close();
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={handleClose}
				size="lg"
				title="Authentication"
			>
				<Text bg="blue">Logga in</Text>
			</Modal>

			<Button variant="default" onClick={open}>
				Open modal
			</Button>
		</>
	);
}
