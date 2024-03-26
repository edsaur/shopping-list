let form = document.getElementById('item-form');
let itemInput = document.getElementById('item-input')

let deleteBtn = document.querySelectorAll('.remove-item');
let removeBtn = document.getElementById('clear');

let container = document.querySelector('.container');

let itemList = document.querySelector("#item-list");
let li = document.querySelectorAll("li");

let noItemsMessage = document.getElementById('no-items-message');

function addItems(e) {
    let noItemsMessage = document.getElementById('no-items-message');
    e.preventDefault();

    const formItems = new FormData(form);
    const typedItem = formItems.get('item');

    if(typedItem === ""){
        alert("Form cannot be empty!");
    } else {
       

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

        console.log(output);

        if(noItemsMessage){
            console.log("REMOVE!")
            noItemsMessage.remove();
        }
}
}

function deleteItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
        let li = document.querySelectorAll("li");
        noItems(li);
      } 
}

function removeAll(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    let li = document.querySelectorAll("li");
    noItems(li);
}

function noItems(li) {
    if (li.length === 0) {
        // Check if the message is already present
        if (!noItemsMessage) {
            let h1 = document.createElement('h1');
            let text = document.createTextNode("There are no items available!");

            h1.appendChild(text);
            h1.id = 'no-items-message'; // Set an id for the message
            itemList.appendChild(h1); // Append the message to the itemList
        }
    }
}



form.addEventListener('submit', addItems);
itemList.addEventListener('click', deleteItem);
removeBtn.addEventListener('click', removeAll);
noItems(li);
