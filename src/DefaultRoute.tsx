import "./App.css";
import { fabric } from "fabric";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useQueryParams } from "./hooks/useQueryParams";
 

const DefaultRoute = () => {
  const { scale = 1, width, height, elements = 10 } = useQueryParams();
  useEffect(() => {
    const canvas = new fabric.StaticCanvas("canvas");
    canvas.add(new fabric.Rect({ width: 100, height: 100, fill: "red" }));
    canvas.renderAll();
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    if (dataURL) {
      link.href = dataURL;
      link.download = `${dayjs(new Date()).format("DD-MM-YYYY-hh-mm-ss")}.png`;
      document.body.appendChild(link);
      // link.click();
      document.body.removeChild(link);
    }
  }, []);
  return (
    <div>
      <canvas id="canvas" width="800" height="800"></canvas>
    </div>
  );
};
export default DefaultRoute;
