function createSlider(nData, pData) {
    let sliderDiv = document.createElement("div")

    // for p
    let pDiv = document.createElement("div")

    let pHeder = document.createElement("h5")
    pHeder.textContent = "p"

    pDiv.appendChild(pHeder)


    // for n
    let nDiv = document.createElement("div")
    // nDiv.class = "float-right"

    let nHeder = document.createElement("h5")
    nHeder.textContent = "n"

    let nSlider = document.createElement("input")
    nSlider.type = "range"
    nSlider.min = nData.min
    nSlider.max = nData.max
    nSlider.value = nData.default
    nSlider.class = "slider"
    nSlider.id = "n_slider"
    nSlider.oninput = "(this.value) => { document.getElementById(\"n_text\").value = value; console.log(value); }";
    nSlider.onchange = "(this.value) => { document.getElementById(\"n_text\").value = value; console.log(value); }";

    // type="range" min="1" max="100" value="10" class="slider" id="n_slider"

    let nText = document.createElement("p")
    nText.textContent = nData.default
    nText.id = "n_text"

    nDiv.appendChild(nHeder)
    nDiv.appendChild(nSlider)
    nDiv.appendChild(nText)


    sliderDiv.appendChild(pDiv)
    sliderDiv.appendChild(nDiv)

    return sliderDiv

    // <h5 class="card-title">Card title</h5>
}


function updateP(value) {

}