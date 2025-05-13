import { Button, Image } from "@mantine/core";
import DibberLogo from "../assets/Dibber Kosmos.jpg";

export default function DibberButton(props) {
	return (
		<Button
			component="a"
			href="https://dibber.se/forskola/dibber-kosmos-oppna-forskola"
			target="_blank"
			variant="subtle"
			h={60}
			w={184}
			px={0}
			{...props}
		>
			<Image src={DibberLogo} alt="Dibber Kosmos" width={184} height={60} />
		</Button>
	);
}
