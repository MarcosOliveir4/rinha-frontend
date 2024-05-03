import "./styles.css";
import { buildList, flattenJsonObject } from "./utils";

const worker = new Worker(new URL("./worker.ts", import.meta.url));

const inputFile = document.querySelector(
  'input[type="file"]'
) as HTMLInputElement;

const listElement = document.querySelector(".viewer__list") as HTMLUListElement;
const viewerElement = document.querySelector(".viewer") as HTMLDivElement;
const viewHeaderElement = document.querySelector(
  ".viewer__header"
) as HTMLHeadingElement;

viewerElement.style.display = "none";

inputFile.addEventListener("change", readFile);

function readFile(changeEvent: Event) {
  const reader = new FileReader();
  let filename = "";

  if ((changeEvent.target as HTMLInputElement) !== null) {
    const fileList = (changeEvent.target as HTMLInputElement).files as FileList;
    const file = fileList[0];
    reader.readAsText(file);
    filename = file.name;
  }

  reader.onload = (loadEvent) => {
    const text = (loadEvent.target as FileReader).result;
    const fileParsed = JSON.parse(text as string);

    const normalized = flattenJsonObject(fileParsed);
    worker.postMessage(fileParsed);

    viewHeaderElement.innerHTML = filename;
    listElement.innerHTML = "";

    normalized.forEach((item) => {
      listElement.append(buildList(item));
    });

    viewerElement.style.display = "block";
  };
}
