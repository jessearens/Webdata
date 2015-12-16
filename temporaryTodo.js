var todos = [];
var sortedAscendingToDate = false;
var sortedAscendingToPriority = false;
function Todo( title, description, dueDate, priority, done){
	this.title = title;
	this.description = description;
	this.dueDate = dueDate;
	if(parseInt(priority) >= 5){
		this.priority = "5";
	}
	else if(parseInt(priority) < 0){
		this.priority = "0";
	}
	else{
		this.priority = priority;
	}
	this.toString = function(){ return "<d>" + this.title + "</d>, <d>" + this.description + "</d>, <d id= 'isdue" + this.isDue() + "'>" + this.dueDate.getDate() + "/" + (this.dueDate.getMonth() + 1) + "/" + this.dueDate.getFullYear() + "</d>, <d id ='priority" + this.priority + "'>" + this.priority + "</d>";}
	this.getTitle = function(){ return this.title;}
	this.getDescription = function(){ return this.description;}
	this.getDueDate = function(){ return this.dueDate;}
	this.getPriority = function(){ return this.priority;}
	this.setTitle = function(newTitle){ this.title = newTitle;}
	this.setDescription = function(newDescription){ this.description = newDescription;}
	this.setDueDate = function(newDueDate){ this.dueDate = newDueDate;}
	this.setPriority = function(newPriority){ 
		if(parseInt(newPriority) >= 5){
			this.priority = "5";
		}
		else{
			this.priority = newPriority;
		}
	}
	this.isDue = function(){ if(this.dueDate < Date.now()){ return true;} else{return false;} }
	this.done = done;
}
function showTodos(){
var todoStringList = "";
	for(var i = 0; i < todos.length; i ++){
		todoStringList += "<li id=" + todos[i].done + ">" + todos[i].toString() + "<div align='right'> <button onclick='deleteTodo(" + i + ")'>delete</button>" + "<button onclick='showModifyWindow(" + i + ")'>modify</button>" + "<button onclick='markAsDone(" + i + ")'>done</button> </div>" + "</li>";
	}
	$("#todoList").html(todoStringList);
}
function addTodo(){
	if(document.getElementById("title").value != ""  && document.getElementById("description").value != "" && document.getElementById("dueDate").value != "" && document.getElementById("priority").value != ""){
		var d = document.getElementById("dueDate").value.split("-");
		var date = new Date(d[0], d[1] - 1, d[2]);
		todos.push(new Todo(document.getElementById("title").value, document.getElementById("description").value, date, document.getElementById("priority").value, false));
		showTodos();
		dontShowAddWindow();
	}
	else{
		window.alert("fill in all the input fields to add a new Todo")
	}
}
function sortToPriority() {
	if(sortedAscendingToPriority){
		todos.sort(function(a, b) {
			return parseInt(a.priority) - parseInt(b.priority);
		});
		sortedAscendingToPriority = false;
		sortedAscendingToDate = false;
	}
	else{
		todos.sort(function(a, b) {
			return parseInt(b.priority) - parseInt(a.priority);
		});
		sortedAscendingToPriority = true;
		sortedAscendingToDate = false;
	}
	showTodos();
}
function sortToDate() {
	if(sortedAscendingToDate){
		todos.sort(function(a ,b) {
		return b.dueDate - a.dueDate;
	});
		sortedAscendingToDate = false;
		sortedAscendingToPriority = false;
	}
	else{
		todos.sort(function(a, b) {
		return a.dueDate - b.dueDate;
	});
		sortedAscendingToDate = true;
		sortedAscendingToPriority = false;
	}
showTodos();
}
function showAddWindow() {
	var addWindowText = "Title: <input type='text' name='title' id='title' placeholder='title' required></input> Description: <input type='text' name='description' id='description' placeholder='description' required>Due Date: <input type='date' name='dueDate' id='dueDate' placeholder='dd-mm-yyyy' required>Priority: <input type='number' min='1' max='5' name='priority' id='priority' placeholder='1-5'  required><a class='myButton' onclick='addTodo()' type='submit'>add</a> <a class='myButton' onclick='dontShowAddWindow()'>cancel</a>";
	$("#addWindow").html(addWindowText);
}
function dontShowAddWindow() {
	$("#addWindow").html("");
}
function showModifyWindow(index){
	var toDoToModify = todos[index];
	var addWindowText = "Title: <input type='text' name='title' id='title' value='" +  toDoToModify.title +"'></input><br>Description: <input type='text' name='description' id='description' value='" +  toDoToModify.description + "'><br>Due Date: <input type='date' name='dueDate' id='dueDate' value='" +  toDoToModify.dueDate.getFullYear() + "-" + (toDoToModify.dueDate.getMonth() + 1) + "-" + toDoToModify.dueDate.getDate() +"' ><br>Priority: <input type='number' min='1' max='5' name='priority' id='priority' value='" + toDoToModify.priority +"'><br><br><a class='myButton' onclick='modifyTodo(" + index + ")'>modify</a>  <a type='submit' class='myButton' onclick='dontShowAddWindow()'>cancel</a>";
	$("#addWindow").html(addWindowText);
}
function deleteTodo(index){
	todos.splice(index, 1);
	showTodos();
} 
function modifyTodo(index){
	if(document.getElementById("title").value != ""  && document.getElementById("description").value != "" && document.getElementById("dueDate").value != "" && document.getElementById("priority").value != ""){
		var d = document.getElementById("dueDate").value.split("-");
		var date = new Date(d[0], d[1] -1, d[2]);
		todos[index] = new Todo(document.getElementById("title").value, document.getElementById("description").value, date, document.getElementById("priority").value, false);
		showTodos();
		dontShowAddWindow();
	}
	else{
		window.alert("fill in all the input fields to add a new Todo")
	}
}
function markAsDone(index){
	todos[index].done = !todos[index].done;
	showTodos();
}
$(document).ready(function() {
	todos.push(new Todo("taak1", "taak1", new Date("2015", "11", "25"), "1", false));
	todos.push(new Todo("taak2", "taak2", new Date("2015", "11", "20"), "5", false));
	todos.push(new Todo("taak3", "taak3", new Date("2015", "11", "15"), "3", false));
	todos.push(new Todo("taak4", "taak4", new Date("2015", "11", "5"), "2", false));
	todos.push(new Todo("taak5", "taak5", new Date("2015", "11", "10"), "4", false));
	showTodos();
	console.log("ready");
});