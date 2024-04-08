
function addForm() {
  var formContainer = document.getElementById("addproject");
  formContainer.innerHTML = "";
  const form = document.createElement("form");
  form.action = `/user/profile/`;
  form.method = "post";
  form.id = "projectDetails";
  form.enctype="multipart/form-data"
  form.innerHTML = `
      <h1>Add the Details of the project</h1>
       <label for="nameP">Name of the project</label>
       <input type="text" name="nameP" class="ipField" required >
       <label for="detailP">Fill the details of the project</label>
       <textarea name="detailP" id="" cols="63" rows="10"></textarea>
       <label for="aimP">Aim of the project</label>
       <textarea name="aimP" id="" cols="63" rows="10" required></textarea>
       <label for="files" id="proName">Choose the file</label>
       <input type="file" id="files" name="files" required class="ipField">
       <div id="fileDetailsContainer"></div>
       <button type="button" class="pdBtn" onclick="addFile()">Add File</button>
       <input type="submit" class="pdBtn" value="Submit">
   `;
  formContainer.appendChild(form);
}

function addFile() {
  var fileDetailsContainer = document.getElementById("fileDetailsContainer");
  var fileDetailsDiv = document.createElement("div");
  fileDetailsDiv.innerHTML = `
  <label for="files" id="proName">Choose the file</label>
  <input type="file" id="files" name="files" required class="ipField">
  `;
  fileDetailsContainer.appendChild(fileDetailsDiv);
}
function alertT(){
  alert("Your project is successfully added")
}
var link1=document.getElementById("hl")
link1.href=window.location.pathname
var link2=document.getElementById("hl2")
var link3=document.getElementById("hl3")
var link4=document.getElementById("editpb")
var link5=document.getElementById("hl4")
link2.href=`/user/Groups`
link3.href=`/user/problems`
link4.href=`/user/EditProfile`
link5.href=`/user/FindProjects`
var form2=document.getElementById("userS")
form2.action=`/user/findUser`
function readFile(item, index) {
  let editor = document.getElementById("editor");
  editor.textContent = item.Codes[index].content;
  const button = document.createElement("button");
  button.innerHTML="copy!"
  button.id="copyBtn"
  button.addEventListener("click", handleClick);
  editor.appendChild(button)
}
function handleClick(){
  const copyText=document.getElementById("editor")
  console.log(copyText.textContent)
  navigator.clipboard.writeText(copyText.textContent);
  alert("Copied to clipbord")
}
