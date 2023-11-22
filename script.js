const alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9 ! @ # $ % ^ & * ( ) { } [ ] < > - + _ = : ; \" ' , . ? / \\"
const alphabetSpaceless = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}[]<>-+_=:;\"',.?/\\"
const tabs = ['about_me','portfolio','links','skills']
const tabColorsSelected = ['#ea323c','#5ac54f','#00cdf9','#ca52c9']
const tabColorsUnelected = ['#571c27','#134c4c','#00396d','#3b1443']
var tabSquish = ""
var tabIndices = []
tabs.forEach((tab) => {
    tabIndices.push(tabSquish.length)
    tabSquish += tab
})
const charsPerSelector = tabSquish.length

const fillScrollSelector = (chars) => {
    const selectors = document.querySelectorAll(".scroll-selector")
    selectors.forEach((selector) => {
        for(var i = 0; i < chars; i++){
            var selectorContainer = document.createElement("div")
            selectorContainer.classList.add("scroll-selector-container")
            // selectorContainer.createAttribute('data-tab')
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

var timeAtLastChange = 0
document.addEventListener("wheel", function(e) {
    console.log(e.deltaX)
    let d = new Date()
    if(d.getTime() - timeAtLastChange < 2000) return
    
    var incdec
    if(e.deltaX <= -50){
        incdec = -1
    }else if(e.deltaX >= 50){
        incdec = 1
    }else{
        return;
    }
    timeAtLastChange = d.getTime()

   
    selectors.forEach((selector) => {
        let t = parseInt(selector.getAttribute('data-tab-selected'))
        t += incdec
        t %= tabs.length
        if(t < 0) t = tabs.length - 1
        setTab(selector, t)
    })
})

const scrollToRepeatingString = (selector, string) => {
    string = ("" + string).toUpperCase()
    selectorItems = selector.querySelectorAll('.scroll-selector-container .scroll-selector-item')
    for(let i = 0; i < charsPerSelector; i++){
        scrollToLetter(selectorItems[i], string[i % string.length])
    }
}

const scrollToWord = (selector, word) => {
    word = ("" + word).toUpperCase()
    let a = 'A'.charCodeAt(0)
    selectorItems = selector.querySelectorAll('.scroll-selector-container .scroll-selector-item')
    for(let i = 0; i < charsPerSelector; i++){
        if(word.length > i)
            scrollToLetter(selectorItems[i], word[i])
        else
            selectorItems[i].style.transform = `translateY(${1.5}em)`
    }
    currentWord = word
}

const scrollToLetter = (selectorItem, char) => {
    if(alphabetSpaceless.indexOf(char) > -1)
        selectorItem.style.transform = `translateY(${-0.2 -1.5 * Math.trunc(alphabet.indexOf(char) / 2)}em)`
    else
        selectorItem.style.transform = `translateY(${1.5}em)`
}

const assignTabs = (selector, initial) => {
    var curTab = 0
    selectorContainers = selector.querySelectorAll('.scroll-selector-container')
    var i = 0
    for(var t = 0; t < tabs.length; t++){
        curT = (t+initial) % tabs.length
        for(var j = 0; j < tabs[curT].length; j++){
            selectorContainers[i].setAttribute('data-tab',`${curT}`)
            selectorContainers[i].onclick = function() {
                setTab(selector, parseInt(this.getAttribute('data-tab')))
            }
            i++;
        }
    }
}

const setTab = (selector, t) => {
    scrollToRepeatingString(selector,tabSquish.substring(tabIndices[t], tabSquish.length) + tabSquish.substring(0, tabIndices[t]))
    assignTabs(selector, t)
    selector.setAttribute('data-tab-selected',`${t}`)
}



selectors.forEach((selector) => {
    setTab(selector, 0)
})