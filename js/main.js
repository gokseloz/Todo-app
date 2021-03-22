let TodoInput = document.querySelector(".Todo-inputBlock-ipt");
let TodoList = document.querySelector(".Todo-list");
let addBtn = document.querySelector(".Todo-inputBlock-btn");
let itemsCounter = document.querySelector(".Todo-footer-itemsCounter");
let allBtn = document.querySelector(".all")
let activeBtn = document.querySelector(".active")
let completedBtn = document.querySelector(".completed")
let clearCompletedBtn = document.querySelector(".clear-completed")
let checkedTodo = document.querySelectorAll(".checked")
let body = document.querySelector("body")

const addTodo = () => {
    toDoMaker(TodoInput.value)
    // saveTodo(TodoInput.value)
    TodoInput.value = ""
}

addBtn.addEventListener("click", addTodo)

const toDoMaker = (text) => {
    let toDoItem = document.createElement("p");
    let toDoCircle = document.createElement("div")
    let toDoCancel = document.createElement("div")


    toDoItem.classList.add("todos")
    toDoCircle.classList.add("todos-circle")
    toDoCancel.classList.add("todos-cancel")

    toDoItem.textContent = text
    toDoCancel.textContent = "✕"

    if (body.classList.contains("light")) {
        toDoItem.classList.add("todos", "light")
        toDoCircle.classList.add("todos-circle", "light")
    }

    toDoItem.appendChild(toDoCircle)
    toDoItem.appendChild(toDoCancel)
    TodoList.appendChild(toDoItem)

    countItem()

    toDoCircle.addEventListener("click", () => {
        toDoCircle.classList.toggle("clicked")
        toDoItem.classList.toggle("checked")
        countItem()

    })

    toDoCancel.addEventListener("click", () => {
        toDoCancel.parentElement.remove()
        countItem()
        if (TodoList.childElementCount == 0) {
            $(".filterBtn").removeClass("selected");
        }
    })
}

// const saveTodo = (item) => {
//     let storedItems = localStorage.getItem(`savedValues`)
//     storedItems = storedItems ? JSON.parse(storedItems) : []
//     storedItems.push(item)
//     localStorage.setItem(`savedValues`, JSON.stringify(storedItems))
// }

// let storedItems = localStorage.getItem(`savedValues`)
// if (storedItems) {
//     JSON.parse(storedItems).forEach((item) => {
//         toDoMaker(item)
//     })
// }

const countItem = () => {
    let itemCount = TodoList.childElementCount
    let checkedElement = document.querySelectorAll(".checked").length
    let uncheckedCount = itemCount - checkedElement;
    itemsCounter.innerText = uncheckedCount + " items left"
}

clearCompletedBtn.addEventListener("click", () => {
    document.querySelectorAll(".checked").forEach(element => {
        element.remove()
    });
})
allBtn.addEventListener("click", () => {
    document.querySelectorAll(".todos").forEach(element => {
        element.style.display = "flex"
    });

})
completedBtn.addEventListener("click", () => {
    document.querySelectorAll(".checked").forEach(element => {
        element.style.display = "flex"
    });

    document.querySelectorAll(".todos:not(.checked)").forEach(element => {
        element.style.display = "none"
    });
})
activeBtn.addEventListener("click", () => {
    document.querySelectorAll(".checked").forEach(element => {
        element.style.display = "none"
    });
    document.querySelectorAll(".todos:not(.checked)").forEach(element => {
        element.style.display = "flex"
    });
})

let filterBtns = document.querySelectorAll(".filterBtn")
filterBtns.forEach(filterBtn => {
    filterBtn.addEventListener("click", () => {
        for(let i = 0; i< filterBtns.length; i ++){
            filterBtns[i].classList.remove("selected")
        }
        filterBtn.classList.add("selected")
    })
})

// $(".filterBtn").on("click", () => {
//     $(".filterBtn").removeClass("selected");
//     $(this).addClass("selected")
// })

// $(".filterBtn").on("click", () => {
//     if ($("body").hasClass("light")) {
//         $(".filterBtn").addClass("light");
//         $(".filterBtn").removeClass("selected");
//         $(this).addClass("selected")
//     } else {
//         $(".filterBtn").removeClass("selected");
//         $(this).addClass("selected")
//     }
// })

document.querySelector(".Todo-heading-darkLight").addEventListener("click", () => {
    document.querySelector(".img").classList.toggle("light")
    document.querySelector(".Todo-heading-darkLight").classList.toggle("moon")
    document.querySelector(".Todo-inputBlock-ipt").classList.toggle("light")
    document.querySelectorAll(".todos").forEach(element => {
        element.classList.toggle("light");
    })
    document.querySelector(".Todo-footer").classList.toggle("light")
    document.querySelector("body").classList.toggle("light")
    document.querySelector(".container").classList.toggle("light")
    document.querySelectorAll(".todos-circle").forEach(element => {
        element.classList.toggle("light");
    })
    document.querySelector(".Todo-list").classList.toggle("light")
    document.querySelector(".Todo-footer-filters").classList.toggle("light")
    document.querySelectorAll(".filterBtn").forEach(filter => {
        filter.classList.toggle("light");
    })
    document.querySelector(".Todo-footer-btn").classList.toggle("light")
    document.querySelector(".Todo-footer-itemsCounter").classList.toggle("light")
    document.querySelector("small").classList.toggle("light")
});

TodoInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        addTodo()
    }
});

// drag and drop library
$(() => {
    $("#sortable").sortable({
        revert: true
    });
    $("#sortable").disableSelection();
});