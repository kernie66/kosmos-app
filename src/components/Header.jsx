import { Container, Group } from "@mantine/core";
import DibberButton from "./DibberButton";
import AuthModal from "./AuthModal";
import FileModal from "./FileModal";

export default function Header() {
	return (
		<Container fluid>
			<Group justify="flex-start" align="center">
				<DibberButton me="auto" />
				<FileModal />
				<AuthModal />
			</Group>
		</Container>
	);
}
