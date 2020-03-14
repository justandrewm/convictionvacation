const selectors = {
    TEXT: 'text',
    CHECKBOX: 'checkbox',
    SIGNATURE: 'signature'
}

let addingItem = false;
let body = document.getElementById('form-body');
let currentItem = null;

document.addEventListener("click", function(){
    if(addingItem && currentItem != null) {
        currentItem.removeAttribute('id');
        var rect = currentItem.getBoundingClientRect();
        console.log("X: " + rect.left + ", Y: " + rect.top);
        addingItem = false;
        currentItem = null;
    }else {
        // if(!addingItem)
        // console.log("Not adding items");

        // if(currentItem == null)
        // console.log("Current item is null"); 
    }
});


function onSelector(selector) {
    if(addingItem)
    return;

    switch (selector) {
        case selectors.TEXT:
            currentItem = document.createElement("div");
            currentItem.append(document.createTextNode("Enter some text here"));
            currentItem.setAttribute('contenteditable', true);
            currentItem.id = "selector-item";
            currentItem.className = 'form__item form__item--text';
            body.append(currentItem);
            break;

        case selectors.CHECKBOX:
            currentItem = document.createElement("input");
            currentItem.setAttribute('type', "checkbox");
            currentItem.id = "selector-item";
            currentItem.className = 'form-check-input form__item form__item--checkbox';
            body.append(currentItem);
            break;

        case selectors.SIGNATURE:
            currentItem = document.createElement("div");
            currentItem.id = "selector-item";
            currentItem.className = 'form__item form__item--signature';
            body.append(currentItem);
            break;

        default:
            break;
    }

    //Move on right click
    if(currentItem != null) {
        currentItem.addEventListener('contextmenu', function(){ 
            this.id = 'selector-item';
            currentItem = this; 
            setTimeout(function(){ addingItem = true }, 500);
            return false;
        })
    }

    setTimeout(function(){ addingItem=currentItem != null }, 500);
}