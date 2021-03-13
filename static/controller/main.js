$(document).ready(function(){

	//Clicking the button and show the adding list
	  $("#showAdd").click(function(){
	    $(".taskDetail").slideToggle();
	  });
	  $("#add").click(function(){
	  	generateTask();
	  })

});

//Start a task
function generateTask(){
	var task = $("#TaskName").val();
	var time = $("#Time").val();
	//Check the content
	if (task==""|time==""){
		alert("Please enter task and time");
	}
	//Append task
	else{
		var line = "<p class='taskInfo'>" + task + "-" + time +"mins</p>";
		$("#tasks").append(line);
		//Set current task name
		$("#curTask").html(task);
		//Take minutes
		var minutes = Number(time);
		var count = minutes*60;
		timeCounting(count);

	}
}

//Time count
function timeCounting(count){
	//Calculate hours/min/sec
	var minutes = Math.floor(count/60);
	var hours = 0;
	if (minutes>60){
		hours = Math.floor(minutes/60);
	}
	
	var seconds = count%60;
	//Formatt output
	hours = hours.toString().length == 1 ? '0' + hours : hours;
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length == 1 ? '0' + seconds : seconds;

    
    var line = hours + ":" + minutes + ":" + seconds;
	$("#timer").html(hours + ":" + minutes + ":" + seconds);
	count--;

	if (count >= 0){
		setTimeout(function(){timeCounting(count)},1000);
	}
}