let form = document.getElementById('item-form');
let itemInput = document.getElementById('item-input')

let deleteBtn = document.querySelectorAll('.remove-item');
let removeBtn = document.getElementById('clear');
let filter = document.getElementById('filter');


let container = document.querySelector('.container');

let itemList = document.querySelector("#item-list");
let li = document.querySelectorAll("li");

let noItemsMessage = document.getElementById('no-items-message');

function displayItems(){
    let itemFromStorage = getItemFromLocalStorage();

    itemFromStorage.forEach((item) => {
        addItemToDom(item);
    });

    checkUI();
}

function onAddItemsSubmit(e) {
    let noItemsMessage = document.getElementById('no-items-message');
    e.preventDefault();

    const formItems = new FormData(form);
    const typedItem = formItems.get('item');

    if(typedItem === ""){
        alert("Form cannot be empty!");
        return;
    }
    addItemToLocalStorage(typedItem);
    addItemToDom(typedItem);
}

// ADD ITEM TO localStorage
function addItemToLocalStorage(item){
    let itemFromStorage = getItemFromLocalStorage();

    if(localStorage.getItem('items') === null){
        itemFromStorage = [];
    } else {
        itemFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    itemFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function getItemFromLocalStorage(){
    let itemFromStorage;

    if(localStorage.getItem('items') === null){
        itemFromStorage = [];
    } else {
        itemFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemFromStorage;
}


// ADD ITEM TO DOM
function addItemToDom(typedItem){
    let li = document.createElement('li');
    let button = document.createElement('button');
    let icon = document.createElement('i');

    button.classList = "remove-item btn-link text-red";
    icon.classList = "fa-solid fa-xmark";


    button.appendChild(icon);
    let item = document.createTextNode(typedItem);

    li.appendChild(item);
    li.appendChild(button);
    itemList.appendChild(li);
    let output = itemList;

    itemInput.value = '';

    checkUI();
    if(noItemsMessage){
        noItemsMessage.remove();
    }
}

function filterItems(e) {
    let li = document.querySelectorAll("li");
    let text = e.target.value.toLowerCase();

    li.forEach((item) => {
        let itemName = item.firstChild.textContent.toLowerCase();

        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}


function onClickItem(e){
    if (e.target.parentElement.classList.contains('remove-item')) {
        deleteItem(e.target.parentElement.parentElement);
    } 
}

function deleteItem(item) {
        if(confirm("Are you sure you want to delete?")){
           item.remove();
           removeItemFromStorage(item.textContent);
        }
    
    checkUI();
}

function removeItemFromStorage(item){
    let itemFromStorage = getItemFromLocalStorage(item);

    itemFromStorage = itemFromStorage.filter((i) => i !== item);
    console.log(itemFromStorage);
}
function removeAll(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    // HIDE THE filter and clear all btn
    checkUI();
}

function checkUI() {
    let li = document.querySelectorAll("li");
    if (li.length === 0) {
        // Check if the message is already present
        if (!noItemsMessage) {
            let h1 = document.createElement('h1');
            let text = document.createTextNode("There are no items available!");

            removeBtn.style.display = "none";
            filter.style.display = "none";

            h1.appendChild(text);
            h1.id = 'no-items-message'; // Set an id for the message
            itemList.appendChild(h1); // Append the message to the itemList
        }
    } else {
        removeBtn.style.display = "initial";
        filter.style.display = "initial";
    }
}
function init(){
    form.addEventListener('submit', onAddItemsSubmit);
    itemList.addEventListener('click', onClickItem);
    removeBtn.addEventListener('click', removeAll);
    filter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI();
}

init();