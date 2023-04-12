
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

            import{getDatabase, ref, set, get, child, update, remove} 
            from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

            const db = getDatabase();

            var stdName = document.getElementById("stdName");
            var stdId = document.getElementById("stdId");
            var stdSection = document.getElementById("stdSection");

            var insertBtn = document.getElementById("insertBtn");
            var selectBtn = document.getElementById("selectBtn");
            var updateBtn = document.getElementById("updateBtn");
            var deleteBtn = document.getElementById("deleteBtn");

            function insertData(){
                set(ref(db, "students/" + stdId.value),{
                    studentName: stdName.value,
                    studentId: stdId.value,
                    studentSection: stdSection.value
                }).then(()=>{
                    alert("Data inserted successfully");
                }).catch((error)=>{
                    alert("Unsuccessful, error: " + error);
                });
            }

            function selectData(){
                const dbRef = ref(db);

                get(child(dbRef, "students/"+stdId.value)).then((snapshot)=>{
                    if(snapshot.exists()){
                        stdName.value = snapshot.val().studentName;
                        stdId.value = snapshot.val().studentId;
                        stdSection.value = snapshot.val().studentSection;
                    }
                    else{
                        alert("Data not found");
                    }
                }).catch((error)=>{
                    alert("Error getting the data. Error: " + error);
                });
            }
            function updateData(){
                update(ref(db, "students/" + stdId.value),{
                    studentName: stdName.value,
                    studentSection: stdSection.value
                }).then(()=>{
                    alert("Data updated successfully");
                }).catch((error)=>{
                    alert("Unsuccessful, error: " + error);
                });
            }
            function deleteData(){
                remove(ref(db, "students/" + stdId.value)).then(()=>{
                    alert("Data deleted successfully");
                }).catch((error)=>{
                    alert("Unsuccessful, error: " + error);
                });
            }
            insertBtn.addEventListener("click", insertData);
            selectBtn.addEventListener("click", selectData);
            updateBtn.addEventListener("click", updateData);
            deleteBtn.addEventListener("click", deleteData);
        