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
  
console.log("test")
window.addEventListener('load', ()=> {
    let lon;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
			// console.log(lon, lat)
            get_sun_infos(lon, lat)
        });
      } else { 
        h1.textContent = "cannot get the location, please have a check of your broswer!"
      }
});

function get_sun_infos(lon, lat) {
    // let apiKey = "7aaecaac981dcae96d62e8793d4cc835";
    // let api = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
	let api = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lon + "&date=today"
    fetch(
        api
    )
    .then(response => {
        if (!response.ok) {
            alert("Cannot Identify Location.");
            throw new Error("Cannot Identify Location.");
          }
        return response.json();
    })
    .then(data =>display_detail_infos(data));
};

function display_detail_infos(data) {
	console.log(data)
	const { sunrise } = data.results
	const { sunset } = data.results
	document.querySelector(".upper_info").innerHTML = "UTC: sunrise:" + sunrise + " sunset: " + sunset;
}