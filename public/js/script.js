
console.log("Script is loaded");
var address = "Lahore";


// const weatherForm = document.querySelector("form");

// weatherForm.addEventListener('submit',(e)=>{

//     e.preventDefault();
//     console.log("Testing Form Submission");

// })
const weatherForm = document.querySelector("form");
const add = document.querySelector("input");
weatherForm.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    const location = add.value;    

    window.location.href = "/weather?address="+location;
    console.log(location);

    fetch('/weather?address='+location).then((response)=>{

    response.json().then((data)=>{
        console.log(data.location);
    })
});

})


