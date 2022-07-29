const getColorBtn = document.getElementById('get-scheme-btn')
const colorInput = document.getElementById('color-input')
const modeSelector = document.getElementById('mode-selector')
const numberSelector = document.getElementById('number-selector')
const schemeColorsDiv = document.getElementById('scheme-colors')

const defaultColor = '#C309F6'
colorInput.value = defaultColor
displayScheme(defaultColor)

getColorBtn.addEventListener('click', function() {
    const hexColor = colorInput.value
    const mode = modeSelector.value
    const numColor = numberSelector.value
    displayScheme(hexColor, mode, numColor)
})

function displayScheme(hexColor, mode = '', numColor = 6) {
    hexColor = hexColor.substring(1)
    mode = mode.toLowerCase() 
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${mode}&count=${numColor}`)
        .then(res => res.json())
        .then(data => {
            const colorSchemeHtml = data.colors.map((color) => {
                const hex = color.hex.value
                return `<div class="color-rec" onClick="copyHex('${hex}', this)">
                    <div class="color-rec-color" style="background-color: ${hex}"}"></div>
                    <div class="color-rec-name">${hex}</div>
                </div>`
            }).join('')
            schemeColorsDiv.innerHTML = colorSchemeHtml
        })
}

function copyHex(hex, object) {
    if(navigator.clipboard) {
        navigator.clipboard.writeText(hex);
        object.classList.add("active")
        setTimeout(function() {
            object.classList.remove("active");
        }, 2000)
    }
}