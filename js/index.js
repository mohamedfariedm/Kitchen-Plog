$(document).ready(function(){
    $(".center").fadeOut(1000,function(){
        $("body").css("overflow","auto")
    })
})

//================================================================================
//                            SidePar
//================================================================================
const eButon = document.querySelector("#togel-icon");
const etogler = document.querySelector("#togler");
const ultogler = document.querySelector("#ul-togle");
let con1 = "fa-x";
let con2 = "fa-align-justify";
let change = "";
eButon.addEventListener("click", function () {
    ultogler.classList.toggle("trans-y")
    etogler.classList.toggle("trans")
    eButon.children[0].classList.replace(con1, con2)
    change = con1;
    con1 = con2;
    con2 = change;
})
//==================================================================================
// ??           serch data fetch
//==================================================================================
let meals,categor = [];
let responce, allData;
async function restorData(term, code){
    responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${code}=${term}`);
    allData = await responce.json();
    meals = allData.meals;
    if(meals==null){
        await restorData("", "s")
    }
}
async function restorCategories(url){
    responce = await fetch(url);
    allData = await responce.json();
    categor = allData.categories;
    console.log(categor)
}

async function restorCategoriesdd(url){
    responce = await fetch(url);
    allData = await responce.json();
    categor = allData.meals;
    console.log(categor)
}

let cat=[]
function mealsCategory() {
    let container = "";
    for (let i = 0; i < categor.length; i++) {
        let discribtion="";
        for(let x=0;x<135;x++){
            if(categor[i].strCategoryDescription.length>135){
                discribtion+=categor[i].strCategoryDescription[x];
            }else{discribtion=categor[i].strCategoryDescription}
        }
        container +=
            `
    <div class="col-md-3">
        <div class="position-relative parent overflow-hidden border border-0 rounded-3">
            <img src="${categor[i].strCategoryThumb}" class="w-100" />
            <div class="layer position-absolute text-center">
            <h3 class="">${categor[i].strCategory}</h3>
            <p class="p-2 overflow-hidden">${discribtion}</p>
            </div>
        </div>
    </div>
        `
        cat.push(categor[i].strCategory);
    }
    display(container);
}

function mealsArea() {
    let container = "";
    console.log(categor);
    for (let i = 0; i < categor.length; i++) {
        container +=
            `
    <div class="col-md-3">
        <div class=" text-white  parent overflow-hidden border border-0 rounded-3 text-center">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            
            <h3 class="">${categor[i].strArea}</h3>
            
        </div>
    </div>
        `
        cat.push(categor[i].strArea);
    }
    display(container);
}

function mealsingrediant() {

    let container = "";
    console.log(categor);
    for (let i = 0; i <20; i++) {
        let discribtion="";
        for(let x=0;x<100;x++){
                discribtion+=categor[i].strDescription[x];
        }
        container +=
            `
    <div class="col-md-3">
        <div class="p-2 text-white  parent overflow-hidden border border-0 rounded-3 text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class="">${categor[i].strIngredient}</h3>
            <p class="p-2 overflow-hidden">${discribtion}</p>
        </div>
    </div>
        `
        cat.push(categor[i].strIngredient);
    }
    display(container);
}
function login() {
        container=`
        <div class="row py-5 g-4 mt-10">
        <div class=" d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="" type="text" class=" placeholde-black form-control" placeholder="Enter Your Name" >
                    <div  class="alert alert-danger w-100 mt-2 d-none" id ="alert-name">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input type="email" class=" placeholde-black form-control " placeholder="Enter Your Email" >
                    <div  class="alert alert-danger w-100 mt-2 d-none" id="alert-email">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input  type="text" class=" placeholde-black  form-control " placeholder="Enter Your Phone" >
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none" id="alert-num">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input  type="number" class=" placeholde-black form-control " placeholder="Enter Your Age" >
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none" id="alert-age">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input  type="password" class="form-control placeholde-black " placeholder="Enter Your Password" >
                    <div class="alert alert-danger w-100 mt-2 d-none" id="alert-pass">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input  type="password" class=" form-control placeholde-black " placeholder="Repassword" >
                    <div class="alert alert-danger w-100 mt-2 d-none" id="alert-repass">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button  class="btn text-white px-2 mt-3" id="sub">Submit</button>
        </div>
    </div> 
    </div>
        `
        document.getElementById("main").innerHTML = "";
        document.getElementById("base").innerHTML = "";
        document.getElementById("main").innerHTML = container;
    }
restorCategories(`https://www.themealdb.com/api/json/v1/1/categories.php`)

//==================================================================================================================
async function playApp(term, code) {
    await restorData(term, code);
    mealsHome(meals);
col(meals);
callEvents();
}
function col(arr){
    let clickCool = document.querySelectorAll(".col-md-3");
    for (let i = 0; i < clickCool.length; i++) {
        clickCool[i].addEventListener("click", function () {
            let coun = mealsSupHome(arr,i)
            display(coun)
        })
    }
}
function colingerident(){
    let clickCool = document.querySelectorAll(".col-md-3");
    for (let i = 0; i < clickCool.length; i++) {
        clickCool[i].addEventListener("click", async function () {
            console.log(cat[i])
            await restorCategoriesdd(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${cat[i]}`);
            mealsHome(categor);
            clickCool = document.querySelectorAll(".col-md-3")
            for(let i = 0; i < clickCool.length; i++){
            clickCool[i].addEventListener("click",async function(){
                await restorData(categor[i].strMeal, "s")
                            mealsHome(meals);
                            col(meals);
            })
            }
        })
    }
}

function colarea(){
    let clickCool = document.querySelectorAll(".col-md-3");
    for (let i = 0; i < clickCool.length; i++) {
        clickCool[i].addEventListener("click", async function () {
            console.log(cat[i])
            await restorCategoriesdd(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cat[i]}`);
            mealsHome(categor);
            clickCool = document.querySelectorAll(".col-md-3")
            for(let i = 0; i < clickCool.length; i++){
            clickCool[i].addEventListener("click",async function(){
                await restorData(categor[i].strMeal, "s")
                            mealsHome(meals);
                            col(meals);
            })
            }
        })
    }
}

function colCategory(){
    let clickCool = document.querySelectorAll(".col-md-3");
    for (let i = 0; i < clickCool.length; i++) {
        clickCool[i].addEventListener("click", async function () {
            await restorCategoriesdd(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat[i]}`);
            mealsHome(categor);
            clickCool = document.querySelectorAll(".col-md-3")
            for(let i = 0; i < clickCool.length; i++){
            clickCool[i].addEventListener("click",async function(){
                await restorData(categor[i].strMeal, "s")
                            mealsHome(meals);
                            col(meals);
            })
            }
        })
    }
}


function callEvents(){
    let keysLi = document.querySelectorAll(".sidebar ul li");
        keysLi[0].addEventListener("click", function () {
            document.getElementById("main").innerHTML = "";
            ultogler.classList.toggle("trans-y");
            etogler.classList.toggle("trans");
            serchName()
            let  serchInput= document.querySelectorAll(".serchInput");
            serchInput[0].addEventListener("input",async function(){
                await restorData(this.value, "s");
                mealsHome(meals);
                col(meals)
            })
            serchInput[1].addEventListener("input",async function(){
                if(this.value===""){
                    await restorData("m", "f");
                }else{await restorData(this.value, "f");}
                mealsHome(meals);
                col(meals)
            })
        })
        keysLi[1].addEventListener("click", async function () {
            document.getElementById("main").innerHTML = "";
            document.getElementById("base").innerHTML = "";
            ultogler.classList.toggle("trans-y");
            etogler.classList.toggle("trans");
            await restorCategories(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            mealsCategory()
            colCategory()
        })
        keysLi[2].addEventListener("click", async function () {
            document.getElementById("main").innerHTML = "";
            document.getElementById("base").innerHTML = "";
            ultogler.classList.toggle("trans-y");
            etogler.classList.toggle("trans");
            await restorCategoriesdd(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
            mealsArea()
            colarea()
        })

        keysLi[3].addEventListener("click", async function () {
            document.getElementById("main").innerHTML = "";
            document.getElementById("base").innerHTML = "";
            ultogler.classList.toggle("trans-y");
            etogler.classList.toggle("trans");
            await restorCategoriesdd(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            mealsingrediant();
            colingerident();
        })
        keysLi[4].addEventListener("click", async function () {
            document.getElementById("main").innerHTML = "";
            document.getElementById("base").innerHTML = "";
            ultogler.classList.toggle("trans-y");
            etogler.classList.toggle("trans");
            login()
            let iputvalide=document.querySelectorAll(".placeholde-black")

            iputvalide[0].addEventListener("input",function(){
                cheekoll(iputvalide[0].value,iputvalide[4].value,iputvalide[1].value,iputvalide[2].value);
                if (cheekName(this.value)==false){
                    $("#alert-name").removeClass("d-none")
                }else{
                    $("#alert-name").addClass("d-none")
                }
                
            })
            iputvalide[1].addEventListener("input",function(){
                cheekoll(iputvalide[0].value,iputvalide[4].value,iputvalide[1].value,iputvalide[2].value);
                if (cheekEmail(this.value)==false){
                    $("#alert-email").removeClass("d-none")
                }else{
                    $("#alert-email").addClass("d-none")
                }
                
                
            })
            iputvalide[2].addEventListener("input",function(){
                cheekoll(iputvalide[0].value,iputvalide[4].value,iputvalide[1].value,iputvalide[2].value);
                if (cheekNumb(this.value)==false){
                    $("#alert-num").removeClass("d-none")
                }else{
                    $("#alert-num").addClass("d-none")
                }
                ;
            })
            iputvalide[3].addEventListener("input",function(){
                cheekoll(iputvalide[0].value,iputvalide[4].value,iputvalide[1].value,iputvalide[2].value);
                if (this.value>15){
                    $("#alert-age").removeClass("d-none")
                }else{
                    $("#alert-age").addClass("d-none")
                }
                ;
            })
            iputvalide[4].addEventListener("input",function(){
                cheekoll(iputvalide[0].value,iputvalide[4].value,iputvalide[1].value,iputvalide[2].value);
                if (cheekPass(this.value)==false){
                    $("#alert-pass").removeClass("d-none")
                }else{
                    $("#alert-pass").addClass("d-none")
                }
                ;
            })
            iputvalide[5].addEventListener("input",function(){
                cheekoll(iputvalide[0].value,iputvalide[4].value,iputvalide[1].value,iputvalide[2].value);
                if (this.value!=iputvalide[4].value){
                    $("#alert-repass").removeClass("d-none")
                }else{
                    $("#alert-repass").addClass("d-none")
                }
                ;
            })
        })

}

function cheekName(value){
let regex=/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/
return regex.test(value);
}
function cheekPass(value){
    let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return regex.test(value);
}
function cheekEmail(value){
    let regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(value);
}
 function cheekNumb(value){
    let regex=/^01[0125][0-9]{8}$/
    return regex.test(value);
 }

 function cheekoll(a,b,c,d){
   if(cheekName(a)&&cheekPass(b)&&cheekEmail(c)&&cheekNumb(d)) {
    $("#sub").addClass("btn-outline-danger")
   }else{$("#sub").removeClass("btn-outline-danger")}
 }
// password="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
// email="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
// number="^01[0125][0-9]{8}$"
// name="^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$"


//===================================================================================

//===================================================================================
function mealsHome(arr) {
    let container = "";
    for (let i = 0; i < arr.length; i++) {
        container +=
            `
    <div class="col-md-3">
        <div class="position-relative parent overflow-hidden border border-0 rounded-3">
            <img src="${arr[i].strMealThumb}" class="w-100" />
            <div class="layer position-absolute d-flex align-items-center">
            <h3 class="ps-3">${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
    }
    display(container);
}
//======================================================================================
//======================================================================================

function mealsSupHome(arr,i) {


    var container = "";
    let newobj = Object.values(arr[i]);
    if (newobj[7] != null) {
        var x = newobj[7];
    } else { var x = "no tags" }


    var box = "";
    for (let j = 9, k = 29; j < 29; j++, k++) {
        if (newobj[j] != "" && newobj[k] != "") {
            box += `<p class="bg-color p-1 border border-0 rounded-2 m-2">${newobj[k] + " " + newobj[j]}</p>`
        }
    }
    container +=
        `
        <div class="col-md-4">
            <img src="${arr[i].strMealThumb}" class=" w-100 border border-0 rounded-3 " alt="">
            <h2 class="text-white ">${arr[i].strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
            <h2 >Instructions</h2>
            <p>${arr[i].strInstructions}</p>
            <h3 class="fw-bold" >Area : <span class="fw-medium">${arr[i].strArea}</span> </h3>
            <h3 class="fw-bold" >Category : <span class="fw-medium">${arr[i].strCategory}</span> </h3>
            <h3 >Recipes :</h3>
            <div class="d-flex flex-wrap pb-2">
            ${box}
            </div>
            <h3 >Tags :</h3>
            <div class="d-flex mb-3" >
            <p class="tag px-2 py-1  border border-0 rounded-2 m-2 ">${x}</p>
            </div>
            <a href="${arr[i].strSource}" class="btn btn-success text-white border border-0 rounded-1 ">Source</a>
            <a href="${arr[i].strYoutube}"class="btn btn-danger text-white border border-0 rounded-1">Youtube</a>
        </div>
        `

    return container;


}
//======================================================================================
//======================================================================================
function display(contai) {
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").innerHTML = contai;
}


function serchName() {
    let container = `
        <div class="row w-75 m-auto pt-5">
        <div class="col-md-6 ">
            <input class="serchInput form-control bg-transparent text-white" type="text" placeholder="Search By Name" >
        </div>
        <div class="col-md-6">
            <input maxlength="1" class=" serchInput form-control bg-transparent text-white" type="text" placeholder="Search By First Letter" >
        </div>
        </div>
    `
    document.getElementById("main").innerHTML = "";
    document.getElementById("base").innerHTML = container;
}
    playApp("", "s");


