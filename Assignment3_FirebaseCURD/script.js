import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBYIzN5GByTNyoMJgAUkNyEpG9fCygK5SE",
    authDomain: "fir-webappdemo-fff74.firebaseapp.com",
    projectId: "fir-webappdemo-fff74",
    storageBucket: "fir-webappdemo-fff74.appspot.com",
    messagingSenderId: "306967142643",
    appId: "1:306967142643:web:00fc8f0e749fb5303b9786"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase();
const table = document.getElementById("userList").getElementsByTagName("tbody")[0];
var selectedRow = null;

window.onFormSubmit = function() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

window.readFormData = function() {
    var formData = {};
    formData["studentId"] = document.getElementById("studentId").value;
    formData["firstName"] = document.getElementById("firstName").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["email"] = document.getElementById("email").value;
    formData["studentDoB"] = document.getElementById("studentDoB").value;
    formData["studentGender"] = document.getElementById("studentGender").value;
    formData["studentPicture"] = document.getElementById("studentPicture").files[0];
    return formData;
}

window.insertNewRecord = async function(data) {
    var table = document.getElementById("userList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    const url = await uploadPicturegetURL(data.studentPicture);
    data.studentPicture = url;

    newRow.insertCell(0).innerHTML = data.studentId;
    newRow.insertCell(1).innerHTML = `<img id="picture${data.studentId}" src="${data.studentPicture}" width="50" height="50"></img>`;
    newRow.insertCell(2).innerHTML = data.firstName;
    newRow.insertCell(3).innerHTML = data.lastName;
    newRow.insertCell(4).innerHTML = data.email;
    newRow.insertCell(5).innerHTML = data.studentDoB;
    newRow.insertCell(6).innerHTML = data.studentGender;
    newRow.insertCell(7).innerHTML = `<a onClick="onEdit(this)">Edit</a>
                                      <a onClick="onDelete(this)">Delete</a>`;
    
    insertData(data);
}

function insertData(data){
    set(ref(db, "students/" + data.studentId),{
        studentId: data.studentId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        studentDoB: data.studentDoB,
        studentGender: data.studentGender,
        studentPicture: data.studentPicture

    }).then(()=>{
        alert("Data inserted successfully");
    }).catch((error)=>{
        alert("Unsuccessful, error: " + error);
    });
}
  
window.resetForm = function() {
    document.getElementById("studentId").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("studentDoB").value = "";
    document.getElementById("studentGender").value = "Male";
    document.getElementById("studentPicture").value = "";
    selectedRow = null;
}

window.onEdit = function(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("studentId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("firstName").value = selectedRow.cells[2].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[3].innerHTML;
    document.getElementById("email").value = selectedRow.cells[4].innerHTML;
    document.getElementById("studentDoB").value = selectedRow.cells[5].innerHTML;
    document.getElementById("studentGender").value = selectedRow.cells[6].innerHTML;
}
window.updateRecord = function(formData) {
    selectedRow.cells[2].innerHTML = formData.firstName;
    selectedRow.cells[3].innerHTML = formData.lastName;
    selectedRow.cells[4].innerHTML = formData.email;
    selectedRow.cells[5].innerHTML = formData.studentDoB;
    selectedRow.cells[6].innerHTML = formData.studentGender;
    updateData(formData);
}
async function updateData(data){
    var file = document.getElementById("studentPicture").files[0];
    var url = "";
    if(file){
        url = await uploadPicturegetURL(file);
    }
    else{
        url = document.getElementById("picture"+data.studentId).src;
    }
    update(ref(db, "students/" + data.studentId),{
        studentId: data.studentId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        studentDoB: data.studentDoB,
        studentGender: data.studentGender,
        studentPicture: url
    }).then(()=>{
        alert("Data updated successfully");
    }).catch((error)=>{
        alert("Unsuccessful, error: " + error);
    });
}
window.onDelete = function(td) {
    if (confirm('Are you sure to delete this record ?')) {
        var row = td.parentElement.parentElement;
        deleteData(row.cells[0].innerHTML);
        document.getElementById("userList").deleteRow(row.rowIndex);
        resetForm();
        location.reload();
    }
}
function deleteData(id){
    remove(ref(db, "students/" + id)).then(()=>{
        alert("Data deleted successfully");
    }).catch((error)=>{
        alert("Unsuccessful, error: " + error);
    });
}
window.validate = function() {
    var isValid = true;
    if (document.getElementById("studentId").value == "") {
        isValid = false;
        document.getElementById("idValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("idValidationError").classList.contains("hide"))
            document.getElementById("idValidationError").classList.add("hide");
    }
    return isValid;
}

function renderData(data) {
    table.innerHTML = "";
    Object.keys(data).forEach((key) => {
      const student = data[key];
      const newRow = table.insertRow(table.length);

      newRow.insertCell(0).innerHTML = key;
      newRow.insertCell(1).innerHTML = `<img id="picture${student.studentId}" src="${student.studentPicture}" width="50" height="50"></img>`;
      newRow.insertCell(2).innerHTML = student.firstName;
      newRow.insertCell(3).innerHTML = student.lastName;
      newRow.insertCell(4).innerHTML = student.email;
      newRow.insertCell(5).innerHTML = student.studentDoB;
      newRow.insertCell(6).innerHTML = student.studentGender;
      newRow.insertCell(7).innerHTML = `<a onClick="onEdit(this)">Edit</a>
                                        <a onClick="onDelete(this)">Delete</a>`;
    });
  }
  function showDataTable() {
    onValue(ref(db, "students"), (snapshot) => {
      const data = snapshot.val();
      renderData(data);
    });
  }
  showDataTable();

  function uploadPicturegetURL(file) {
    const storageReference = storageRef(storage, "mad207-assignment3/"+file.name);
    return new Promise((resolve, reject) => {
        const task = uploadBytes(storageReference, file);
        task.then(() => {
            getDownloadURL(storageReference).then((url) => {
                resolve(url);
          })
          .catch((error) => {
            reject(error);
          });
      }).catch((error) => {
        reject(error);
      });
    });
}



  
  