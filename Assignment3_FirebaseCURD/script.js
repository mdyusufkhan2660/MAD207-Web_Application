import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYIzN5GByTNyoMJgAUkNyEpG9fCygK5SE",
    authDomain: "fir-webappdemo-fff74.firebaseapp.com",
    projectId: "fir-webappdemo-fff74",
    storageBucket: "fir-webappdemo-fff74.appspot.com",
    messagingSenderId: "306967142643",
    appId: "1:306967142643:web:00fc8f0e749fb5303b9786"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
import{getDatabase, ref, set, get, child, update, remove, onValue} 
from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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
    return formData;
}

window.insertNewRecord = function(data) {
    var table = document.getElementById("userList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.studentId;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.firstName;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.lastName;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.studentDoB;
    var cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.studentGender;
    var cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;

}

window.resetForm = function() {
    document.getElementById("studentId").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("studentDoB").value = "";
    document.getElementById("studentGender").value = "Male";
    selectedRow = null;
}

window.onEdit = function(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("studentId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("firstName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("studentDoB").value = selectedRow.cells[4].innerHTML;
    document.getElementById("studentGender").value = selectedRow.cells[5].innerHTML;
}
window.updateRecord = function(formData) {
    selectedRow.cells[1].innerHTML = formData.firstName;
    selectedRow.cells[2].innerHTML = formData.lastName;
    selectedRow.cells[3].innerHTML = formData.email;
    selectedRow.cells[4].innerHTML = formData.studentDoB;
    selectedRow.cells[5].innerHTML = formData.studentGender;
}
window.onDelete = function(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("userList").deleteRow(row.rowIndex);
        resetForm();
    }
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
    table.innerHTML = ""; // Clear the table before rendering data
    Object.keys(data).forEach((key) => {
      const student = data[key];
      const newRow = table.insertRow(table.length);
      const cell1 = newRow.insertCell(0);
      cell1.innerHTML = key;
      const cell2 = newRow.insertCell(1);
      cell2.innerHTML = student.firstName;
      const cell3 = newRow.insertCell(2);
      cell3.innerHTML = student.lastName;
      const cell4 = newRow.insertCell(3);
      cell4.innerHTML = student.email;
      const cell5 = newRow.insertCell(4);
      cell5.innerHTML = student.studentDoB;
      const cell6 = newRow.insertCell(5);
      cell6.innerHTML = student.studentGender;
      const cell7 = newRow.insertCell(6);
      cell7.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                         <a onClick="onDelete(this)">Delete</a>`;
    });
  }
  
  // Function to handle realtime updates
  function handleRealtimeUpdates() {
    onValue(ref(db, "students"), (snapshot) => {
      const data = snapshot.val();
      renderData(data);
    });
  }
  
  // Call handleRealtimeUpdates to start listening to changes
  handleRealtimeUpdates();



  
  