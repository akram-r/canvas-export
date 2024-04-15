//@ts-nocheck
import "./App.css";
import { fabric } from "fabric";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useQueryParams } from "./hooks/useQueryParams";
import { createRandomObject } from "./mockData";

const ManualRoute = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { scale = 1, width, height, elements = 10, filename = `${dayjs(new Date()).format("DD-MM-YYYY-hh-mm-ss")}.png` } = useQueryParams();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const canvas = new fabric.StaticCanvas("canvas");
    canvas.setDimensions({
      width: parseInt(width) || 800,
      height: parseInt(height) || 800,
    });
    canvas.loadFromJSON(createRandomObject(elements, width, height), () => {
      canvas.renderAll();
      setReady(true);
    });
  }, []);
  const exportImage = () => {
    const dataURL = canvas.toDataURL({ format: "png", multiplier: scale });
    const link = document.createElement("a");
    if (dataURL) {
      link.href = dataURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  return (
    <div>
      <button id="downloadButton" disabled={!ready} onClick={exportImage}>Export Image</button>
      <canvas id="canvas" width="800" height="800"></canvas>
    </div>
  );
};
export default ManualRoute;
