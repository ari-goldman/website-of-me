const alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9 ! @ # $ % ^ & * ( ) { } [ ] < > - + _ = : ; \" ' , . ? / \\"
const alphabetSpaceless = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}[]<>-+_=:;\"',.?/\\"
const tabs = ['aaaaaa','about me', 'my stuff', 'links','other']
const charsPerSelector = 9

const fillScrollSelector = (chars) => {
    const selectors = document.querySelectorAll(".scroll-selector")
    console.log(selectors)
    selectors.forEach((selector) => {
        for(var i = 0; i < chars; i++){
            var selectorContainer = document.createElement("div")
            selectorContainer.classList.add("scroll-selector-container")
            var selectorItem = document.createElement("span")
            selectorItem.classList.add("scroll-selector-item")
            selectorItem.innerHTML = alphabet
            selectorContainer.appendChild(selectorItem)
            selector.appendChild(selectorContainer)
        }
    })
}

fillScrollSelector(charsPerSelector)
var selectors = document.querySelectorAll(".scroll-selector")

var changeSelection = true
var currentSelection = 0
let totalScrollDistance = 500
let scrollTimeout;
const scrollTolerance = 1000;
var timeAtLastChange = 0
document.addEventListener("wheel", function(e) {
    let d = new Date()
    if(d.getTime() - timeAtLastChange < 2000) return
    
    var incdec
    if(e.deltaY <= -50){
        incdec = -1
    }else if(e.deltaY >= 50){
        incdec = 1
    }else{
        return;
    }
    timeAtLastChange = d.getTime()

   
    selectors.forEach((selector) => {
        let t = parseInt(selector.getAttribute('data-tab'))
        t += incdec
        t %= tabs.length
        if(t < 0) t = tabs.length - 1
        console.log(selectors,t)
        scrollToWord(selector,tabs[t])
        selector.setAttribute('data-tab',`${t}`)
    })
    // console.log(currentSelection)
    // scrollTimeout = setTimeout(() => { return }, 2000); // Adjust the timeout duration as needed
})

var currentWord = "ARGHH"
const scrollToWord = (selector, word) => {
    word = ("" + word).toUpperCase()
    let a = 'A'.charCodeAt(0)
    selectorItems = selector.querySelectorAll('.scroll-selector-container .scroll-selector-item')
    for(let i = 0; i < charsPerSelector; i++){
        // distance = Math.abs(word.charCodeAt(i) - currentWord.charCodeAt(i))
        // selectors[i].style.transition = `transform ${distance * 100}ms ease-out`
        if(word.length > i && alphabetSpaceless.replace(' ', '').indexOf(word[i]) > -1)
            selectorItems[i].style.transform = `translateY(${-0.2 -1.5 * Math.trunc(alphabet.indexOf(word[i]) / 2)}em)`
        else
            selectorItems[i].style.transform = `translateY(${1.5}em)`
    }
    currentWord = word
}

selectors.forEach((selector) => {
    scrollToWord(selector, tabs[parseInt(selector.getAttribute('data-tab'))])
})


