let currentString = ""


function parseCSV(csvText) {
  return csvText
    .trim()
    .split("\n")
    .map(line => {
      // remove trailing ",,0" or ",,,0"
      line = line.replace(/,+0\s*$/, "");
      // remove trailing commas
      line = line.replace(/,+\s*$/, "");
      return line.split(",");
    });
}

function getTotalMinutes(row) {
  // ignore the name in column 0
  let totalSeconds = 0;

  for (let i = 1; i < row.length; i++) {
    let value = row[i].trim();
    if (typeof value === 'string' && value != "") {
        if (value.includes("m") && value.includes(" ")) {
          newTable = value.split(" ")
          let valueSeconds = newTable[1]
          let valueMinutes = newTable[0]
          
          if (valueSeconds.endsWith("s")) {
            valueSeconds = Number(valueSeconds.slice(0, -1));
          }
          
          if (valueMinutes.endsWith("m")) {
            valueMinutes = Number(valueMinutes.slice(0, -1));
          }
          if (typeof valueMinutes === 'number') {
            value = valueMinutes * 60
          }
          value = value + valueSeconds
          newNum = value;
        } else if (value.includes("m")) {
          value = Number(value.slice(0, -1));
          value = value * 60
          newNum = value
        } else if (value.endsWith("s")) {
           newNum = Number(value.slice(0, -1));
        }
        
        if (typeof newNum === 'number') {
            totalSeconds += newNum
        }        
    }
  }

  return [Math.floor(totalSeconds / 60), totalSeconds % 60];
}

//const table = parseCSV(studentList);

function loopThroughData(table) {
  table.forEach(row => {
    const name = row[0];
    if (name == "Student") {return}
    const newTable = getTotalMinutes(row)
    let minutes = newTable[0];
    let seconds = newTable[1];
    let hours = 0

    if (minutes >= 60) {
      hours = minutes / 60
      minutes = (hours % 60)
    }
  
    currentString = currentString + `${name}: ${Math.round(hours)} hours ${Math.round(minutes)} minutes ${Math.round(seconds)} seconds` + "\n"
    document.getElementById("inputAppearing").innerText = currentString
  });
}

let UploadButton = document.getElementById("uploadButton")

function analyzeFile(text) {
    console.log("File length:", text.length);

    // Example analysis
    const lines = text.split("\n");
    console.log("Lines:", lines.length);
  }
  
/*const fileInput = document.getElementById("fileInput")
fileInput.addEventListener("change", () => {})*/

const uploadButton = document.getElementById("uploadButton")
const clearButton = document.getElementById("clearButton")
const mainInput = document.getElementById("inputAppearing")

function onUploadClick(e) {
  e.preventDefault()
  onClear()
  const file = fileInput.files[0];
  if (!file) return;

  console.log(file.name, file.type, file.size);
  // LISTEN FOR CHANGES IN THE FILE

  const reader = new FileReader();
  reader.onload = e => {
    const text  = e.target.result;
    const data = parseCSV(text)
    //mainInput.innerText = data  
    loopThroughData(data)
  }
  reader.readAsText(file);
}

function onClear() {
  mainInput.innerText = "Input will appear here"
}

uploadButton.addEventListener("click", (e) => {
  onUploadClick(e)
})

clearButton.addEventListener("click", () => {
  onClear()
})