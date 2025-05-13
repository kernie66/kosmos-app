import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "./index.css";
import App from "./App.jsx";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<MantineProvider theme={theme}>
			<App />
		</MantineProvider>
	</StrictMode>,
);
