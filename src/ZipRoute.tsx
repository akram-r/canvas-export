//@ts-nocheck
import "./App.css";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useQueryParams } from "./hooks/useQueryParams";
import { createRandomObject } from "./mockData";
import JSZip from "jszip";
import { saveAs } from "file-saver";
function dataUrlToBlob(dataUrl) {
  let arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const generateZip = (files) => {
  console.log("🚀 ~ generateZip ~ files:", files)
  const zip = new JSZip();
  // Create a folder within the zip file
  const imgFolder = zip.folder("images");
  files.forEach((file) => {
    console.log('wwwwwww',file)
    imgFolder.file(
      `${dayjs(new Date()).format("DD-MM-YYYY-hh-mm-ss")}${Math.random()}.png`,
      file
    );
  });
  zip.generateAsync({ type: "blob" }).then(function (content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
  });
};
const generateImage = ({
  canvas,
  scale,
  width,
  height,
  elements,
}: {
  canvas: fabric.Canvas;
  scale: number;
  width: string;
  height: string;
  elements: number;
}) => {
  return new Promise((resolve) => {
    canvas.setDimensions({
      width: parseInt(width) || 800,
      height: parseInt(height) || 800,
    });
    canvas.loadFromJSON(createRandomObject(elements, width, height), () => {
      canvas.renderAll();
      const dataURL = canvas.toDataURL({ format: "png", multiplier: scale });
      //convert dataURL to blob
      const blob = dataUrlToBlob(dataURL);
      resolve(blob);
      // const link = document.createElement("a");
      // if (dataURL) {
      //   link.href = dataURL;
      //   link.download = `${dayjs(new Date()).format("DD-MM-YYYY-hh-mm-ss")}.png`;
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // }
    });
  });
};
const ZipRoute = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  console.log("zip");
  const {
    scale = 1,
    width,
    height,
    elements = 10,
    count = 1,
  } = useQueryParams();
  const filesRef = useRef([]);
  useEffect(() => {
    const canvas = new fabric.StaticCanvas("canvas");
    async function runner() {
      console.log('count',count)
      for (let i = 0; i < parseInt(count); i++) {
        console.log('firstm',i,'count',count)
        const file = await generateImage({
          canvas,
          scale,
          width,
          height,
          elements,
        });
        console.log(file);
        filesRef.current.push(file);
      }
      console.log("first", filesRef.current);
      await generateZip(filesRef.current);
    }
    runner();
    return () => {
      canvas.dispose();
    }
  }, []);
  return (
    <div>
      <canvas id="canvas" width="800" height="800"></canvas>
    </div>
  );
};
export default ZipRoute;
