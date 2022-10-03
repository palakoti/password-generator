/* accepts input params to generate a valid password */
/**input format -> object = {
 * invalidChars: ['','',...],
 * prefLength: 6
 * } 
 * 
 pattern to validate
('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*['+specialChars+'])(?=.{'+prefLength+',})')
 * */

window.onload = (event) => {
    var list = document.getElementById('ch');
    var specialChars = "!$@%&?".split('');
    specialChars.forEach((ch) => {
        if(ch){
            var li = document.createElement('li')
            li.textContent = ch
            list.append(li);

            li.addEventListener('click', function(){
                    if(li.selected)        
                        li.style =  "opacity:1;";
                    else{
                        li.selected = true;
                        li.style ="opacity:0.3;";
                    }
            });
        }
    });
};

//To get all selected li values - 'special characters'
const getAllSelections = () => {
    let selected = [];
    document.querySelectorAll('#ch li').forEach((li) => {     
        //get all selected li
        if(li.selected)
            selected.push(li.textContent);    
    });
    return selected;
}

const generatePassword = (object) => {
    var specialChars = "-’`~!#*$@_%+=.,^&(){}[\]|;:<>?";
    //parse given input
    let prefLength = (object.prefLength >=6) ? object.prefLength : 6;
    let invalidChars = object.invalidChars;
    if(object.invalidChars.length > 0){
        specialChars = specialChars.split('').filter((ch) => {
            return !invalidChars.includes(ch);
        }).join('');
    }
     
    //generate password
    var pass = [];
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'+specialChars;
    for (let i = 1; i <= prefLength; i++) {
        var char = Math.floor(Math.random()
                    * chars.length + 1);
        pass.push(chars.charAt(char));
    }
    return pass.join('');
};

/** Event Listeners - def. action */
document.getElementById('actionBtn').addEventListener('click', () =>{    
    var output = document.querySelector('#output');
    output.style = "background-color: navajowhite;opacity:0.8";
    output.textContent = generatePassword({invalidChars:getAllSelections(),prefLength:document.querySelector('#len').value});
});

document.getElementById('copy').addEventListener('click', () =>{
    navigator.clipboard.writeText(document.getElementById('output').textContent);
});

/** Utility functions */
//Random number between max(always 20) and min length
var getRandomNum = (min) => {
    return Math.floor(Math.random() * (20-min) + min);
}


