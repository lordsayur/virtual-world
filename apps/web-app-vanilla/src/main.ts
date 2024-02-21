import { createGraphUsingHtmlCanvas } from "./mode/html-canvas";
import { createGraphUsingP5Canvas } from "./mode/p5-canvas";

import "./style.css";

main();

function main() {
  addEventListenerToRadioSelection();
  createGraphUsingHtmlCanvas();
}

function addEventListenerToRadioSelection() {
  const renderingStrategyRadio: NodeListOf<HTMLInputElement> =
    document.querySelectorAll("input[name=rendering-strategy]");

  renderingStrategyRadio.forEach((radio: HTMLInputElement) => {
    radio.addEventListener("change", () => selectRenderingStrategy(radio));
  });
}

function selectRenderingStrategy(radio: HTMLInputElement) {
  removeExistingCanvas();

  if (radio.value == "html-canvas" && radio.checked) {
    createGraphUsingHtmlCanvas();
  }

  if (radio.value == "p5-canvas" && radio.checked) {
    createGraphUsingP5Canvas();
  }
}

function removeExistingCanvas() {
  const canvasContainer = document.getElementById("virtual-world");
  const currentCanvas = canvasContainer?.firstChild;

  if (currentCanvas) {
    canvasContainer?.removeChild(currentCanvas);
  }
}
