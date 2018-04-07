@extends('layouts.app')

@push('styles')
    <link rel="stylesheet" href="{{asset('vendor/jquery-confirm/jquery-confirm.min.css')}}">
@endpush

@section('sidenav')
    @include('includes.sidenav')
@endsection

@section('content')
    @if($department)
        <input type="hidden" name="depID" id="depID" value="{{$department}}" data-name="{{$name}}" />
    @endif
    <div class="page-content">
        <div class="container-fluid">
            @if($name)
                <h2 class="content-heading">{{$name}}</h2>
            @else
                <h2 class="content-heading">Department's Name</h2>
            @endif
            <div class="main-container tabs-alpha">
                <ul class="nav nav-tabs tabs-alpha__nav-tabs">
                    <li class="nav-item tabs-alpha__item">
                        <a class="nav-link tabs-alpha__link active" data-toggle="tab" href="#tabs-alpha-task">
                            All Tasks
                        </a>
                    </li>
                    <li class="nav-item tabs-alpha__item">
                        <a class="nav-link tabs-alpha__link" data-toggle="tab" href="#tabs-alpha-flow">
                            All Flows
                        </a>
                    </li>
                    <li class="nav-item tabs-alpha__item">
                        <a class="nav-link tabs-alpha__link" data-toggle="tab" href="#tabs-alpha-member">
                            All Member
                        </a>
                    </li>

                    <li class="nav-item tabs-alpha__item">
                        <a class="nav-link tabs-alpha__link" data-toggle="tab" href="#tabs-alpha-checkedTask">
                            Last Checked Tasks
                        </a>
                    </li>
                </ul>
                <div class="tab-content tabs-alpha__tab-content">
                    <div class="tab-pane active" id="tabs-alpha-task" role="tabpanel" aria-expanded="true">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="main-container table-container">
                                    <table class="table table__actions">
                                        <thead>
                                        <tr>
                                            <th>N%</th>
                                            <th>Name</th>
                                            <th>Flow</th>
                                            <th><a href="#" class="btn btn-success" data-toggle="modal" data-target="#modal-Task">Add New Task</a></th>
                                        </tr>
                                        </thead>
                                        <tbody id="core_tasks">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="tabs-alpha-flow" role="tabpanel" aria-expanded="false">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="main-container table-container">
                                    <table class="table table__actions">
                                        <thead>
                                        <tr>
                                            <th>N%</th>
                                            <th>Name</th>
                                            <th><a href="#" class="btn btn-success" data-toggle="modal" data-target="#modal-Flow">Add New Flow</a></th>
                                        </tr>
                                        </thead>
                                        <tbody id="core_flows">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="tabs-alpha-member" role="tabpanel">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="main-container table-container">
                                    <table class="table table__actions">
                                        <thead>
                                        <tr>
                                            <th>N%</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th><a href="#" class="btn btn-success" data-toggle="modal" data-target="#modal-Member">Add New Member</a></th>
                                        </tr>
                                        </thead>
                                        <tbody id="core_users">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="tabs-alpha-checkedTask" role="tabpanel">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="main-container table-container">
                                    <table class="table table__actions">
                                        <thead>
                                            <tr>
                                                <th>N%</th>
                                                <th>Name</th>
                                                <th>Tasks</th>
                                                <th>Review</th>
                                                <th><input style="width: 190px;" name="retrieve_Date" class="form-control flatpickr" data-default-date="today" data-max-date="today" data-date-format="d/m/Y" placeholder="select a Date"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="core_checkedTask">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-Task" class="modal fade custom-modal-tabs">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header has-border">
                            <h5 class="modal-title">Add New Task</h5>
                            <button type="button" class="close custom-modal__close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="iconfont iconfont-modal-close"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="modal-settings-notifications">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="input-device">Task's name</label>
                                                <input type="text" class="form-control" id="taskName" placeholder="Task's name...">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="flowTask">Flow</label>
                                                <select class="form-control" name="flowTask" id="flowTask" data-placeholder="Placeholder">
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer--center">
                            <button type="button" data-dismiss="modal" class="btn btn-outline-info">Cancel</button>
                            <button class="btn btn-info" name="addNewTask" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-Flow" class="modal fade custom-modal-tabs">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header has-border">
                            <h5 class="modal-title">Add New Flow</h5>
                            <button type="button" class="close custom-modal__close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="iconfont iconfont-modal-close"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="modal-settings-notifications">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="flowName">Flow's name</label>
                                                <input type="text" name="flowName" class="form-control" id="flowName" placeholder="Task's name...">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer--center">
                            <button type="button" data-dismiss="modal" class="btn btn-outline-info">Cancel</button>
                            <button name="addNewFlow" class="btn btn-info" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-Member" class="modal fade custom-modal-tabs">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header has-border">
                            <h5 class="modal-title">Add New User</h5>
                            <button type="button" class="close custom-modal__close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="iconfont iconfont-modal-close"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="modal-settings-notifications">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="username">Username</label>
                                                <input type="text" name="username" class="form-control" id="username" placeholder="Username...">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="useremail">Email</label>
                                                <input type="text" name="useremail" class="form-control" id="useremail" placeholder="Email...">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="userrole">Role</label>
                                                <select name="userrole" id="userrole" data-placeholder="User role...">
                                                    <option value=""></option>
                                                    <option value="1">Admin</option>
                                                    <option value="2">Manager</option>
                                                    <option value="3">Normal User</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer--center">
                            <button type="button" data-dismiss="modal" class="btn btn-outline-info">Cancel</button>
                            <button class="btn btn-info" name="addNewUser" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="review_Tasks" class="modal fade custom-modal-tabs">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header has-border">
                            <h5 class="modal-title">Review Checked Tasks</h5>
                            <button type="button" class="close custom-modal__close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="iconfont iconfont-modal-close"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="main-container table-container">
                                <table class="table table__actions">
                                    <thead>
                                    <tr>
                                        <th>N%</th>
                                        <th>Name</th>
                                        <th>Rating</th>
                                    </tr>
                                    </thead>
                                    <tbody id="review_ckeck_tasks">

                                    </tbody>
                                </table>
                                <div class="form-group">
                                    <label for="rating">Rating</label>
                                    <select name="rating" id="rating" data-placeholder="Select Rating">
                                        <option value=""></option>
                                        <option value="1">Poor</option>
                                        <option value="2">Okay</option>
                                        <option value="3">Fine</option>
                                        <option value="4">Good</option>
                                        <option value="5">Great</option>
                                    </select>
                                </div>
                                <div class="modal-footer modal-footer--center">
                                    <button type="button" data-dismiss="modal" class="btn btn-outline-info">Cancel</button>
                                    <button name="btnReviewSubmit" class="btn btn-info" type="button">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-editTask" class="modal fade custom-modal-tabs">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header has-border">
                            <h5 class="modal-title">Edit Task</h5>
                            <button type="button" class="close custom-modal__close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="iconfont iconfont-modal-close"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="modal-settings-notifications">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="editTaskName">Task's name</label>
                                                <input type="text" name="editTaskName" class="form-control" id="editTaskName" placeholder="Task's name...">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="editFlowTask">Flow</label>
                                                <select class="form-control" name="editFlowTask" id="editFlowTask" data-placeholder="Placeholder">
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer--center">
                            <button type="button" data-dismiss="modal" class="btn btn-outline-info">Cancel</button>
                            <button class="btn btn-info" name="editTask" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-editFlow" class="modal fade custom-modal-tabs">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header has-border">
                            <h5 class="modal-title">Edit Flow</h5>
                            <button type="button" class="close custom-modal__close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="iconfont iconfont-modal-close"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="modal-settings-notifications">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="editFlowName">Flow's name</label>
                                                <input type="text" name="editFlowName" class="form-control" id="editFlowName" placeholder="Task's name...">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer--center">
                            <button type="button" data-dismiss="modal" class="btn btn-outline-info">Cancel</button>
                            <button name="editFlowBtn" class="btn btn-info" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-editMember" class="modal fade custom-modal-tabs">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header has-border">
                            <h5 class="modal-title">Edit User</h5>
                            <button type="button" class="close custom-modal__close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="iconfont iconfont-modal-close"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="modal-settings-notifications">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="editUsername">Username</label>
                                                <input type="text" name="editUsername" class="form-control" id="editUsername" placeholder="Username...">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="editUserrole">Role</label>
                                                <select name="editUserrole" id="editUserrole" data-placeholder="User role...">
                                                    <option value=""></option>
                                                    <option value="1">Admin</option>
                                                    <option value="2">Manager</option>
                                                    <option value="3">Normal User</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer--center">
                            <button type="button" data-dismiss="modal" class="btn btn-outline-info">Cancel</button>
                            <button class="btn btn-info" name="saveEditUser" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@push('scripts')
    <script src="{{asset('vendor/jquery-confirm/jquery-confirm.min.js')}}"></script>
    <script src="{{asset('vendor/nouislider/nouislider.min.js')}}"></script>
    <script src="{{asset('vendor/tagify/tagify.min.js')}}"></script>
    <script src="{{asset('js/preview/modal.min.js')}}"></script>
    <script src="{{asset('js/preview/datepicker.min.js')}}"></script>
    <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>
    <script src="{{asset('js/firebase.js')}}"></script>
    <script src="{{asset('js/customFirebase.js')}}"></script>
@endpush