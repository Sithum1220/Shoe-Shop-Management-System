
setProfileImageAndName();
updateGreeting();

$(document).ready(function(){
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true
    });
});

function setProfileImageAndName() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/employees/byEmail/" + localStorage.getItem("email"),
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (response) {
            $('#name').text(response.data.employeeName)
            const uploadDiv = $('.profile-photo');
            uploadDiv.empty();
            const img = $('<img>').attr('src', 'data:image/jpeg;base64,' + response.data.proPic)
            uploadDiv.append(img);
        },
        error: function (xhr, status, error) {
            console.error('Failed to fetch image:', error);
        }
    });
}

function updateGreeting() {
    // Get the current date and time
    const now = new Date();
    const hours = now.getHours();

    // Define the greeting based on the time of day
    let greeting;
    if (hours < 12) {
        greeting = "Good Morning!";
    } else if (hours < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
    $('#greeting').text(greeting);
}

setInterval(updateGreeting, 3600000);