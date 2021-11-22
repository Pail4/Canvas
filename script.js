var canv, canv_temp, canv_img;
var context, context_temp, context_img;
var buttonPressed = false;
var paintTool = 0; // 1 -pensil; 2 - brush; 3 - rectangle
var xStart, yStart;
var xSize, ySize;

const COLORS = {
    "colorWhite": "white",
    "colorBlack": "black",
    "colorRed": "red",
    "colorOrange": "orange",
    "colorYellow": "yellow",
    "colorGreen": "green",
    "colorBlue": "blue",
    "colorPurple": "purple",
}

let currentColor = COLORS.colorBlack;

let lineWidth = 10;

window.onload = function () {
    canv = document.getElementById("cnv");
    canv_temp = document.getElementById("cnv_tmp");
    canv_img = document.getElementById("cnv_img");
    if (cnv.getContext) {
        context = canv.getContext("2d");
    }
    else context = null;
    if (cnv_tmp.getContext) {
        context_temp = cnv_tmp.getContext("2d");
    }
    else context_temp = null;
    if (canv_img.getContext) {
        context_img = canv_img.getContext("2d");
    }
    else context_img = null;

    /*
    var img = new Image();   // Создает новое изображение
    img.addEventListener("load", function () {
        context_img.drawImage(img, 0, 0);
    }, false);
    img.src = 'img/5.png'; // Устанавливает источник файла
    */

    for (let color in COLORS){
        let button = document.getElementById(color);
        button.style.backgroundColor = COLORS[color];
    }

}

function mouseDown(e) {
    if (e.which == 1 && buttonPressed == false && paintTool !=0) {
        switch (paintTool) {
            case 1:
                context.beginPath();
                context.strokeStyle = currentColor;
                context.lineWidth = 1;
                context.strokeStyle = currentColor;
                context.moveTo(e.offsetX, e.offsetY);
                buttonPressed = true;
                break;
            case 2:
                context.lineCap = "round";
                context.lineJoin = 'round';
                context.lineWidth = lineWidth;
                context.strokeStyle = currentColor;
                context.beginPath();
                context.moveTo(e.offsetX, e.offsetY);
                buttonPressed = true;
                break;
            case 3:
                xStart = e.offsetX;
                yStart = e.offsetY;
                xSize = ySize = null;
                buttonPressed = true;
                break;
        }
    }
}

function mouseUp(e) {
    if (buttonPressed && event.which == 1 && paintTool != 0) {
        switch (paintTool) {
            case 1:
                context.stroke();
                break;
            case 2:
                context.stroke();
                break;
            case 3:
                context_temp.clearRect(xStart, yStart, e.offsetX - xStart, e.offsetY - yStart);
                context.fillStyle = currentColor;
                context.fillRect(xStart, yStart, e.offsetX - xStart, e.offsetY - yStart);
                break;
        }
        buttonPressed = false;
    }
    
}

function mouseMove(e) {
    if (buttonPressed && paintTool !=0) {
        let x = e.offsetX;
        let y = e.offsetY;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x >= cnv.width) x = cnv.width - 1;
        if (y >= cnv.height) y = cnv.height - 1;
        switch (paintTool) {
            case 1:
                context.lineTo(e.offsetX, e.offsetY);
                context.stroke();
                context.beginPath();
                context.moveTo(e.offsetX, e.offsetY);
                break;
            case 2:
                context.lineTo(e.offsetX, e.offsetY);
                context.stroke();
                context.beginPath();
                context.moveTo(e.offsetX, e.offsetY);
                break;
            case 3:
                context_temp.fillStyle = currentColor;
                if (xSize != null && ySize != null) {
                    context_temp.clearRect(xStart, yStart, xSize, ySize); //erase old rectangle
                }
                xSize = e.offsetX - xStart;
                ySize = e.offsetY - yStart;
                context_temp.fillRect(xStart, yStart, xSize, ySize);
                break;

        }
    }
}

function toolClick(e) {
    let tool = parseInt(e.target.id[4]);
    for (let i = 1; i <= 3; i++) {
        let toolId = document.getElementById("tool" + i);
        if (tool == i) {
            toolId.className = "selected-tool-button";

        }
        else
            toolId.className = "tool-button";
    }
    activateSlider(e.target.id);
    paintTool = tool;
}

function colorClick(e) {

    for (let color in COLORS){
        if (COLORS[color] === currentColor){
            document.getElementById(color).className = "color-button";
        }
    }

    currentColor = COLORS[e.target.id];
    e.target.className = "color-button selected-color-button";
}

function lineWidthClick(e){
    lineWidth = e.target.value;
}

function activateSlider(id){
    let slider = document.getElementById("line-width");
    if (id === "tool2"){
        slider.removeAttribute("disabled");
    }
    else {
        slider.setAttribute("disabled", "disabled")
    }
}