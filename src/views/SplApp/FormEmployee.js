import React from "react";
import InForm from "./InForm";
import InforEmployee from "./InforEmployee";
import { withRouter } from "react-router";
import { connect } from 'react-redux';

class FormEmployee extends React.Component {
    state = {
        Employee: [],
        Edit: {}
    }

    AddEmployee = (employeeInfo) => {

        this.props.addInformation(employeeInfo)
        console.log('>>> check employee from add function: ', employeeInfo)

        // this.setState({
        //     Employee: [...this.state.Employee, item]
        // })
    }

    Logout = () => {
        this.props.logOut()
        this.props.history.push('/')
    }

    handleOnClickReturnLogin = () => {
        this.props.history.push('/')
    }

    DeleteEmployee = (employeeInfo) => {
        console.log('>>> check employee from delete function: ', employeeInfo)
        this.props.deleteInformation(employeeInfo)

    }

    EditEmployee = (item) => {
        // let { Employee, Edit } = this.state;
        // let isEmptyObj = Object.keys(Edit).length === 0;
        // if (!isEmptyObj && item.key === Edit.key){
        //     // let EmployeeCopy = [...Employee];
        //     // let objIndex = listTodosCopy.findIndex((item => item.id === todo.id));
        //     // return;
        // }
        this.props.editInformation(item)
    }

    render() {
        //console.log('>>> Check props: ', this.props.match.params.name)
        let userName = this.props.userName
        let employee = this.props.employee
        let edit = this.props.edit
        console.log('>>> check edit from form: ', this.props)
        let isEmpty = Object.keys(employee).length === 0
        // console.log('>>> check employee: ', employee)
        if (userName && !isEmpty) {
            employee = employee.filter(item => item.owner === userName)
        }

        return (
            <>
                {userName && this.props.match.params.name === userName ?
                    <>
                        <div>Hello {userName}</div>
                        <InForm AddEmployee={this.AddEmployee} Logout={this.Logout} UserName={userName} />
                        <InforEmployee Employee={employee} Edit={edit} DeleteEmployee={this.DeleteEmployee} EditEmployee={this.EditEmployee} />
                    </>
                    :
                    <>
                        <div>You have to Login first</div>
                        <button onClick={() => this.handleOnClickReturnLogin()}>Login</button>
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.recentAccount,
        employee: state.employee,
        edit: state.edit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch({ type: 'LOG_OUT' }),
        addInformation: (employeeInfo) => dispatch({ type: 'ADD_EMPLOYEE', payload: employeeInfo }),
        deleteInformation: (employeeInfo) => dispatch({ type: 'DELETE_EMPLOYEE', payload: employeeInfo }),
        editInformation: (employee) => dispatch({ type: 'EDIT_EMPLOYEE', payload: employee }),
        loginGoogle: (googleUser) => dispatch({ type: 'LOGIN_GOOGLE', payload: googleUser })
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormEmployee));