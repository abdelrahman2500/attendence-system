// time of attendance
var start = 17
var end = 18
let starttime = document.getElementById("starttime")
let endtime = document.getElementById("endtime")

starttime.innerHTML = start >= 12 ? start == 12 ? "12:00 p.m" : start == 24 ? "00:00 a.m" : `${start - 12}:00 p.m` : `${start}:00 a.m`
endtime.innerHTML = end >= 12 ? end == 12 ? "12:00 p.m" : end == 24 ? "00:00 a.m" : `${end - 12}:00 p.m` : `${end}:00 a.m`



let useratt = sessionStorage.getItem("username")

let attform = document.querySelectorAll("form")[0]

let noAtt = document.getElementById("no-att")

let prooveform = document.getElementById("prooveform")
var date = new Date();

var month = date.getMonth() + 1;
var year = date.getFullYear();
var daysInMonth = new Date(year, month, 0).getDate();


function handleNavbar(){
    var logout = document.getElementById("logout")
    var login = document.getElementById("login")
    
    var admin = document.getElementById("admin")
    var profile = document.getElementById("profile")
    
    if(sessionStorage.getItem("username") != null){
        if(sessionStorage.getItem("username") == "admin"){
            profile.classList.add("d-none")
            admin.classList.remove("d-none")
        } else {
            admin.classList.add("d-none")
            profile.classList.remove("d-none")
        }
        login.classList.add("d-none")
        logout.classList.remove("d-none")
    } else {
        logout.classList.add("d-none")
        login.classList.remove("d-none")
        admin.classList.add("d-none")
        profile.classList.add("d-none")
    }
    logout.addEventListener("click", function(){
        sessionStorage.clear()
    })
    
}
handleNavbar()

var ifAdmin = document.getElementById("if-admin")
var ifEmployee = document.getElementById("if-employee")

if(sessionStorage.getItem("username") == "admin"){
    ifAdmin.classList.remove("d-none")
    ifEmployee.classList.add("d-none")
} else {
    ifAdmin.classList.add("d-none")
    ifEmployee.classList.remove("d-none")
}





if(localStorage.getItem(`monthDays${sessionStorage.getItem("username")}`) > daysInMonth){
    localStorage.removeItem(`monthDays${sessionStorage.getItem("username")}`)
}



let lname = []
let usersarr = []
let fname = []
async function getData(){
    let alldata = await fetch('http://localhost:3000/employees')
    let datajson = await alldata.json()

    datajson.map(el => {
        usersarr.push(el.username) ; 
        fname.push(el.fname) ; 
        lname.push(el.lname) ; 
    })
    if(datajson.length > 1){
        datajson.map(data => {
            if(data.username != "admin"){
                ifAdmin.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4 mb-2">
                    <div class="card w-100" style="width: 18rem;">
                        <img src="/images/user.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4 class="card-title text-center pb-3  border-bottom">${data.fname} ${data.lname}</h4>
                            <p class="card-text"><span class="fw-bold">id:</span> ${data.id}</p>
                            <p class="card-text"><span class="fw-bold">full name:</span> ${data.fname} ${data.lname}</p>
                            <p class="card-text"><span class="fw-bold">username:</span> ${data.username}</p>
                            <p class="card-text"><span class="fw-bold">email:</span> ${data.email}</p>
                            <p class="card-text"><span class="fw-bold">address:</span> ${data.address}</p>
                            <p class="card-text"><span class="fw-bold">age:</span> ${data.age}</p>
                        </div>
                    </div>
                </div>
                `
    
            }
        })
    } else {
        ifAdmin.innerHTML = `
        <h3 class="lead p-3 mb-3 rounded-3 text-light text-center fw-bold bg-info">there is no employees yet</h3>
        `
    }
}
getData()

let userNames = []
let userID = []
let names = []
async function getNames(){
    let allNames = await fetch('http://localhost:3001/reports')
    let Namesjson = await allNames.json()

    Namesjson.map(el => {
        userNames.push(el.username) ; 
        userID.push(el.id)
        names.push(el.fullName)
    })

    // for(i=0; i<userNames.length;i++){
    //     console.log(userNames[i]);
    // }
}
getNames()



if(sessionStorage.getItem("username") != null && sessionStorage.getItem("username") != "admin") {

    var timevalid = false
    if(date.getHours() >= end){
        // hide form and show attendance message
        noAtt.classList.remove("d-none")
        prooveform.classList.add("d-none")
        
        // check if user proove his attendance or no
        // if prooved >> secend day will be today +1 .. if no sec day still = today 
        if(Number(localStorage.getItem(`secondDay${sessionStorage.getItem("username")}`)) != new Date().getDate() +1 ){
            // here user didn't proove his attendance
            console.log("user didn't proove his attendance")
            var newAbsenceDays = new Date().getDate() - Number(localStorage.getItem(`secondDay${sessionStorage.getItem("username")}`))
            // teel user that he was absence today
            noAtt.innerHTML = `Hello ${useratt} .. you are absence `
        } else {
            noAtt.innerHTML = `Hello ${useratt} .. you proved your attendance </br>come tommorow `
        }
    } else if(date.getHours() < start){
        // if user come early
        // hide form and show attendance message
        noAtt.classList.remove("d-none")
        prooveform.classList.add("d-none")

        // and tell him to come in time
        noAtt.innerHTML = `Hello ${useratt} .. you are here so early .. </br> you should come at ${start}:00 o'clock`
    } else{
        // check if user make his attence or no 
        var today = localStorage.getItem(`secondDay${sessionStorage.getItem("username")}`) == date.getDate() + 1 ? "" : date.getDate()
        var monthDays = localStorage.getItem(`monthDays${sessionStorage.getItem("username")}`) != 0 ?  Number(localStorage.getItem(`monthDays${sessionStorage.getItem("username")}`)) + 1 : 1 
        timevalid = true
    }
    
    if(Number(localStorage.getItem(`secondDay${sessionStorage.getItem("username")}`)) != new Date().getDate() +1 ){
        // here user didn't proove his attendance
        // alert("user didn't proove his attendance")
        var newAbsenceDays = new Date().getDate() - Number(localStorage.getItem(`secondDay${sessionStorage.getItem("username")}`)) 
        // tell user that he was absence today
        // alert(newAbsenceDays)
        // noAtt.innerHTML = `Hello ${useratt} .. you are absence `
    }
    
    // var today = date.getDate()
    if(timevalid){
        if( today == date.getDate()){
            noAtt.classList.add("d-none")
            prooveform.classList.remove("d-none")
            attform.addEventListener("submit", function(e) {
                if (!attform.checkValidity()) {
                    e.preventDefault()
                    e.stopPropagation()
                }
                if(document.getElementById("useratt").value.trim() == sessionStorage.getItem("username")){
                    e.preventDefault()
                    alert(`Hello ${useratt}`)
                    let date = new Date()
                    if(date.getHours() >= end){
                        e.preventDefault()
                        e.stopPropagation()
                    } else if(date.getHours() < start){
                        e.preventDefault()
                        e.stopPropagation()
                    } else {
                        
                        if(date.getHours() >= start){
                            localStorage.setItem(`secondDay${sessionStorage.getItem("username")}`, date.getDate()+1)
                            if(date.getMinutes() < 30){
                                alert("U R in time")
                                noAtt.innerHTML = `Hello ${useratt} .. you are here in time `
                                var lateDays = localStorage.getItem(`lateDays${sessionStorage.getItem("username")}`) 
                                // var newAbsenceDays = localStorage.getItem(`abs${sessionStorage.getItem("username")}`) == null ? 0 : Number(localStorage.getItem(`abs${sessionStorage.getItem("username")}`))
                            } else {
                                var lateDays = Number(localStorage.getItem(`lateDays${sessionStorage.getItem("username")}`)) + 1 
                                alert("u r late ya halawa")
                                noAtt.innerHTML = `Hello ${useratt} .. you are so late`
                                // var newAbsenceDays = localStorage.getItem(`abs${sessionStorage.getItem("username")}`) == null ? 0 : Number(localStorage.getItem(`abs${sessionStorage.getItem("username")}`))
                            }
                        }
                        let valid = true;
                        
                        
                        for (let i = 0; i < usersarr.length; i++) {
                            if(usersarr[i] == sessionStorage.getItem("username")) {
                                for (let j = 0; j < userNames.length; j++){
                                    if(userNames[j] == sessionStorage.getItem("username")){
                                        

                                        var abs = Number(localStorage.getItem(`abs${sessionStorage.getItem("username")}`)) + Number(newAbsenceDays)
                                        // alert("before "+ Number(localStorage.getItem(`abs${sessionStorage.getItem("username")}`)))
                                        // alert( abs)
                                        let data = {
                                            fullName : `${fname[i]} ${lname[i]}`,
                                            username : usersarr[i],
                                            daysofwork: Number(localStorage.getItem(`monthDays${sessionStorage.getItem("username")}`)) + 1 + Number(abs),
                                            prooveAtt : Number(localStorage.getItem(`monthDays${sessionStorage.getItem("username")}`)) + 1,
                                            late : Number(lateDays)  ,
                                            absence :Number(abs) ,
                                        }
                                        localStorage.setItem(`monthDays${sessionStorage.getItem("username")}`, monthDays)
                                        localStorage.setItem(`abs${sessionStorage.getItem("username")}`, abs)
                                        // alert("you are absence for "+ Number(localStorage.getItem(`abs${sessionStorage.getItem("username")}`)))
                                        localStorage.setItem(`lateDays${sessionStorage.getItem("username")}`, lateDays)
                                        
            
                                        fetch(`http://localhost:3001/reports/${userID[j]}`, {
                                            method: 'PUT',
                                            body: JSON.stringify(data),
                                            headers: {
                                            'Content-type': 'application/json; charset=UTF-8',
                                            },
                                        })
                                            .then((response) => response.json())
                                            .then((json) => console.log(json));
                                        valid = false;
                                        alert ("u again !! ")
                                        noAtt.classList.remove("d-none")
                                        prooveform.classList.add("d-none")
                                        break;
                                    }
                                }
                                if(valid){
                                    var abs = 0;
                                    let data = {
                                        fullName : `${fname[i]} ${lname[i]}`,
                                        username : usersarr[i],
                                        daysofwork: 1,
                                        prooveAtt : 1,
                                        late : date.getMinutes() < 30 ? 0 : 1 ,
                                        absence : abs
                                    }
                                    localStorage.setItem(`lateDays${sessionStorage.getItem("username")}`, 0)
                                    localStorage.setItem(`absence${sessionStorage.getItem("username")}`, abs)
                                    fetch('http://localhost:3001/reports', {
                                        method: 'POST',
                                        body: JSON.stringify(data),
                                        headers: {
                                        'Content-type': 'application/json; charset=UTF-8',
                                        },
                                    })
                                        .then((response) => response.json())
                                        .then((json) => console.log(json));
                                    alert ("welcome back !! ")
                                    noAtt.classList.remove("d-none")
                                    prooveform.classList.add("d-none")
                                }
                                
                                break;
                            } 
                        }
                    }
                    
                } else {
                    e.preventDefault()
                    e.stopPropagation()
                }
            
                attform.classList.add('was-validated')
            }, false)
            
        } else {
            noAtt.classList.remove("d-none")
            prooveform.classList.add("d-none")
            noAtt.innerHTML = `Hello ${useratt} .. you proved your attendance </br> come tommorow`
        }
            
    }
} else {
    noAtt.classList.remove("d-none")
    prooveform.classList.add("d-none")
    noAtt.innerHTML = `Hello user .. please log in to make your attendance`
}


