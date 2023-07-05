const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const vacio = document.querySelector(".vacio");

window.addEventListener("DOMContentLoaded", () => {
    const itemsGuardados = JSON.parse(localStorage.getItem("items"));

    if (itemsGuardados) {
    itemsGuardados.forEach(itemText => {
        const li = crearListaDeItems(itemText);
        ul.appendChild(li);
    });
    }

    mostrarMensajeVacio();
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const text = input.value;

    if(text === ""){
        alert("No podes agregar una tarea vacía");
    }
    else{
        const li = crearListaDeItems(text);
        ul.appendChild(li);
        input.value = "";
    }

    guardarItemsEnLocalStorage();
    mostrarMensajeVacio();

})

const crearListaDeItems = (text) => {

    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text;

    li.appendChild(p)
    li.appendChild(botonBorrar());

    return li;
};

const botonBorrar = () => {
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "";
    botonBorrar.className = "fa-solid fa-xmark";

    botonBorrar.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        if (ul.querySelectorAll("li").length === 0) {
            vacio.style.display = "block";
        }
        guardarItemsEnLocalStorage();
        mostrarMensajeVacio();
    })

    return botonBorrar;
}

const guardarItemsEnLocalStorage = () => {
    const items = Array.from(ul.querySelectorAll("li")).map(li => li.querySelector("p").textContent);
    localStorage.setItem("items", JSON.stringify(items));
};

const mostrarMensajeVacio = () => {
    if (ul.querySelectorAll("li").length === 0) {
    vacio.style.display = "block";

    } else {
    vacio.style.display = "none";
    }
};





