import Uppy from "@uppy/core";
import { Dashboard, DragDrop, ProgressBar, StatusBar } from "@uppy/react";
import Tus from "@uppy/tus";
import "./App.css";

// Don't forget the CSS: core and the UI components + plugins you are using.
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/drag-drop/dist/style.min.css";
import "@uppy/progress-bar/dist/style.min.css";
import "@uppy/status-bar/dist/style.min.css";

const ENDPOINT = "http://localhost:1080/files/";

const uppy = new Uppy({
  debug: true,
  restrictions: {
    // allowedFileTypes: ["video/mp4"],
    minNumberOfFiles: 1,
    maxNumberOfFiles: 1,
  },
}).use(Tus, { endpoint: ENDPOINT });

function App() {
  return (
    <>
      Uppy <code>Dashboard</code>:
      <Dashboard uppy={uppy} />
      <hr />
      Uppy <code>DragDrop</code>, <code>ProgressBar</code>,{" "}
      <code>StatusBar</code>:
      <DragDrop uppy={uppy} />
      <ProgressBar uppy={uppy} />
      <StatusBar uppy={uppy} />
      <hr />
      <code>tus-js-client</code>:<div className="todo">TODO</div>
    </>
  );
}

export default App;
