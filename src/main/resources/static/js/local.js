async function sendData(path){
    var myForm = document.getElementById("myForm");
    var formData= new FormData(myForm);
    var jsonData={};
    for(var [k, v] of formData){
        jsonData[k]=v;
    }
    const request= await fetch (path,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    console.log(await request.text())
}
async function sendData(path){
    var myForm = document.getElementById("myForm");
    var formData= new FormData(myForm);
    var jsonData={};
    for(var [k, v] of formData){
        jsonData[k]=v;
    }
    const request= await fetch (path,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    console.log(await request.text())
}
