const btn=document.getElementsByClassName("singlePro")
btn.action=`/user/problems/giveSol`


// function solF(){
//     const a=document.getElementById("ertsB")
//     const ipt=document.createElement("input")
//     ipt.name="hello"
//     ipt.type="submit"
//     document.getElementById("solF").appendChild(ipt)
// }

// function submitForm(event, index) {
//     event.preventDefault(); 
  
//     const form = event.target;
  
//     const username = form.querySelector('input[name="qwerty"]').value;
//     const typeP = form.parentElement.querySelector('input[name="typeP"]').innerText;
//     const problemI = form.parentElement.querySelector('input[name="problemI"]').innerText;
    
//     console.log('Username:', username);
//     console.log('Type of Problem:', typeP);
//     console.log('Description of the Problem:', problemI);
//     console.log('Index:', index);
  
//     form.submit();
//   }
  
