const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmpassword = document.querySelector('#confirmpassword');

form.addEventListener('submit',(e)=>{
    if(!validateInputs()){
        e.preventDefault();
    }
    else {
        form.setAttribute('action', './login.html');
        form.submit();
    }
})

function validateInputs()
{
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const confirmpasswordVal =confirmpassword.value.trim();
    let isValid = true;

    if(usernameVal===''){
        isValid=false;
        setError(username,'Username is required');
    }
    else
    {
        setSuccess(username);
    }

    if(emailVal===''){
        isValid=false;
        setError(email,'Email is required');
    }
    else if(!validateEmail(emailVal))
    {
        isValid=false;
        setError(email,'Please enter valid email');
    }
    else
    { 
        setSuccess(email);
    }

    if(passwordVal===''){
        isValid=false;
        setError(password,'Password is required');
    }
    else if(passwordVal.length<8)
    {
        isValid=false;
        setError(password,'Password must be atleast 8 characters');
    }
    else
    {
        setSuccess(password);
    }

    if(confirmpasswordVal===''){
        isValid=false;
        setError(confirmpassword,'Confirm Password is required');
    }
    else if(passwordVal!=='' && passwordVal!==confirmpasswordVal){
        isValid=false;
        setError(confirmpassword,'Password doest not match');
    }
    else
    {
        setSuccess(confirmpassword);
    }
    return isValid;
}

function setError(element,message){
    
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function setSuccess(element,message){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = '';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

const validateEmail = (email)=>{
return String(email)
.toLowerCase()
.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
);
};