// Initialize Firebase
var config = {
    apiKey: "AIzaSyChU-JMvCeFw5s607Drcmazxxr0K7rn8PQ",
    authDomain: "kiriventure-kit.firebaseapp.com",
    databaseURL: "https://kiriventure-kit.firebaseio.com",
    projectId: "kiriventure-kit",
    storageBucket: "kiriventure-kit.appspot.com",
    messagingSenderId: "523269006984"
};

firebase.initializeApp(config);

var date = new Date();
var dd = date.getDate();
var mm = date.getMonth()+1;
var yyyy = date.getFullYear();

if(dd<10){
    dd='0'+dd;
}
if(mm<10){
    mm='0'+mm;
}
var today =  dd+'/'+mm+'/'+yyyy;

/**
 * @name getRef
 * @returns {*}
 */

var getRef = function () {
    return firebase.database().ref();
};

/**
 * @name getAllFLowsByDepartment
 * @param department
 * @returns {Promise}
 */

var getAllFlowsByDepartmet = function (department) {
    var flows = [];
    return new Promise(function (resolve, reject) {
        try {
            var flowRef = getRef().child("Flows").orderByChild('department').equalTo(department);
            flowRef.on('child_added', function(snapshot){
                flows.push({
                    name: snapshot.val().flowName,
                    id: snapshot.key
                });
                resolve(flows);
            });
        }catch (error){
            reject(error);
        }
    });
};

/**
 * @name getAllDepartment
 * @returns {Promise}
 */

var getAllDepartment = function () {
    var departments = [];
    return new Promise(function (resolve, reject) {
        try{
            var departmentRef = getRef().child('Departments');
            departmentRef.on('child_added', function (snapshot) {
                departments.push({
                    name: snapshot.val().name,
                    id: snapshot.key
                });
                resolve(departments);
            });
        }catch (error){
            reject(error);
        }
    });
};

/**
 * @name getAllTasksByDepartment
 * @param department
 * @returns {Promise}
 */

var getAllTasksByDepartment = function (department) {
    var tasks = [];
    return new Promise(function (resolve, reject) {
        try{
            var taskRef = getRef().child('Tasks').orderByChild('department').equalTo(department);
            taskRef.on('child_added', function (snapshot) {
                getRef().child('Flows/'+snapshot.val().flow)
                    .on('value', function (snapshot2) {
                        if(snapshot2.val()){
                            tasks.push({
                                id: snapshot.key,
                                name: snapshot.val().name,
                                flow: snapshot2.val().flowName
                            });
                        } 
                    });
                resolve(tasks);
            });
        }catch (error){
            console.log(error);
            reject(error);
        }
    })
};

/**
 * @name getFlowByID
 * @param id
 * @returns {Promise}
 */

var getFlowByID = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            var flowRef = getRef().child('Flows/'+id);
            flowRef.on('value', function (snapshot) {
                resolve({name: snapshot.val().flowName});
            });
        }catch (error){
            console.log(error);
            reject(error);
        }
    });
};

/**
 * @name getAllMemberByDepartment
 * @param department
 * @returns {Promise}
 */

var getAllMemberByDepartment = function (department) {
    var users = [];
    return new Promise(function (resolve, reject) {
        try{
            getRef().child('Users').orderByChild('department').equalTo(department)
                .on('child_added', function (snapshot) {
                    users.push(snapshot.val());
                    users[users.length-1]["id"] = snapshot.key;
                    resolve(users);
                });
        }catch (error){
            console.log(error);
            reject(error);
        }
    })
};

/**
 * @name getCheckedTasks
 * @param department
 * @param date
 * @returns {Promise}
 */

var getCheckedTasks = function (department, date) {
    var checked_tasks = [];
    var pre_key = [];
    return new Promise(function (resolve, reject) {
        try{
            getRef().child('Users').orderByChild('department').equalTo(department)
                .on('child_added', function (snapshot) {
                    getRef().child('Ratings').orderByChild('data').equalTo(date)
                        .on('child_added', function (snapshot2) {
                            if(snapshot.key === snapshot2.val().user){
                                if(pre_key.length === 0){
                                    checked_tasks.push(snapshot2.val());
                                    checked_tasks[checked_tasks.length-1]['review'] = "";
                                    for(var m=0; m<checked_tasks.length; m++){
                                        for(var n=0; n<checked_tasks[m].task.length; n++){
                                            getRef().child('Tasks/'+checked_tasks[m].task[n].id)
                                                .on('value', function (snapshot4) {
                                                    checked_tasks[m].task[n]['name'] = snapshot4.val().name;
                                                });
                                        }
                                    }
                                    pre_key.push(snapshot2.val().user);
                                    getRef().child('Users/'+snapshot2.val().user)
                                        .on('value', function (snapshot3) {
                                            checked_tasks[checked_tasks.length -1]['username'] = snapshot3.val().name;
                                        });
                                }else{
                                    if(pre_key.indexOf(snapshot2.val().user) >= 0 ) {
                                        checked_tasks.forEach(function(item, index) {
                                            if(item['user'] === snapshot2.val().user){
                                                if(snapshot2.val().task){
                                                    for(var j =0; j<snapshot2.val().task.length; j++){
                                                        checked_tasks[index]['task'].push(snapshot2.val().task[j]);
                                                        getRef().child('Tasks/'+snapshot2.val().task[j].id)
                                                            .on('value', function (snapshot3) {
                                                                checked_tasks[index]['task'][checked_tasks[index]['task'].length-1]['name'] = snapshot3.val().name;
                                                            });
                                                    }
                                                }
                                            }
                                        });
                                    }else{
                                        checked_tasks.push(snapshot2.val());
                                        checked_tasks[checked_tasks.length-1]['review'] = "";
                                        for(var m=0; m<checked_tasks.length; m++){
                                            for(var n=0; n<checked_tasks[m].task.length; n++){
                                                getRef().child('Tasks/'+checked_tasks[m].task[n].id)
                                                    .on('value', function (snapshot4) {
                                                        checked_tasks[m].task[n]['name'] = snapshot4.val().name;
                                                    });
                                            }
                                        }
                                        pre_key.push(snapshot2.val().user);
                                        getRef().child('Users/'+snapshot2.val().user)
                                            .on('value', function (snapshot3) {
                                                checked_tasks[checked_tasks.length -1]['username'] = snapshot3.val().name;
                                            });
                                    }
                                }
                            }
                            resolve(checked_tasks);
                        });
                });
        }catch (error){
            console.log(error);
            reject(error);
        }
    });
};

/**
 * @name addNewTask
 * @param department
 * @param flow
 * @param taskName
 * @returns {Promise}
 */

var addNewTask = function (department, flow, taskName) {
    return new Promise(function (resolve, reject) {
        try {
            getRef().child('Tasks')
                .push({
                    department: department,
                    flow: flow,
                    name: taskName
                }).then(function (value) {
                    resolve(value);
            });
        }catch (error){
            reject(error);
        }
    })
};

/**
 * @name updateTaskWithFlow
 * @param flow
 * @param taskID
 * @param taskName
 * @returns {Promise}
 */

var updateTaskWithFlow = function (flow, taskID, taskName) {
    return new Promise(function (resolve, reject) {
        try {
            getRef().child('Tasks/'+taskID)
                .update({
                    flow: flow,
                    name: taskName
                }).then(function (value) {
                    console.log(value);
                    resolve(value);
            });
        }catch(error) {
            reject(error);
        }
    });
};

/**
 * @name updateTask
 * @param taskID
 * @param taskName
 * @returns {Promise}
 */

var updateTask = function (taskID, taskName) {
    return new Promise(function (resolve, reject) {
        try{
            getRef().child('Tasks/'+taskID)
                .update({
                    name: taskName
                }).then(function (value) {
                resolve(value);
            });
        }catch (error){
            reject(error);
        }
    });
};

/**
 * @name deleteTask
 * @param taskID
 * @returns {Promise}
 */

var deleteTask = function (taskID) {
    return new Promise(function (resolve, reject) {
        try {
            getRef().child('Tasks/'+taskID)
                .on('value', function (snapshot) {
                    snapshot.ref.remove();
                    resolve(true);
                });
        }catch (error){
            reject(error);
        }
    });
};

/**
 * @name addNewFlow
 * @param department
 * @param flow
 * @returns {Promise}
 */

var addNewFlow = function (department, flow) {
    return new Promise(function (resolve, reject) {
        try {
            getRef().child('Flows')
                .push({
                    department: department,
                    flowName: flow
                }).then(function (value) {
                    resolve(value);
            });
        }catch (error){
            reject(error);
        }
    })
};

/**
 * @name deleteFlow
 * @param flowID
 * @returns {Promise}
 */

var deleteFlow = function (flowID) {
    return new Promise(function (resolve, reject) {
        try {
            getRef().child('Flows/'+flowID)
                .on('value', function (snapshot) {
                    snapshot.ref.remove();
                    resolve(true);
                });
        }catch (error){
            console.log(error);
            reject(error);
        }
    });
};

/**
 * @name updateFlow
 * @param flowId
 * @param flowName
 * @returns {Promise}
 */

var updateFlow = function (flowId, flowName) {
    return new Promise(function (resolve, reject) {
        try{
            getRef().child('Flows/'+flowId)
                .update({
                    flowName: flowName
                }).then(function (value) {
                    resolve(value);
            })
        }catch (error){
            console.log(error);
            reject(error);
        }
    })
};

/**
 * @name addNewUser
 * @param department
 * @param name
 * @param email
 * @param role
 * @returns {Promise}
 */

var addNewUser = function (department, name, email, role) {
    return new Promise(function (resolve, reject) {
        try {
            getRef().child('Users')
                .push({
                    department: department,
                    name: name,
                    email: email,
                    position: role
                }).then(function (value) {
                    resolve(value);
            })
        }catch (error){
            console.log(error);
            reject(error);
        }
    });
};

/**
 * @name deleteUser
 * @param userID
 * @returns {Promise}
 */

var deleteUser = function (userID) {
    return new Promise(function (resolve, reject) {
        try {
            getRef().child('Users/'+userID)
                .on('value', function (snapshot) {
                    snapshot.ref.remove();
                    resolve(true);
                });
        }catch (error){
            console.log(error);
            reject(error);
        }
    })
};

/**
 * @name updateUser
 * @param userId
 * @param username
 * @param userrole
 * @returns {Promise}
 */

var updateUser = function (userId, username, userrole) {
    return new Promise(function (resolve, reject) {
        try{
            getRef().child('Users/'+userId)
                .update({
                    name: username,
                    position: userrole
                }).then(function (value) {
                    resolve(value);
            });
        }catch (error){
            console.log(error);
            reject(error);
        }
    });
};

/**
 * @name submitManagerRating
 * @param ratingUser
 * @param rating
 * @param date
 * @returns {Promise}
 */

var submitManagerRating = function (ratingUser, rating, date) {
    return new Promise(function (resolve, reject) {
        try{
            getRef().child('MRatings')
                .push({
                    ratingUser: ratingUser,
                    rating: rating,
                    rateDate: date,
                    date: today
                }).then(function (value) {
                    resolve(value);
            });
        }catch (error){
            console.log(error);
            reject(error);
        }
    });
};