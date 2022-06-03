async function searchPerson() {
    const res = await fetch("http://localhost:8081/person");
    if(res.ok){
        const data = await res.json();
        showPerson(data);
    }else {
        alert("Erro na requisição");
    }  
}

async function searchDepartment() {
    const res = await fetch("http://localhost:8081/department");
    if(res.ok){
        const data = await res.json();
        showDepartments(data);
    }else {
        alert("Erro na requisição");
    }  
}

async function postPerson(data) {
    
    const res = await fetch("http://localhost:8081/person",{
        method:"post",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    if (!res) {
        alert("Erro na requisição");
        return false;
    }
    return true;
}

async function postDepartment(data) {
    
    const res = await fetch("http://localhost:8081/department",{
        method:"post",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    if (!res) {
        alert("Erro na requisição");
        return false;
    }
    return true;
}

async function deletePerson(id){
    return console.log('passei ')
   const res = await fetch('http://localhost:8081/person/' + id , {
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    const result= await res.json();
    if (!result) {
        alert("Erro na requisição");
        return false;
    }
    return true;
}

async function deleteDepartment(id){
    const res = await fetch('http://localhost:8081/department/' + id , {
         method: 'DELETE',
         headers: {"Content-type": "application/json; charset=UTF-8"}
     });
 
     const result= await res.json();
     if (!result) {
         alert("Erro na requisição");
         return false;
     }
     
     return true;
 }



function showPerson(data) {
    let tBody = document.getElementById("table_person_body");
    tBody.innerHTML = "";
    for (const person of data) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${person.Id}</td><td>${person.Name}</td>
        <td>${person.CPF}</td><td>${person.Birth_Date}</td>
        <td>${person.Dad_Id}</td><td>${person.Mom_Id}</td>
        <td>${person.is_employee}</td><td><button onclick="removePerson(${person.Id})">Remover</button></td>`;
        tBody.appendChild(tr);
    }
}

function showDepartments(data) {
    let tBody = document.getElementById("table_department_body");
    tBody.innerHTML = "";
    for (const department of data) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${department.id}</td><td>${department.Name}</td>
        <td>${department.Person_Responsible_Id}
        </td><button onclick="removePerson(${department.id})">Remover</button></td>`;
        tBody.appendChild(tr);
    }
}


 async function removePerson(id){
     const result = await deletePerson(id);

    if (result) {
        alert(`O setor de id: ${id} foi removida com sucesso`);
        await searchPerson();

    }
}

 async function removeDepartment(id){
  
     const result = await deleteDepartment(id);

    if (result) {
        alert(`O setor de id: ${id} foi removida com sucesso`);

    }
}



/**
 * 
 * @param {Event} ev
 * @returns {undefined}
 */
async function submitPerson(ev){
    
    ev.preventDefault();
    let Name = document.getElementById("Name").value;
    let CPF = document.getElementById("CPF").value;
    let Birth_Date = document.getElementById("Birth_Date").value;
    let Dad = document.getElementById("Dad_Id").value;
    let Mom = document.getElementById("Mom_Id").value;
    let is_employee = document.getElementById("is_employee").value;

    let Dad_Id = (Dad ==""? Dad=null:Dad);
    let Mom_Id = (Mom ==""? Mom=null:Mom);
    
     const result = await postPerson({Name,CPF,Birth_Date,Dad_Id,Mom_Id,is_employee});

    if (result) {
        ev.target.reset();
       
    }
}

/**
 * 
 * @param {Event} ev
 * @returns {undefined}
 */
 async function submitDepartment(ev){
    ev.preventDefault();
    let Name = document.getElementById("Name_department").value;
    let Person_Responsible_Id = document.getElementById("Person_Responsible_Id").value;

     const result = await postDepartment({Name,Person_Responsible_Id});

    if (result) {
        ev.target.reset();
       
    }
}


function startModal(modalId){
    const modal = document.getElementById(modalId);
    modal.classList.add ('acting');
}

function closeModal(modalId){
    const modal = document.getElementById(modalId);
    modal.classList.remove('acting');
}

const buttonCloseGetPerson= document.querySelector('#close_button_get_person');

buttonCloseGetPerson.addEventListener('click', function(){
    closeModal('modal_person')
 });

const buttonGetPerson = document.querySelector('#button_get_person');
const buttonGetDepartment = document.querySelector('#button_get_department');

const buttonCloseGetDepartment = document.querySelector('#close_button_get_department')


buttonCloseGetDepartment.addEventListener('click', function(){
    closeModal('modal_department')
})
buttonGetDepartment.addEventListener('click',function(){
    startModal('modal_department')
 })

buttonGetPerson.addEventListener('click', function(){
    startModal('modal_person')
 });

 

 const buttonInsertPerson =  document.querySelector('#button_insert_person');
 const buttonCloseInsertPerson =  document.querySelector('#close_button_insert_person');

 buttonCloseInsertPerson.addEventListener('click', function(){
    closeModal('modal_insert_person')
 });

buttonInsertPerson.addEventListener('click', function(ev){
    startModal('modal_insert_person');
    const form = document.getElementById("form_insert_person");
    form.onsubmit = submitPerson;
})


const buttonInsertDepartment = document.querySelector('#button_insert_department');
const buttonCloseinsertDepartment = document.querySelector('#close_button_insert_department');

buttonCloseinsertDepartment.addEventListener('click', function(){
    closeModal('modal_insert_department')
 });

 buttonInsertDepartment.addEventListener('click', function(ev){
    startModal('modal_insert_department');
    const form = document.getElementById("form_insert_department");
    form.onsubmit = submitDepartment;
})







