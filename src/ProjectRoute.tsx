/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
import "./App.css";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useQueryParams } from "./hooks/useQueryParams";
import { createVariant, createWhiteBox } from "./mockData";
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

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateZip = (files) => {
    console.log("🚀 ~ generateZip ~ files:", files)
    const zip = new JSZip();
    // Create a folder within the zip file
    Object.entries(files).forEach(([key, value]) => {
        const imgFolder = zip.folder(key);
        value.forEach((file) => {
            imgFolder.file(
                `${dayjs(new Date()).format("DD-MM-YYYY-hh-mm-ss")}${Math.random()}.png`,
                file
            );
        });
    })
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
    data
}: {
    canvas: fabric.Canvas;
    scale: number;
    width: string;
    height: string;
    data: any;
}) => {
    return new Promise((resolve) => {
        canvas.setDimensions({
            width: parseInt(width) || 800,
            height: parseInt(height) || 800,
        });
        console.log('data', data)
        canvas.loadFromJSON({ ...data, objects: [createWhiteBox(width, height), ...data.objects] }, () => {
            canvas.renderAll();
            const dataURL = canvas.toDataURL({ format: "png", multiplier: scale - 1 });
            const blob = dataUrlToBlob(dataURL);
            resolve(blob);
        });
    });
};
export const getRandomWithMax = (max) => Math.floor(Math.random() * max);
const ZipRoute = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    console.log("zip");
    const {
        scale = 1,
        sizes = 1,
        variants = 1,
        shapesCount = 1,
        textCount = 1,
        imagesCount = 1,
        imageSize = 1,
        withImageCache = true,
    } = useQueryParams();
    const filesRef = useRef({});
    const canvasRef = useRef();
    useEffect(() => {
        const canvas = new fabric.StaticCanvas("canvas");
        canvasRef.current = canvas;
        return () => {
            canvas.dispose();
        }
    }, []);
    return (
        <div style={{ display: 'grid' }}>
            <button id="downloadButton" onClick={async () => {
                for (let i = 0; i < parseInt(variants); i++) {
                    const variant = createVariant({ shapesCount, textCount, imagesCount, imageSize, withImageCache, width: getRandomInt(500, 2000), height: getRandomInt(800, 2000) })
                    console.log("🚀 ~  ", variant)
                    for (let j = 0; j < parseInt(sizes); j++) {
                        const width = getRandomInt(500, 2000);
                        const height = getRandomInt(500, 2000);
                        variant.objects.forEach((object) => {
                            object.left = getRandomWithMax(width);
                            object.height = getRandomWithMax(height);
                        })
                        const file = await generateImage({
                            canvas: canvasRef.current,
                            scale,
                            width,
                            height,
                            data: variant,
                        });
                        if (filesRef?.current?.[i]) {
                            filesRef.current[i].push(file);
                        } else {
                            filesRef.current[i] = [file];
                        };
                    }
                }
                console.log("first", filesRef.current);
                await generateZip(filesRef.current);
            }}>
                Export Image
            </button>
            <canvas id="canvas" width="800" height="800"></canvas>

        </div >
    );
};
export default ZipRoute;
