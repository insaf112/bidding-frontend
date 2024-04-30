// Core viewer
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Plugins
import {
  defaultLayoutPlugin,
  setInitialTabFromPageMode,
} from "@react-pdf-viewer/default-layout";
import { Modal } from "@mui/material";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Create Document Component
const PdfComponent = ({ file, open, handleClose }) => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "100%",
            width: "70%",
          }}
        >
          {" "}
          <Viewer
            fileUrl={`${import.meta.env.VITE_FILEURL}/${file}`}
            plugins={[
              { setInitialTabFromPageMode: 1 },
              // Register plugins
              defaultLayoutPluginInstance,
            ]}
          />
        </div>
      </Worker>
    </Modal>
  );
};
export default PdfComponent;
