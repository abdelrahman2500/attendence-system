let nonadmin =document.getElementById("nonadmin")
let admin =document.getElementById("admin")

let fullinfo = document.getElementById("fullinfo")
let search = document.getElementById("search")
let invalismsg = document.getElementById("invalismsg")
let check = document.getElementById("check")
let info = document.getElementById("info")
let getinfo = document.getElementById("getinfo")
function handleNavbar(){
    var logout = document.getElementById("logout")
    var login = document.getElementById("login")
    
    var adminLink = document.getElementById("admin-link")
    var profile = document.getElementById("profile")
    
    if(sessionStorage.getItem("username") != null){
        if(sessionStorage.getItem("username") == "admin"){
            profile.classList.add("d-none")
            adminLink.classList.remove("d-none")
        } else {
            adminLink.classList.add("d-none")
            profile.classList.remove("d-none")
        }
        login.classList.add("d-none")
        logout.classList.remove("d-none")
    } else {
        logout.classList.add("d-none")
        login.classList.remove("d-none")
        adminLink.classList.add("d-none")
        profile.classList.add("d-none")
    }
    logout.addEventListener("click", function(){
        sessionStorage.clear()
    })
    
}
handleNavbar()

let count = 1
if(sessionStorage.getItem("username") == "admin"){
    nonadmin.classList.add("d-none")
    admin.classList.remove("d-none")
    getData()
    getinfo.addEventListener("click",async function getDataForOne(e){
        e.preventDefault()
        let data = await fetch('http://localhost:3001/reports')
        let datatojson = await data.json()

        let valid = true;
        datatojson.map(el => {
            if(el.username == search.value.trim()){
                // info.classList.remove("d-none")
                // invalismsg.classList.add("d-none")
                info.innerHTML = 
                `<h4 class="text-center p-2 bg-success text-light">information for ${el.fullName}</h4>
                    <div class="row">
                        <div class="col-6">
                            <p class="lead p-2"><span class="fw-bold">full name: </span></p>
                        </div>
                        <div class="col-6">
                            <p class="lead p-2">${el.fullName}</p>
                        </div>
                        <div class="col-6">
                            <p class="lead p-2"><span class="fw-bold">attendence: </span></p>
                        </div>
                        <div class="col-6">
                            <p class="lead p-2">${el.prooveAtt}</p>
                        </div>
                        <div class="col-6">
                            <p class="lead p-2"><span class="fw-bold">late: </span></p>
                        </div>
                        <div class="col-6">
                            <p class="lead p-2">${el.late}</p>
                        </div>
                        <div class="col-6">
                            <p class="lead p-2"><span class="fw-bold">absence: </span></p>
                        </div>
                        <div class="col-6">
                            <p class="lead p-2">${el.absence}</p>
                        </div>
                    </div>` 
                ;
                valid =false
            }
            if(valid){
                info.innerHTML= `
                <div class=" my-3 text-start mx-auto">
                    <p  class="lead text-center p-3 bg-white shadow ">Enter valid username</p>
                </div>
                
                `
            }
        })
    })
    
} else {
    nonadmin.classList.remove("d-none")
    admin.classList.add("d-none")
}
async function getData(){
    let alldata = await fetch('http://localhost:3001/reports')
    let datajson = await alldata.json()
    console.log(datajson.length)

    if(datajson.length > 0 ){
        check.classList.add("d-none")
        datajson.map(el => {
            if(el.username != "admin"){
                
                fullinfo.innerHTML += `
                <div class="row g-2">
                    <div class="col-1 border-bottom p-2">${count++}</div>
                    <div class="col border-bottom p-2">${el.fullName}</div>
                    <div class="col border-bottom p-2">${el.daysofwork}</div>
                    <div class="col border-bottom p-2">${el.prooveAtt}</div>
                    <div class="col border-bottom p-2">${el.late}</div>
                    <div class="col border-bottom p-2">${el.absence}</div>
                </div>
                `
            }
        })
        
    } else {
        check.classList.remove("d-none")
    }

}


let allEmployees = document.getElementById("allemployees")
async function getAll(){
    let alldata = await fetch('http://localhost:3000/employees')
    let datajson = await alldata.json()
    console.log(datajson.length)

    if(datajson.length > 1) {
        datajson.map(emp => {
            if(emp.username != "admin"){

                allEmployees.innerHTML += `
                <div class="col-12 col-md-6">
                    <p class="lead p-3 mb-3 rounded-3 text-light text-center fw-bold bg-success">${emp.fname}</p>
                </div>
                `
            }

        })
    } else{
        allEmployees.innerHTML = `
        <div class="col-12 ">
            <p class="lead p-3 mb-3 rounded-3 text-light text-center fw-bold bg-info">there is no employees yet</p>
        </div>
        `
    }

}
getAll()