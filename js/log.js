let logreg = document.querySelectorAll(".logreg")
let formdisplay  = document.querySelectorAll(".formdisplay")
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


for(let i=0; i<logreg.length; i++){
    logreg[i].addEventListener("click", function(e){
        for(let i=0; i<logreg.length; i++){
            logreg[i].classList.remove("active")
        }
        for(let i=0; i<formdisplay.length; i++){
            formdisplay[i].classList.add("d-none")
        }
        formdisplay[i].classList.remove("d-none")
        e.target.classList.add("active")
    })
}

let fname = document.getElementById("fname")
let lname = document.getElementById("lname")
let email = document.getElementById("email")
let address = document.getElementById("address")
let age = document.getElementById("age")



let forms = document.querySelectorAll("form")

let emailsarr = []
let usersarr = []
let passesarr = []
async function getData(){
  let alldata = await fetch('http://localhost:3000/employees')
  let datajson = await alldata.json()

  datajson.map(el => {
    emailsarr.push(el.email) ; 
    usersarr.push(el.username) ; 
    passesarr.push(el.password) ; 
  })

//   for(i=0; i<emailsarr.length;i++){
//     console.log(emailsarr[i],usersarr[i],passesarr[i]);
//   }
}
getData()



forms[0].addEventListener("submit", function(e){
    e.preventDefault()

    if(!forms[0].checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
    } else {
        let userName = fname.value.trim()+lname.value.trim()+ getRndInteger(1000,9999)+age.value.trim();
        let userPass = fname.value.trim().charAt(0).toUpperCase()+lname.value.trim().charAt(1)+ getRndInteger(10000,99999)
        let data = {
            fname : fname.value.trim(),
            lname : lname.value.trim(),
            username: userName,
            password: userPass,
            email : email.value.trim(),
            address : address.value.trim(),
            age : age.value.trim(),
            flag: 0
        }
        function sendEmail() {
            Email.send({
                Host : "smtp.elasticemail.com",
                Username : "abdelrahman.kh216@gmail.com",
                Password : "2857B01B725D85554709C053624B957C6CA2",
                To : `${email.value.trim()}`,
                From : "abdelrahman.kh216@gmail.com",
                Subject : "ur info",
                Body : `usename is ${userName} and password is ${userPass}`
            }).then(
                alert("ur info will send to ue email")
            );
        }
        let valid = true;
        for (let i = 0; i < emailsarr.length; i++) {
            if(emailsarr[i] == data.email || (usersarr[i] == data.username && passesarr[i] == data.password)) {
                e.preventDefault()
                e.stopPropagation()
                valid = false;
                alert("this email aready exists")
                forms[0].checkValidity() = false
                break;
            } 
        }
        if(valid){
        fetch('http://localhost:3000/employees', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
        sendEmail()      
        }
    }
    forms[0].classList.add('was-validated')
},false)

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}



let username = document.getElementById("username")
let userpassword = document.getElementById("userpassword")
let warningmsg = document.getElementById("warning-msg")

forms[1].addEventListener('submit', function (e) {
    e.preventDefault()
    if (!forms[1].checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
        warningmsg.classList.remove("d-none")
    }

    let validlogin = false;
    
    for (let i = 0; i < passesarr.length; i++) {
        if(usersarr[i] == username.value.trim() && passesarr[i] == userpassword.value.trim()) {
            validlogin = true;
            warningmsg.classList.add("d-none")
            console.log(i)
            // break;
        } else {
            warningmsg.classList.remove("d-none")
        }
    }
    if(validlogin){
        sessionStorage.setItem('username', username.value.trim().toLowerCase());
        if(username.value.trim().toLowerCase() == "admin"){
            warningmsg.classList.add("d-none")
            let adminpage = document.createElement("a")
            let linkText = document.createTextNode("my title text");
            adminpage.appendChild(linkText);
            adminpage.href = "/admin.html";
            document.body.appendChild(adminpage);
            adminpage.click()
            document.body.removeChild(adminpage)
        }else if(username.value.trim().toLowerCase() != "admin") {
            warningmsg.classList.add("d-none")
            let employeepage = document.createElement("a")
            let linkText = document.createTextNode("my title text");
            employeepage.appendChild(linkText);
            employeepage.href = "/profile.html";
            document.body.appendChild(employeepage);
            employeepage.click()
            document.body.removeChild(employeepage)
        } else {
            warningmsg.classList.remove("d-none")
        }
    } else{
        forms[1].checkValidity() = false
    }

    forms[1].classList.add('was-validated')
}, false)

