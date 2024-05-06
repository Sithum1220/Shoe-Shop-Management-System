function userController() {
    console.log("hiiiiiii");
    getAllUserData();
    userActiveStatusCheckBox();
}
function getAllUsersAjaxReq(status,value) {
    console.log("status");
    $.ajax({
        url: "http://localhost:8080/api/v1/users/"+status+"/"+value,
        method: "GET",
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
