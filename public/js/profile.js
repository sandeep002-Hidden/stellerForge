
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
       <p>Name of the project</p>
       <input type="text" name="nameP" class="ipField" required >
       <p>Fill the details of the project</p>
       <textarea name="detailP" id="" cols="63" rows="10"></textarea>
       <p>Aim of the project</p>
       <textarea name="aimP" id="" cols="63" rows="10" required></textarea>
       <p>Choose the file</p>
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
function seeProfileDetail(){
  const pd=document.getElementById("userDetails")
    const pd2=document.getElementById("media")
    const pd3=document.getElementById("media")
  if(document.getElementById("btn1").innerText==="See Profile Details"){
    
    pd.style.display="block"
    pd2.style.display="block";
    document.getElementById("btn1").innerText="Hide Profile Details"
  }
  else{
    pd.style.display="none"
    pd2.style.display="none";
    document.getElementById("btn1").innerText="See Profile Details"
  }
}