let nonemployee =document.getElementById("nonemployee")
let employee =document.getElementById("employee")
let emInfo =document.getElementById("em-info")
let reportInfo =document.getElementById("report-info")
let noReport =document.getElementById("no-report")
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



if(sessionStorage.getItem("username") != "admin" && sessionStorage.getItem("username") != null){
    nonemployee.classList.add("d-none")
    employee.classList.remove("d-none")
    getInfo()
    getReportInfo()

    
} else {
    nonemployee.classList.remove("d-none")
    employee.classList.add("d-none")
}
async function getInfo(){
    let alldata = await fetch('http://localhost:3000/employees')
    let datajson = await alldata.json()

    datajson.map(el => {
        if(el.username == sessionStorage.getItem("username")){
            emInfo.innerHTML = `
            <p class="lead">${el.id}</p>
            <p class="lead">${el.fname} ${el.lname}</p>
            <p class="lead">${el.email}</p>
            <p class="lead">${el.username}</p>
            <p class="lead">${el.address}</p>
            <p class="lead">${el.age}</p>`
        }
    })


}


async function getReportInfo(){
    let alldata = await fetch('http://localhost:3001/reports')
    let datajson = await alldata.json()
    

    let valid = true
    if(datajson.length > 0 ){
        datajson.map(em => {
            if(em.username == sessionStorage.getItem("username")){
                reportInfo.innerHTML = `
                <p class="lead">${em.fullName}</p>
                <p class="lead">${em.daysofwork}</p>
                <p class="lead">${em.prooveAtt}</p>
                <p class="lead">${em.late}</p>
                <p class="lead">${em.absence}</p>`
                console.log(em.username)
                valid = false
            } 

        })

    }
    
    if(valid) {
        noReport.innerHTML =`
            <div id="report-info" class="col align-items-center text-center">
                <p class="lead text-danger p-5 m-5">Sorry... you never showed up</p>
            </div>
            `
    }
}