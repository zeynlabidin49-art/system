let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let mood = "creat"
let tmp


// get total
function getTotal(){
    if (price.value != ""){
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value
        total.style.backgroundColor = "green"
    }else{
        total.innerHTML = ""
        total.style.backgroundColor = "red"
    }

}

  
// create product
let dataPro
if (localStorage.getItem("product")) {
    dataPro = JSON.parse(localStorage.getItem("product"))
}else {
    dataPro = []
}
submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (newPro.title !== "" && newPro.category !== '' && mood == "creat"){
        if (newPro.count > 1 )
            for (i = 1 ; i <= newPro.count; i++){
                dataPro.push(newPro)
                localStorage.setItem("product", JSON.stringify(dataPro))
        }else if (newPro.count !== "" && newPro.count === 1){
            dataPro.push(newPro)
            localStorage.setItem("product", JSON.stringify(dataPro))
        }
    }else if(mood === "update"){
        dataPro[tmp] = newPro
        submit.innerHTML = "Creat"
        count.style.display = 'block'
        mood = "creat"
    }
    
    
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""

    showData()
}
// save localStorage
// clear inputs
// read  
function showData(){
    let table = ""
    if (dataPro.length > 0) {
        for (i = 0; i < dataPro.length; i++){
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick = "update(${i})">Update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>
                `
                document.getElementById("tbody").innerHTML = table
            }
    }else{
        document.getElementById("tbody").innerHTML = ""
      }
    
    if (dataPro.length > 0 && !document.getElementById("btndeleteAll")){
        let deleteAll = document.createElement("button")
        deleteAll.id = "btndeleteAll"
        document.getElementById("deleteAll").appendChild(deleteAll)
        deleteAll.style.cssText = `
                background-color: var(--second-color);
                cursor: pointer;
                border-radius: 20px;
                border: none;
                outline: none;
                padding: 12px;
                width: 100%;
                color: var(--color);
                font-size: 12px;
        `
        deleteAll.innerText = "Delete All"
        deleteAll.onclick = function(){
            localStorage.clear()
            dataPro.splice(0)
            deleteAll.remove()
            showData()
        }
    }
}
showData()
// delete 
function deleteData(index){
    dataPro.splice(index, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
function update(index){
    title.value = dataPro[index].title
    price.value = dataPro[index].price
    taxes.value = dataPro[index].taxes
    ads.value = dataPro[index].ads
    discount.value = dataPro[index].discount
    total.innerHTML = dataPro[index].total
    count.value = dataPro[index].count
    category.value = dataPro[index].category
    getTotal()
    count.style.display = "none"
    submit.innerHTML = "Update"
    tmp = index
    mood = "update"

    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// count 

// update 
// search
let searchMod = "title"
function searchMode(id){
    if (id === "searchByTitle"){
        searchMod = "title"
    }else {
        searchMod = "category"
    }
    document.getElementById("search").focus()
    document.getElementById("search").value = ""
    showData()
    
}
function searchData(value){
    let table = ""
    if (searchMod === "title"){
        for(let i = 0; i < dataPro.length; i++){
            if (dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick = "update(${i})">Update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>
                `
            }
        }
    }else if (searchMod === "category"){
        for(let i = 0; i < dataPro.length; i++){
            if (dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick = "update(${i})">Update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>
                `
                
            }
            
        }
    }
    document.getElementById("tbody").innerHTML = table
    
}


// clean data   