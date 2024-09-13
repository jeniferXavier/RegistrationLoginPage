document.getElementById('add-task').addEventListener('click', (e)=> {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        setSuccess(taskInput);
        addTask(taskText);
        taskInput.value = '';
        
    }
    else
    {
        e.preventDefault();
        setError(taskInput,"Task is required");
    }
});

function addTask(taskText) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    const taskName = document.createElement('span');
    taskName.textContent = taskText;

    const editBtn = addEditButton(taskItem);
    const deleteBtn = addDeleteButton(taskItem,taskList);
    

    taskItem.appendChild(taskName);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
}

function addEditButton(taskItem){
    const editBtn = document.createElement('span');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', function() {
        edit(taskItem);
        
    });
    return editBtn;
}


function addDeleteButton(taskItem,taskList){
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    });
    return deleteBtn;
}

function edit(taskItem){
    
    firstElementBefore = taskItem.firstElementChild;
    taskName = taskItem.firstElementChild.innerText;
    const parentDiv = document.createElement('div');
    parentDiv.id = 'parentDiv';
    parentDiv.setAttribute("class", "input-group");
    const editInput = document.createElement('input');
    editInput.setAttribute("type", "text");
    editInput.setAttribute("value", taskName);
    parentDiv.appendChild(editInput);
    const errorDiv = document.createElement('div');
    errorDiv.setAttribute("class", "error");
    parentDiv.appendChild(errorDiv);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    //saveBtn.classList.add('edit');
    saveBtn.addEventListener('click', (e)=> {
       editedText = editInput.value;
       if(editedText === ''){
        e.preventDefault();
        setError(editInput,"Task is required");
       }
       else if(taskName !== editedText){
        setSuccess(editInput);
        firstElementBefore.innerText = editedText;
        taskItem.replaceChild(firstElementBefore, parentDiv);
       }
       else
       {
        setSuccess(editInput);
        taskItem.replaceChild(firstElementBefore, parentDiv);
       }
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('cancelbtn');
    cancelBtn.addEventListener('click', function() {
        taskItem.replaceChild(firstElementBefore, parentDiv);
    });
    parentDiv.appendChild(saveBtn);
    parentDiv.appendChild(cancelBtn);
    taskItem.replaceChild(parentDiv, firstElementBefore);
    
}

function setError(element,message){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function setSuccess(element){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = '';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}
