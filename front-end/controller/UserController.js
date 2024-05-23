function userController() {
    getAllUserData();
    userActiveStatusCheckBox();
    clickUserTblRow();
    searchUsers();
}

function getAllUsersAjaxReq(status,value) {
    console.log("status");
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/users/"+status+"/"+value,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblUser tbody').empty()
            for (const user of resp.data) {
                console.log(user)
                const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                             
                                <td>${user.employeeName}</td>
                                <td>${user.contactNo}</td>
                                <td>${user.email}</td>
                                <td>${user.role}</td>
                            </tr>`;
                $('#tblUser').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function getAllUserData() {

    if ( $('#userActiveCheckbox').prop('checked') ) {
        getAllUsersAjaxReq("active",true);
        $('#deleteUser').attr('disabled',false);
    }else {
        getAllUsersAjaxReq("active",false);
        $('#deleteUser').attr('disabled',true);
    }
}

function userActiveStatusCheckBox() {
    $('#userActiveCheckbox').change(function () {
        console.log('userActiveCheckbox');
        getAllUserData();
    })
}

function clickUserTblRow() {

    $('#tblUser').on('click', 'tr', function (event) {
        console.log("Nannnaaa");

        var userCheckbox = $(this).find('input[type="checkbox"]');
        var isCheckboxClick = $(event.target).is('input[type="checkbox"]');

        if (!isCheckboxClick) {
            userCheckbox.prop('checked', !userCheckbox.prop('checked'));

        }
        $('#tblUser input[type="checkbox"]').not(userCheckbox).prop('checked', false);

        getUserDataByClickTblRow(userCheckbox);
    });

    $('#tblUser').on('change', 'input[type="checkbox"]', function () {
        getUserDataByClickTblRow($(this).find('input[type="checkbox"]'));
        $('#tblUser input[type="checkbox"]').not($(this)).prop('checked', false);
    });
}

function getUserDataByClickTblRow(userCheckbox) {
    var row = userCheckbox.closest('tr');
    if (userCheckbox.is(':checked')) {
        var id = row.find('td:eq(2)').text();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/users/" + id,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                deleteUser(id);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    } else {
    }
}

function deleteUser(id) {
    $('#userDeleteBtn').click(function () {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/users/" + id,
            type: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                getAllUserData();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User has been Deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (resp) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: resp.responseJSON.message,
                    footer: '<a href="#"></a>'
                });
            }
        });
    })
}

function searchUsers() {
    $('#searchUsers').keyup(function (event) {
        var idOrName = $(this).val();

        if ($('#userActiveCheckbox').prop('checked')) {
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/users?idOrName=" + idOrName+"&activeStatus=" + true,
                type: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (response) {
                    $('#tblUser tbody').empty()
                    for (const user of response.data) {
                        const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                             
                                <td>${user.employeeName}</td>
                                <td>${user.contactNo}</td>
                                <td>${user.email}</td>
                                <td>${user.role}</td>
                            </tr>`;
                        $('#tblUser').append(row);
                    }
                },
                error: function (resp) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: resp.responseJSON.message,
                        footer: '<a href="#"></a>'
                    });
                }
            });
        }else {
            $.ajax({
                url: "http://localhost:8080/api/v1/users?idOrName=" + idOrName+"&activeStatus=" + false,
                type: "GET",
                dataType: "json",
                success: function (response) {
                    $('#tblUser tbody').empty()
                    for (const user of response.data) {
                        const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                             
                                <td>${user.employeeName}</td>
                                <td>${user.contactNo}</td>
                                <td>${user.email}</td>
                                <td>${user.role}</td>
                            </tr>`;
                        $('#tblUser').append(row);
                    }
                },
                error: function (resp) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: resp.responseJSON.message,
                        footer: '<a href="#"></a>'
                    });
                }
            });
        }

    })
}
