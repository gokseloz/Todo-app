var TodoInput = document.querySelector(".Todo-inputBlock-ipt"); //variable for the input area in which tasks are typed
var TodoList = document.querySelector(".Todo-list");  //variable for the div which contains tasks
var addBtn = document.querySelector(".Todo-inputBlock-btn"); //this button is riggered when press enter while typing in input area
var itemsCounter = document.querySelector(".Todo-footer-itemsCounter") //p element which counts the left items

//press enter and addBtn is triggered
TodoInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addBtn.click();
    }
});

//The whole adding task process begin when pressing enter
addBtn.addEventListener("click", function () {
    if (TodoInput.value == "") {
        return false
    };
    var paragraph = document.createElement("p"); //todos
    var todosCircle = document.createElement("div"); //circle on the left side of the todos
   
    var cancelBtn = document.createElement("div"); // X symbol on the right side of the todos

    paragraph.classList.add("todos");
    paragraph.innerText = TodoInput.value;
    if (document.querySelector("body").classList.contains("light")) { //if it is on light mode, tasks are typed according to the light mode properties.
        paragraph.classList.add("todos", "light");
    }
    todosCircle.classList.add("todos-circle")
    if (document.querySelector("body").classList.contains("light")) { //if it is on light mode, circle are created according to the light mode properties.
        todosCircle.classList.add("todos-circle", "light");
    }

    cancelBtn.classList.add("todos-cancel")
    cancelBtn.innerText = "✕"

    paragraph.appendChild(todosCircle); // circle is inside the paragraph
    paragraph.appendChild(cancelBtn); // cancel is inside the paragraph
    TodoList.appendChild(paragraph); // paragraph is added in Todolist

    TodoInput.value = "" // input area got clear after typing the task and entering

    counItem() //the function which counts the left item, it is written on the left bottom corner 

    todosCircle.addEventListener("click", function () { 
        todosCircle.classList.toggle("clicked") // "clicked" class is assigned to circle => check icon is created in it
        paragraph.classList.toggle("checked") // "checked" class is assigned to paragraph => line through
        counItem() // count function should be runned because clicking circle means task is completed 
    })

    cancelBtn.addEventListener("click", function () { // "X" cancel symbol remove the related paragraph(task)
        this.parentElement.remove() 
        counItem() // // count function should be runned because clicking cancel means the task is not anymore exist 
    })
})

function counItem() {                                                   
    var itemCount = TodoList.childElementCount                          // counts the all "element" in the todo-list
    var checkedElement = document.querySelectorAll(".checked").length   // counts the all "checked(completed) element" in the todo-list
    var uncheckedCount = itemCount - checkedElement;                    // finds the all unchecked element by substracting "all element" and "checked element"
    itemsCounter.innerText = uncheckedCount + " items left"             // shows it in the left bottom corner
}

document.querySelector(".clear-completed").addEventListener("click", function () { // clears th completed elements
    document.querySelectorAll(".checked").forEach(element => {
        element.remove()
    });
})
document.querySelector(".all").addEventListener("click", function () { // shows all element in the screen
    document.querySelectorAll(".todos").forEach(element => {
        element.style.display = "flex"
    });
})
document.querySelector(".completed").addEventListener("click", function () {   // shows only completed elements in the screen
    document.querySelectorAll(".checked").forEach(element => {                  
        element.style.display = "flex"                                         
    });                                                                         
    document.querySelectorAll(".todos:not(.checked)").forEach(element => {      
        element.style.display = "none"                                          
    });                                                                         
})
document.querySelector(".active").addEventListener("click", function () {   // shows only not completed(active) elements in the screen
    document.querySelectorAll(".checked").forEach(element => {              
        element.style.display = "none"                                      
    });                                                                     
    document.querySelectorAll(".todos:not(.checked)").forEach(element => {  
        element.style.display = "flex"                                      
    });                                                                    
})

$(".filterBtn").on("click", function () {          //this function changes the filter buttons(all, active, completed)'color when they are selected in both dark and light mode
    if (TodoList.childElementCount == 0) {         
        $(".filterBtn").removeClass("selected");   //if there is no task, filter buttons can not be selected
        return false
    } else if ($("body").hasClass("light")) {      //if it is light mode, 
        $(".filterBtn").addClass("light");         //filter button's get light class
        $(".filterBtn").removeClass("selected");   //selected class is removed from all filter buttons
        $(this).addClass("selected")               // only relevant button gets selected class
    } else {                                       //if it is dark mode,
        $(".filterBtn").removeClass("selected");   //selected class is removed from all filter buttons
        $(this).addClass("selected")               // only relevant button gets selected class
    }
})

document.querySelector(".Todo-heading-darkLight").addEventListener("click", function () { 
    document.querySelector(".img").classList.toggle("light")                              //======================================================================
    document.querySelector(".Todo-heading-darkLight").classList.toggle("moon")            
    document.querySelector(".Todo-inputBlock-ipt").classList.toggle("light")              //======================================================================
    document.querySelectorAll(".todos").forEach(element => {                              
        element.classList.toggle("light");                                                //======================================================================
    })
    document.querySelector(".Todo-footer").classList.toggle("light")                      //======================================================================
    document.querySelector("body").classList.toggle("light")                              
    document.querySelector(".container").classList.toggle("light")                        //when clicking the darkLight icon, located on the right top corner, it 
    document.querySelectorAll(".todos-circle").forEach(element => {                       
        element.classList.toggle("light");                                                //changes backgrounds, colors, imgs...
    })
    document.querySelector(".Todo-list").classList.toggle("light")                        //======================================================================
    document.querySelector(".Todo-footer-filters").classList.toggle("light")
    document.querySelectorAll(".filterBtn").forEach(filter => {                           //======================================================================
        filter.classList.toggle("light");
    })                                                                                    //======================================================================
    document.querySelector(".Todo-footer-btn").classList.toggle("light")
    document.querySelector(".Todo-footer-itemsCounter").classList.toggle("light")         //======================================================================
    document.querySelector("small").classList.toggle("light")
});

$(function () {                          //======================
    $("#sortable").sortable({            //======================
        revert: true                     // drag and drop library
    });                                  //======================
    $("#sortable").disableSelection();   //======================
});