let toDoForm = document.querySelector(".ToDo-form");
let toDoInput = document.querySelector(".ToDo-form-ipt");
let TodoList = document.querySelector(".Todo-list");
let itemsCounter = document.querySelector(".Todo-footer-itemsCounter");
let filterBtns = document.querySelectorAll(".filterBtn")
let allBtn = document.querySelector(".all")
let activeBtn = document.querySelector(".active")
let completedBtn = document.querySelector(".completed")
let clearCompletedBtn = document.querySelector(".clear-completed")
let checkedTodo = document.querySelectorAll(".checked")
let darkLightModeBtn = document.querySelector(".Todo-heading-darkLight")
let body = document.querySelector("body")

const allTodos = JSON.parse(localStorage.getItem("allTodos"))



const addTodo = (e) => {
    e.preventDefault()
    toDoMaker(toDoInput.value)
    toDoInput.value = ""
}

toDoForm.addEventListener("submit", addTodo)

const toDoMaker = (text) => {

    let todoDiv = document.createElement("div")
    let toDoItem = document.createElement("p");
    let toDoCircle = document.createElement("div")
    let toDoCancel = document.createElement("div")

    todoDiv.classList.add("todoDiv")
    toDoItem.classList.add("todos")
    toDoCircle.classList.add("todos-circle")
    toDoCancel.classList.add("todos-cancel")
    toDoCancel.innerHTML = `<i class="fas fa-times"></i>`
    toDoItem.textContent = text

    if (body.classList.contains("light")) {
        todoDiv.classList.add("todos", "light")
        toDoCircle.classList.add("todos-circle", "light")
    }

    todoDiv.appendChild(toDoItem)
    todoDiv.appendChild(toDoCircle)
    todoDiv.appendChild(toDoCancel)
    TodoList.appendChild(todoDiv)

    toDoCircle.addEventListener("click", () => {
        toDoCircle.classList.toggle("clicked")
        todoDiv.classList.toggle("checked")
        countItem()
        updateList()
    })

    toDoCancel.addEventListener("click", () => {
        toDoCancel.parentElement.remove()
        countItem()
        if (TodoList.childElementCount == 0) {
            $(".filterBtn").removeClass("selected");
        }
        updateList()
    })

    countItem()
    updateList()
}

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
    updateList()
})
allBtn.addEventListener("click", () => {
    document.querySelectorAll(".todoDiv").forEach(element => {
        element.style.display = "flex"
    });

})
completedBtn.addEventListener("click", () => {
    document.querySelectorAll(".checked").forEach(element => {
        element.style.display = "flex"
    });

    document.querySelectorAll(".todoDiv:not(.checked)").forEach(element => {
        element.style.display = "none"
    });
    updateList()
})
activeBtn.addEventListener("click", () => {
    document.querySelectorAll(".checked").forEach(element => {
        element.style.display = "none"
    });
    document.querySelectorAll(".todoDiv:not(.checked)").forEach(element => {
        element.style.display = "flex"
    });
})


filterBtns.forEach(filterBtn => {
    filterBtn.addEventListener("click", () => {
        for (let i = 0; i < filterBtns.length; i++) {
            filterBtns[i].classList.remove("selected")
        }
        filterBtn.classList.add("selected")
    })
})

document.querySelector(".Todo-heading-darkLight").addEventListener("click", () => {
    document.querySelector(".img").classList.toggle("light")
    document.querySelector(".Todo-heading-darkLight").classList.toggle("moon")
    document.querySelector(".ToDo-form-ipt").classList.toggle("light")
    document.querySelectorAll(".todoDiv").forEach(element => {
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

if (allTodos) {
    allTodos.forEach(todo => toDoMaker(todo.text))
}

function updateList() {
    todosEl = document.querySelectorAll(".todoDiv")

    const allTodos = []

    todosEl.forEach(todoEl => {
        allTodos.push({
            text: todoEl.innerText,
            checked: todoEl.classList.contains("checked")
        })

    })


    localStorage.setItem("allTodos", JSON.stringify(allTodos))
}

// drag and drop library
$(() => {
    $("#sortable").sortable({
        revert: true
    });
    $("#sortable").disableSelection();
});