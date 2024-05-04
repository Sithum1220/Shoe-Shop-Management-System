$('#btn').click(function () {
    var imageUrl = "http://localhost:8080/api/v1/upload/E00-0016"; // Change "1" to the actual ID of the image

    // Make AJAX request to fetch image data
    $.ajax({
        url: imageUrl,
        type: "GET",
        dataType: "json",
        success: function(response) {
            // Set the image source to the retrieved Base64 string
            // var decodedString = atob(response.proPic);
            $('#image-preview').attr('src', 'data:image/jpeg;base64,' + response.proPic);
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch image:', error);
        }
    });
})