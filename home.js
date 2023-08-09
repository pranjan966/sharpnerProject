const formInfo = document.querySelector("#myForm")
const listItems = document.getElementById("items");

console.log(formInfo)

formInfo.addEventListener("submit", submit);
// listItems.addEventListener("click", deleteBtn);
const productList = [];
function submit(e) {
    console.log(e);
    e.preventDefault();
    formInfo.style.background = "#f4f4f4";
    const sellingPrice= document.getElementById("sellingPrice").value;
    const ProductName = document.getElementById("ProductName").value;
    
    console.log(sellingPrice)
    console.log(ProductName)
    fetch(
        "https://crudcrud.com/api/090dff093606401dbbf81d60c82e9d8e/appointmentData",
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            sellingPrice:sellingPrice,
            productName: ProductName
          }),
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          // CREATING NEW ELEMENT
          let liElement = null;
          // const elementAlreadyExist = localStorage.getItem(email);
    
          liElement = createLiElement(
            response._id,
            response.sellingPrice,
            response.ProductName,
           
          );
    
          if (liElement !== null) {
            listItems.appendChild(liElement);
          }
          console.log("response saved successfully : ", response);
        })
        .catch((err) => {
          console.log("Error while saving the data : ", err);
        });
  }


window.onload = () => {
  fetch(
    "https://crudcrud.com/api/090dff093606401dbbf81d60c82e9d8e/appointmentData",
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  )
    .then((response) => {
        console.log(response)
      return response.json();
      console.log(response)
    })
    .then((response) => {
      
      const productList = response;
    //   console.log("productList: ", productList);
      console.log(productList)
      for (let i = 0; i < productList.length; i++) {
        console.log(" item : ", i);
        if (listItems) {
          listItems.appendChild(
            createLiElement(
                productList[i]._id,
                productList[i].sellingPrice,
                productList[i].productName,
           
            )
          );
        } else {
          alert("item list not found");
        }
      }
    })
    .catch((err) => console.log(err));
};


function createLiElement(id,sellingPrice,productName) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.id = id;
    li.appendChild(document.createTextNode(`* ${productName}`));
    // CREATING NEW DELETE BUTTON IN LI ELEMENT
    li.appendChild(deleteBtn(id));
    
    return li;
  }

  function deleteBtn(id) {
    const deleteBtn = document.createElement("delete");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.id = `${id}_delete`;
    deleteBtn.appendChild(document.createTextNode("Delete"));
    deleteBtn.onclick = (e) => {
      if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure")) {
          fetch(
            `https://crudcrud.com/api/090dff093606401dbbf81d60c82e9d8e/appointmentData/${e.target.parentElement.id}`,
            {
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              method: "DELETE",
            }
          )
            .then((res) => {
              const li = e.target.parentElement;
              listItems.removeChild(li);
              console.log("response saved successfully : ", res);
            })
            .catch((err) => {
              console.log("Error while saving the data : ", err);
            });
          // localStorage.removeItem(email);
        }
      }
    };
    return deleteBtn;
  }