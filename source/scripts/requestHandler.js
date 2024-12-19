/* accepts input params to generate a valid password */
/**input format -> object = {
 * invalidChars: ['','',...],
 * prefLength: 6
 * } 
 * 
 pattern to validate
('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*['+specialChars+'])(?=.{'+prefLength+',})')
 * */

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
    const {
        length = 12, 
        includeUppercase = true, 
        includeLowercase = true, 
        includeNumbers = true, 
        includeSpecialChars = true
    } = options;

    const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
    const NUMBERS = "0123456789";
    const SPECIAL_CHARS = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";

    let chars = "";
    let guaranteedChars = [];

    // Ensure at least one character from each selected category
    if (includeUppercase) {
        chars += UPPERCASE_CHARS;
        guaranteedChars.push(getRandomChars(UPPERCASE_CHARS));
    }
    if (includeLowercase) {
        chars += LOWERCASE_CHARS;
        guaranteedChars.push(getRandomChars(LOWERCASE_CHARS));
    }
    if (includeNumbers) {
        chars += NUMBERS;
        guaranteedChars.push(getRandomChars(NUMBERS));
    }
    if (includeSpecialChars) {
        chars += SPECIAL_CHARS;
        guaranteedChars.push(getRandomChars(SPECIAL_CHARS));
    }

    // Error handling for no options selected
    if (!chars) {
        throw new Error("At least one character type must be selected!");
    }

    // Generate the remaining characters randomly
    const remainingLength = length - guaranteedChars.length;
    let password = guaranteedChars.join("");
    
    for (let i = 0; i < remainingLength; i++) {
        password += getRandomChars(chars);
    }

    // Shuffle the password to prevent predictable patterns
    password = shuffleString(password);

    return password;
}

// Helper function to get a random character from a string
const getRandomChars = (characters) => {
    const index = Math.floor(Math.random() * characters.length);
    return characters[index];
}

// randomize string through shuffle
const shuffleString = (str) => {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
    return arr.join('');
}

const options = {
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true
};

try {
    const password = generatePassword(options);
    //console.log("Generated Password:", password);
} catch (error) {
    console.error(error.message);
}


/** Event Listeners - def. action */
document.getElementById('actionBtn').addEventListener('click', () =>{    
    var output = document.querySelector('#output');
    output.style = "color:#000;"
    output.value = generatePassword({invalidChars:getAllSelections(),prefLength:document.querySelector('#password-length').value});
});
//length-display
document.querySelector('#password-length').addEventListener('change',(e) =>{
    document.querySelector('#length-display').textContent = e.target.value;
});
document.getElementById('copy').addEventListener('click', () =>{
    navigator.clipboard.writeText(document.getElementById('output').textContent);
});

/** Utility functions */
//Random number between max(always 20) and min length
var getRandomNum = (min) => {
    return Math.floor(Math.random() * (20-min) + min);
}


