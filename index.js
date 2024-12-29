let result=document.getElementById('result');
let lengthel=document.getElementById('length');
let btn=document.querySelector(".btn");
let uppercase=document.getElementById('uppercase');
let lowercase=document.getElementById('lowercase');
let numbers=document.getElementById('numbers');
let symbols=document.getElementById('symbols');
let btngenerated=document.querySelector(".btngenerated");
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lowerCar: getRandomLowerCaracter,
    upperCar: getRandomUpperCaracter,
    number: getRandomNumberCaracter,
    symbol: getRandomSymbolCaracter
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const pw = result.innerText

    if(!pw) { return }

    textarea.value = pw;
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove();
    alert('le mot de passe est copié avec succès')
})

btngenerated.addEventListener('click',()=>{
const length=+lengthel.value;
const lowercaseCar=lowercase.checked;
const uppercaseCar=uppercase.checked;
const numbersCar=numbers.checked;
const symbolsCar=symbols.checked;
result.innerText= generatedPw(lowercaseCar,uppercaseCar,numbersCar,symbolsCar,length)
})


function generatedPw(lowerCar,upperCar,number,symbol,length){
    let password="";
    let cont=lowerCar+upperCar+symbol;
    const tabCarracterepossible=[{lowerCar},{upperCar},{number},{symbol}].filter(item=> Object.values(item)[0]);
    if(cont==0){
        return '';
    }
    for(let i=0;i<length;i+=cont){
        tabCarracterepossible.forEach(type=>{
            let nameFunction=Object.keys(type)[0];
            password +=randomFunc[nameFunction]();
        })
    }
    passwordFinal=password.slice(0,length);
    return passwordFinal
}



lengthel.addEventListener('input', function() {
    const maxLength = 20; 
    let value = parseInt(lengthel.value);

    if (value > maxLength) {
        lengthel.value = maxLength; 
        alert("La longueur du mot de passe ne peut pas dépasser 20 caractères.");
    }
});


function getRandomLowerCaracter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getRandomUpperCaracter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumberCaracter() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbolCaracter() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'  
    return symbols[Math.floor(Math.random() * symbols.length)]
}