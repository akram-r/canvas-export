//@ts-nocheck
import "./App.css";
import { fabric } from "fabric";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useQueryParams } from "./hooks/useQueryParams";
import { createRandomObject } from "./mockData";

const TextRoute = () => {
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
      const dataURL = canvas.toDataURL({ format: "png", multiplier: scale });
      setReady(dataURL);
    });
  }, []);

  return (
    <div>
      {ready && <div id='exportImage'>{ready}</div>}
    </div>
  );
};
export default TextRoute;
