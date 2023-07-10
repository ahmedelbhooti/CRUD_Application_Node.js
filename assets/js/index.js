


$("#add_user").submit(function (event) {
    alert("User Inserted successfully");
});


//update user button
$("#update_user").submit(function (event) {
    event.preventDefault();
    var unIndexed_array = $(this).serializeArray();
    var data = {};

    $.map(unIndexed_array, function (n, i) {
        data[n['name']] = n['value']
    })
    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data,
    }

    $.ajax(request).done(function (response) {
        alert("Data updated successfully");
        window.location.href = "/";
    })
});


//Delete a user from the database
if (window.location.pathname == "/") {
    $onDelete = $(".table tbody td a.delete")
    $onDelete.click(function () {
        var id = $(this).attr("data-id");

        console.log(id);
        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE",
        }
        if (confirm("Are you sure you want to delete this user?")) {
            $.ajax(request).done(function (response) {
                alert("User deleted successfully");
                location.reload();
            })
        }
    })
}