const refreshBtn = document.querySelector(".refresh-btn");
const container = document.querySelector(".container");

const maxPaletteBoxes = 40;

const generatePalette = () => {
  container.innerHTML = ""; //Clearing the container
  for (let i = 0; i < maxPaletteBoxes; i++) {
    // Generate a random Hex Color code
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    randomHex = `#${randomHex.padStart(6, "0")}`;

    // Función para convertir color hexadecimal a RGB
    function hexToRgb(hex) {
      // Eliminar el "#" si está presente
      hex = hex.replace("#", "");

      // Obtener componentes roja, verde y azul
      let red = parseInt(hex.substring(0, 2), 16);
      let green = parseInt(hex.substring(2, 4), 16);
      let blue = parseInt(hex.substring(4, 6), 16);

      return `rgb(${red},${green},${blue})`;
    }

    // Convertir y mostrar el color RGB equivalente
    let rgbColor = hexToRgb(randomHex);

    // Create a new '<li>' element and inserting in to the container
    const colorHX = document.createElement("li");

    colorHX.classList.add("color");
    colorHX.innerHTML = `<div class="rect-box" style="background:  ${randomHex}"></div>
    <span class="hex-value" style ="color:  ${randomHex}"> ${randomHex}</span>
     <span class="rgb-value" style ="color:  ${rgbColor}">${rgbColor}</span>`;

    colorHX.addEventListener("click", () => copyColorHX(colorHX, randomHex));
    container.appendChild(colorHX);
  }
};

generatePalette();

const copyColorHX = (elem, hexVal) => {
  const colorElementHX = elem.querySelector(".hex-value");
  //Copying the hex value, updating the text to copied
  //Changing text back to riginal hex value after 1 second
  navigator.clipboard
    .writeText(hexVal)
    .then(() => {
      colorElementHX.innerText = "Copiado";
      setTimeout(() => (colorElementHX.innerText = hexVal), 1000);
    })
    //Show alert if falide copy text color
    .catch(() => {
      alert("Failed to copy the color code!");
    });
};

refreshBtn.addEventListener("click", generatePalette);

// DARK AN LIGHT MODE
let iconMode = document.getElementById("icon-mode");

iconMode.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    iconMode.innerHTML = `<i class="fa-solid fa-hat-wizard" style="color: #fff"></i>`;
  } else {
    iconMode.innerHTML = `<i class="fa-solid fa-hat-wizard"></i>`;
  }
};

// Give Full Year for Footer
const fecha = document.querySelector(".fecha");

document.addEventListener("DOMContentLoaded", () => {
  fechaActual();
});

function fechaActual() {
  let fechaHoy = new Date().getFullYear();
  fecha.textContent = fechaHoy;
}
