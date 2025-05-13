import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text } from "@mantine/core";

export default function AuthModal() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} size="md" title="Authentication">
				<Text bg="blue">Logga in</Text>
			</Modal>

			<Button variant="default" onClick={open}>
				Open modal
			</Button>
		</>
	);
}
