const form = document.getElementById('item-form');
const itemInput = document.getElementById('item-input')

const deleteBtn = document.querySelectorAll('.remove-item');
const removeBtn = document.getElementById('clear');
const filter = document.getElementById('filter');


const container = document.querySelector('.container');

const itemList = document.querySelector("#item-list");
const li = document.querySelectorAll("li");

const noItemsMessage = document.getElementById('no-items-message');
let isEditMode = false;

const formBtn = form.querySelector('button'); 

function displayItems(){
    let itemFromStorage = getItemFromLocalStorage();

    itemFromStorage.forEach((item) => {
        addItemToDom(item);
    });
    const li = document.querySelectorAll("li");

    checkUI();
    if(noItemsMessage){
        noItemsMessage.remove();
    }
}

function onAddItemsSubmit(e) {

    let noItemsMessage = document.getElementById('no-items-message');
    e.preventDefault();
    
    const formItems = new FormData(form);
    const typedItem = formItems.get('item');

    const itemFromStorage = getItemFromLocalStorage('items');

    if(typedItem === ""){
        alert("Form cannot be empty!");
        return;
    } 

    if(itemFromStorage.includes(typedItem)){
        alert(`${typedItem} has already been written!`);
        return;
    }


    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.remove();
        isEditMode = false;
    }

    addItemToLocalStorage(typedItem);
    addItemToDom(typedItem);

    checkUI();
    if (noItemsMessage) {
        noItemsMessage.remove();
    }
    
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

function setEditItems(item){
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(item => {
        item.classList.remove('edit-mode');
    });

    item.classList.add('edit-mode');
    formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Edit Item";
    itemInput.value = item.textContent;
    formBtn.style.background = "#1fd655";
}

function onClickItem(e){
    // console.log(e.target.firstChild);
    if (e.target.parentElement.classList.contains('remove-item')) {
        deleteItem(e.target.parentElement.parentElement);
    } else {
        setEditItems(e.target);
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
    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}
function removeAll(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.clear('items');
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
            filter.insertAdjacentElement('afterend', h1); // Append the message to the itemList
        }
    } else {
        removeBtn.style.display = "initial";
        filter.style.display = "initial";

        if (noItemsMessage) {
            noItemsMessage.remove();
        }
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.background = "grey";
    isEditMode = false;
}
function init(){
    form.addEventListener('submit', onAddItemsSubmit);
    itemList.addEventListener('click', onClickItem);
    removeBtn.addEventListener('click', removeAll);
    filter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
}

init();