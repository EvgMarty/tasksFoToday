//Находим елементы на странице 
//форма
const form = document.querySelector('#form');
//инпут
const taskInput = document.querySelector('#taskInput');
// список
const tasksList = document.querySelector('#tasksList');
// Первая лишка с списком дел LI
const emptyList = document.querySelector('#emptyList');


//Создадим пустой масив Tasks
let tasks = [];

//Проверяем локалку если там что то есть передаем их в масив 
if(localStorage.getItem('tasks')){
   tasks = JSON.parse(localStorage.getItem('tasks'));
}

//Проверяем масив на наличие обьектов и рендерим их на странице
tasks.forEach((task)=>{
   renderTask(task);
});

//Проверка масива на наличие обьектов 
checkEmptyList()

// Вешаем прослушку события на форму 
form.addEventListener('submit', addTask);
taskInput

//Удалить задачу 
tasksList.addEventListener('click', deleteTask);

//Отмечаем задачу завершонной/выполненой
tasksList.addEventListener('click', doneTask);



// функция прослушки события и добавить задачу
function addTask(event){
   event.preventDefault(0);
   //взяли с поля ввода текст
   const taskText = taskInput.value;

    // Создадим обьект newTasks в которрый помещаем ID задаче 
   // text текст взятый из поля ввода инпута
   // и статус выполнения false
   const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
   }

   //Довабляем в наш масив обьект с создаными задачами
   tasks.push(newTask);
   //рендерим на странице 
   renderTask(newTask);


   //косметические изменения
   taskInput.value = '';
   taskInput.focus();
   
   checkEmptyList()

   saveToLocalStorage()
}

// функция Удалить задачу 
function deleteTask(event){
   if(event.target.dataset.action !== 'delete') return;

   const perentNode = event.target.closest('.list-task-item');

   //Определим id
   const id = Number(perentNode.id);

   //Удаляем задачу из данных
   const index = tasks.findIndex((task)=>{
   if(task.id === id){
        return  true
      }
   })

   tasks.splice(index, 1);
   
   //Удаляем задачу из разметки
   perentNode.remove();

   checkEmptyList()

   saveToLocalStorage()
}

// функция отметить выполненую задачу 
function doneTask(event){
   if(event.target.dataset.action !== 'done') return;

   //находим спан 
   const perentNode = event.target.closest('.list-task-item');
   const taskTitle = perentNode.querySelector('.task-title');
   
   const id = Number(perentNode.id);

   const task = tasks.find((task)=>{
      if(task.id === id){
         console.log(task);
         return true; 
        
      }
   })



   //меняем значение done 
   task.done = !task.done;

   // Меняем класс выполненой задачи
   taskTitle.classList.toggle('task-title--done');

   saveToLocalStorage()

}

//функция проверяет если масив пуст добавит лишку список пуст если нет уберет
function checkEmptyList(){

   if(tasks.length === 0){
      const emptyListHYTML = `<li id="emptyList" class="list-group-item">
               <div class="empty-img"></div>
               <div class="empty-list" >The to-do list is empty</div>
            </li>`
      tasksList.insertAdjacentHTML('beforeend',emptyListHYTML);
   }else if(tasks.length > 0){
      const emptyListLi = document.querySelector('#emptyList');
      emptyListLi ? emptyListLi.remove(): null;
   }
}

// Функция сохранит в локалку масив
function saveToLocalStorage(){
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Рендер тасков
function renderTask(task){

   //Формируем класс 
   const ccClass = task.done ? 'task-title--done' :'task-title' ;

   //Создаем шаблонную строку
   const taskHTML = `<li id="${task.id}"class="list-task-item">
               <span class="task-title ${ccClass} ">${task.text}</span>
               <div class="task-item__buttons">
                  <button type="button" data-action="done" class="btn-action">
                     <img src="./img/icons8-done.svg" alt="Done" width="20" height="20">
                  </button>
                  <button type="button" data-action="delete" class="btn-action">
                     <img src="./img/icons8-close.svg" alt="Done" width="20" height="20">
                  </button>
               </div>
            </li>`;


   //добавляем в список шаблонную строку 
   tasksList.insertAdjacentHTML('beforeend', taskHTML);
}


