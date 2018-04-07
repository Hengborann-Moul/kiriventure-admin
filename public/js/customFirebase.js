/**
 * It is all about Firebase Function
 * @author Tadashi Hamada
 */

var getFlowName = function (id) {
    getFlowByID(id).then(function (value) {
        console.log(value.name);
        return value.name;
    }).catch(function (reason) {
        console.log(reason);
    })
};

$(document).ready(function () {

    var status = "";
    var departmentID = $('#depID').val();
    var editTaskId = "";
    var editFlowID = "";
    var editUserID = "";
    var task_review = [];
    var date_review = '';
    var user_review = '';
    var current_review_index = '';
    var today = $('input[name=retrieve_Date]').val();

    getAllFlowsByDepartmet(departmentID).then(function (value) {
        for(var i = 0; i<value.length; i++){
            $('#core_flows')
                .append("<tr><td>"+parseInt(1+i)+"</td><td>"+value[i].name+"</td><td class=\"table__cell-actions\"><div class=\"table__cell-actions-wrap\">\n" +
                    "                                                    <button name='editFlow' data-flow='"+value[i].name+"' data-flowID='"+value[i].id+"' class=\"btn btn-info table__cell-actions-item\">Edit</button>\n" +
                    "                                                    <button name='deleteFlow' data-flowID='"+value[i].id+"' class=\"btn btn-danger table__cell-actions-item\">Delete</button>\n" +
                    "                                                </div>\n" +
                    "                                            </td></tr>");
            $('#flowTask')
                .append("<option value='"+ value[i].id + "'>"+value[i].name+ "</option>");
            $('#editFlowTask')
                .append("<option value='"+ value[i].id + "'>"+value[i].name+ "</option>");
        }
    }).catch(function (reason) {
        console.log(reason);
    });

    getAllTasksByDepartment(departmentID).then(function (value) {
        for(var i = 0; i<value.length; i++){
            $('#core_tasks')
                .append("<tr><td>"+parseInt(1+i)+"</td><td>"+value[i].name+"</td><td>"+value[i].flow+"</td><td class=\"table__cell-actions\">\n" +
                    "                                                <div class=\"table__cell-actions-wrap\">\n" +
                    "                                                    <button name=\"editBtn\" data-taskID='"+value[i].id+"' data-task='"+value[i].name+"' class=\"btn btn-info table__cell-actions-item\">Edit</button>\n" +
                    "                                                    <button name=\"deleteTask\" data-taskID='"+value[i].id+"' class=\"btn btn-danger table__cell-actions-item\">Delete</button>\n" +
                    "                                                </div>\n" +
                    "                                            </td></tr>");
        }
    }).catch(function (reason) {
        console.log(reason);
    });

    getAllMemberByDepartment(departmentID)
        .then(function (value) {
            for(var i = 0; i<value.length; i++){
                switch (parseInt(value[i].position)){
                    case 1:
                        status = 'Admin';
                        break;
                    case 2:
                        status = 'Manager';
                        break;
                    default:
                        status = 'Member';
                        break;
                }
                $('#core_users')
                    .append("<tr><td>"+parseInt(1+i)+"</td><td>"+value[i].name+"</td><td>"+value[i].email+ "</td><td>"+ status +"</td><td class=\"table__cell-actions\">\n" +
                        "                                                <div class=\"table__cell-actions-wrap\">\n" +
                        "                                                    <button name=\"editUser\" data-userrole='"+value[i].position+"' data-username='"+value[i].name+"' data-userID='"+value[i].id+"' class=\"btn btn-info table__cell-actions-item\">Edit</button>\n" +
                        "                                                    <button name=\"deleteUser\" data-userID='"+value[i].id+"' class=\"btn btn-danger table__cell-actions-item\">Delete</button>\n" +
                        "                                                </div>\n" +
                        "                                            </td></tr>");
            }
        }).catch(function (reason) {
            console.log(reason);
        });

    var core_checked_task =(function auto_check_task() {
        $('#core_checkedTask').each(function () {
            $(this).find('tr').remove();
        });
        getCheckedTasks(departmentID, today)
            .then(function (value) {
                for(var i=0; i<value.length; i++){
                    task_review.push(value[i].task);
                    $('#core_checkedTask')
                        .append("<tr><td>"+parseInt(1+i)+"</td><td>"+value[i].username+"</td><td>"+value[i].task.length+"</td><td user-review=\""+ value[i].user +"\">" + (value[i].review?value[i].review+'/5':'not yet review') + "</td><td class=\"table__cell-actions\">\n" +
                            "                                                <div class=\"table__cell-actions-wrap\">\n" +
                            "                                                    <button name=\"btnReviewTask\" data-Date='"+value[i].data+"' data-ratingUser='"+value[i].user+"' data-index='"+i+"' class=\"btn btn-info table__cell-actions-item\">Review</button>\n" +
                            "                                                </div>\n" +
                            "                                            </td></tr>");
                }
            }).catch(function (reason) {
            console.log(reason);
        });
        return auto_check_task;
    }());

    /*getAllDepartment()
        .then(function (value) {
            for(var i=0; i<value.length; i++){
                $('select[name=department]')
                    .append("<option value='"+value[i].id+"'>"+value[i].name+"</option>");
            }
        }).catch(function (reason) {
            console.log(reason);
    });*/

    /**
     * change Flow Value
     */
    $('#flowTask').on('change', function (e) {
        e.preventDefault();
        console.log($(this).val());
    });

    /**
     * taskName Change
     */
    $('#taskName').on('change', function (e) {
        e.preventDefault();
        console.log($(this).val());
    });

    /**
     * add New Task
     */
    $('button[name=addNewTask]').on('click', function (e) {
        e.preventDefault();
        var taskName = $('#taskName').val();
        var flowTask = $('#flowTask').val();
        if((taskName.trim() === '') || (flowTask.trim()==='')){
            $.confirm({
                title: 'All Fields are Required!',
                content: 'Pleas input all the fields.',
                type: 'danger',
                buttons: {
                    confirm: {
                        text: 'OK',
                        btnClass: 'btn-danger'
                    }
                }
            });
        }else{
            // gonna add new Task
            addNewTask(departmentID, flowTask, taskName)
                .then(function (value) {
                    $.confirm({
                        title: 'Data Added!',
                        content: 'Data successfully added!',
                        type: 'success',
                        buttons: {
                            confirm: {
                                text: 'OK',
                                btnClass: 'btn-success',
                                action: function () {
                                    $('#modal-Task').modal('toggle');
                                    location.reload();
                                }
                            }
                        }
                    });
                }).catch(function (reason) {
                    console.log(reason);
                    $.confirm({
                        title: 'Database Error!',
                        content: 'Data did not add please try again!',
                        type: 'danger',
                        buttons: {
                            confirm: {
                                text: 'OK',
                                btnClass: 'btn-danger'
                            }
                        }
                    });
            });
        }
    });

    /**
     * Enable Edit Task Modal
     */

    $(document).on('click', 'button[name=editBtn]', function (e) {
        e.preventDefault();
        $('#editTaskName').val($(this).attr('data-task'));
        editTaskId = $(this).attr('data-taskID');
        $('#modal-editTask').modal('show');
    });

    /**
     * Handle Update Task
     */
    $('button[name=editTask]').on('click', function (e) {
        e.preventDefault();
        var flow = $('#editFlowTask').val();
        var taskName = $('#editTaskName').val();
        if(flow.trim() === ''){
            updateTask(editTaskId, taskName)
                .then(function (value) {
                    console.log(value);
                    $.confirm({
                        title: 'Data updated!',
                        content: 'Data successfully updated!',
                        type: 'success',
                        buttons: {
                            confirm: {
                                text: 'OK',
                                btnClass: 'btn-success',
                                action: function () {
                                    $('#modal-editTask').modal('toggle');
                                }
                            }
                        }
                    });
                }).catch(function (reason) {
                    console.log(reason);
                    $.confirm({
                        title: 'Database Error!',
                        content: 'Data did not update, please try again!',
                        type: 'danger',
                        buttons: {
                            confirm: {
                                text: 'OK',
                                btnClass: 'btn-danger'
                            }
                        }
                    });
            })
        }else {
            updateTaskWithFlow(flow, editTaskId, taskName)
                .then(function (value) {
                    console.log(value);
                    $.confirm({
                        title: 'Data updated!',
                        content: 'Data successfully updated!',
                        type: 'success',
                        buttons: {
                            confirm: {
                                text: 'OK',
                                btnClass: 'btn-success',
                                action: function () {
                                    $('#modal-editTask').modal('toggle');
                                }
                            }
                        }
                    });
                }).catch(function (reason) {
                    console.log(reason);
                    $.confirm({
                        title: 'Database Error!',
                        content: 'Data did not update, please try again!',
                        type: 'danger',
                        buttons: {
                            confirm: {
                                text: 'OK',
                                btnClass: 'btn-danger'
                            }
                        }
                    });
            })
        }
    });

    /**
     * Handle Delete Task
     */
    $(document).on('click', 'button[name=deleteTask]', function (e) {
        e.preventDefault();
        var taskID = $(this).attr('data-taskID');
        var trRef = $(this).parent().parent().parent();
        deleteTask(taskID)
            .then(function (value) {
                $.confirm({
                    title: 'Data Deleted!',
                    content: 'Data successfully deleted!',
                    type: 'success',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            btnClass: 'btn-success',
                            action: function () {
                                trRef.remove();
                            }
                        }
                    }
                });
            }).catch(function (reason) {
            console.log(reason);
            $.confirm({
                title: 'Database Error!',
                content: 'Data did not delete, please try again!',
                type: 'danger',
                buttons: {
                    confirm: {
                        text: 'OK',
                        btnClass: 'btn-danger'
                    }
                }
            });
        })
    });

    /**
     * Handle Add New Flow
     */
    $('button[name=addNewFlow]').on('click', function (e) {
        e.preventDefault();
        var flowName = $('#flowName').val();
        if(flowName.trim() === ''){
            $.confirm({
                title: 'All Fields is Required!',
                content: 'Pleas input all the fields.',
                type: 'danger',
                buttons: {
                    confirm: {
                        text: 'OK',
                        btnClass: 'btn-danger'
                    }
                }
            });
        }else {
            addNewFlow(departmentID, flowName)
                .then(function (value) {
                    $.confirm({
                        title: 'Flow Added!',
                        content: 'Flow successfully Added!',
                        type: 'success',
                        buttons: {
                            confirm: {
                                text: 'OK',
                                btnClass: 'btn-success',
                                action: function () {
                                    $('#modal-Flow').modal('toggle');
                                    location.reload();
                                }
                            }
                        }
                    });
                }).catch(function (reason) {
                console.log(reason);
                $.confirm({
                    title: 'Database Error!',
                    content: 'Flow did not add, please try again!',
                    type: 'danger',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            btnClass: 'btn-danger'
                        }
                    }
                });
            });
        }
    });

    /**
     * Handle Delete Flows
     */
    $(document).on('click', 'button[name=deleteFlow]', function (e) {
        e.preventDefault();
        var flowID = $(this).attr('data-flowID');
        var trRef = $(this).parent().parent().parent();
        deleteFlow(flowID)
            .then(function (value) {
                $.confirm({
                    title: 'Data Deleted!',
                    content: 'Data successfully deleted!',
                    type: 'success',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            btnClass: 'btn-success',
                            action: function () {
                                trRef.remove();
                            }
                        }
                    }
                });
            }).catch(function (reason) {
                console.log(reason);
                $.confirm({
                    title: 'Database Error!',
                    content: 'Data did not delete, please try again!',
                    type: 'danger',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            btnClass: 'btn-danger'
                        }
                    }
                });
        })
    });

    /**
     * Handle Update Flow
     */
    $(document).on('click', 'button[name=editFlow]', function (e) {
        e.preventDefault();
        editFlowID = $(this).attr('data-flowID');
        $('#editFlowName').val($(this).attr('data-flow'));
        $('#modal-editFlow').modal('show');
    });

    $('button[name=editFlowBtn]').on('click', function (e) {
        e.preventDefault();
        var flowName = $('#editFlowName').val();
        updateFlow(editFlowID, flowName)
            .then(function (value) {
                $.confirm({
                    title: 'Data updated!',
                    content: 'Data successfully updated!',
                    type: 'success',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            btnClass: 'btn-success',
                            action: function () {
                                $('#modal-editFlow').modal('toggle');
                                location.reload();
                            }
                        }
                    }
                });
            }).catch(function (reason) {
            console.log(reason);
            $.confirm({
                title: 'Database Error!',
                content: 'Data did not update, please try again!',
                type: 'danger',
                buttons: {
                    confirm: {
                        text: 'OK',
                        btnClass: 'btn-danger'
                    }
                }
            });
        });
    });

    /**
     * Handle Add New User
     */
    $('button[name=addNewUser]').on('click', function (e) {
        e.preventDefault();
        var username = $('#username').val();
        var useremail = $('#useremail').val();
        var userrole = $('#userrole').val();

        if((username.trim() === '') || (useremail.trim() === '') || (userrole.trim() === '')){
            $.confirm({
                title: 'All Fields is Required!',
                content: 'Pleas input all the fields.',
                type: 'danger',
                buttons: {
                    confirm: {
                        text: 'OK',
                        btnClass: 'btn-danger'
                    }
                }
            });
        }else {
            addNewUser(departmentID, username, useremail, userrole)
                .then(function (value) {
                    $.confirm({
                        title: 'User Added!',
                        content: 'User successfully Added!',
                        type: 'success',
                        buttons: {
                            confirm: {
                                text: 'OK',
                                btnClass: 'btn-success',
                                action: function () {
                                    location.reload();
                                }
                            }
                        }
                    });
                }).catch(function (reason) {
                    console.log(reason);
                $.confirm({
                    title: 'Database Error!',
                    content: 'Flow did not add, please try again!',
                    type: 'danger',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            btnClass: 'btn-danger'
                        }
                    }
                });
            })
        }

    });

    /**
     * Handle Delete User
     */
    $(document).on('click', 'button[name=deleteUser]', function (e) {
        e.preventDefault();
        var userID = $(this).attr('data-userID');
        var trRef = $(this).parent().parent().parent();

        deleteUser(userID)
            .then(function (value) {
                $.confirm({
                    title: 'Data Deleted!',
                    content: 'Data successfully deleted!',
                    type: 'success',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            btnClass: 'btn-success',
                            action: function () {
                                trRef.remove();
                            }
                        }
                    }
                });
            }).catch(function (reason) {
                console.log(reason);
            $.confirm({
                title: 'Database Error!',
                content: 'Data did not delete, please try again!',
                type: 'danger',
                buttons: {
                    confirm: {
                        text:   'OK',
                        btnClass: 'btn-danger'
                    }
                }
            });
        });
    });

    /**
     * Handle Update User Info
     */
    $(document).on('click', 'button[name=editUser]', function (e) {
        e.preventDefault();
        editUserID = $(this).attr('data-userID');
        $('#editUsername').val($(this).attr('data-username'));
        $('#editUserrole').val($(this).attr('data-userrole'));
        $('#modal-editMember').modal('show');
    });

    $('button[name=saveEditUser]').on('click', function (e) {
        e.preventDefault();
        var username = $('#editUsername').val();
        var userrole = $('#editUserrole').val();
        if((username.trim() === '') || (userrole.trim() === '')){
            $.confirm({
                title: 'All Fields is Required!',
                content: 'Pleas input all the fields.',
                type: 'danger',
                buttons: {
                    confirm: {
                        text: 'OK',
                        btnClass: 'btn-danger'
                    }
                }
            });
        }else {
            updateUser(editUserID, username, userrole)
                .then(function (value) {
                    $.confirm({
                        title: 'Data updated!',
                        content: 'Data successfully updated!',
                        type: 'success',
                        buttons: {
                            confirm: {
                                text: 'OK',
                                btnClass: 'btn-success',
                                action: function () {
                                    $('#modal-editFlow').modal('toggle');
                                    location.reload();
                                }
                            }
                        }
                    });
                }).catch(function (reason) {
                    console.log(reason);
                $.confirm({
                    title: 'Database Error!',
                    content: 'Data did not update, please try again!',
                    type: 'danger',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            btnClass: 'btn-danger'
                        }
                    }
                });
            });
        }
    });

    /**
     * Handle Review Task
     */
    $(document).on('click', 'button[name=btnReviewTask]', function (e) {
        e.preventDefault();
        current_review_index = $(this).attr('data-index');
        var review_checked_task = task_review[current_review_index];
        console.log('this is current index: ', current_review_index);
        user_review = $(this).attr('data-ratingUser');
        date_review = $(this).attr('data-Date');
        $('#review_ckeck_tasks').each(function () {
            $(this).find('tr').remove()
        });

        for(var i=0; i<review_checked_task.length; i++){
            $('#review_ckeck_tasks')
                .append("<tr><td>"+parseInt(1+i)+"</td><td>"+review_checked_task[i].name+"</td><td>"+review_checked_task[i].rating+"/5</td></tr>");
        }

        $('#review_Tasks').modal('show');
    });

    $('button[name=btnReviewSubmit]').on('click', function(e) {
        e.preventDefault();
        var rating = $('#rating').val();
        submitManagerRating(user_review, rating, date_review)
            .then(function (value) {
                $.confirm({
                    title: 'User Added!',
                    content: 'User successfully Added!',
                    type: 'success',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            btnClass: 'btn-success',
                            action: function () {
                                $('#review_Tasks').modal('toggle');
                                $('td[user-review='+ user_review +']').text(rating + '/5');
                            }
                        }
                    }
                });
            }).catch(function (reason) {
            $.confirm({
                title: 'Database Error!',
                content: 'Flow did not add, please try again!',
                type: 'danger',
                buttons: {
                    confirm: {
                        text: 'OK',
                        btnClass: 'btn-danger'
                    }
                }
            });
        })
    });

    $('input[name=retrieve_Date]').on('change', function (e) {
        e.preventDefault();
        today = $(this).val();
        task_review = [];
        core_checked_task();
    });

});