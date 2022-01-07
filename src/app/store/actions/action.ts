import { Action, createAction, props } from "@ngrx/store";
import { employee } from "../employee";
import { Update } from "@ngrx/entity";

export const getEmployee = createAction('[Employee] Get Employee')

export const getEmployeeSuccess = createAction('[Employee] Get Employee Success',
    (employee: ReadonlyArray<employee>) => ({ employee }))
// props<{ employee: ReadonlyArray<employee> }>());

export const addEmployee = createAction('[Employee] Add Employee',
    props<{ employee: employee }>())
// (employee: employee) => ({ employee }))

export const addEmployeeSuccess = createAction('[Employee] Add Employee Success',
    props<{ employee: employee }>())
// (employee: employee) => ({ employee }))

export const deleteEmployee = createAction('[Employee] Delete Employee',
    (employeeId: number) => ({ employeeId }))

export const deleteEmployeeSuccess = createAction('[Employee] Delete Employee Success',
    (employeeId: number) => ({ employeeId }))

export const updateEmployee = createAction('[Employee] Update Employee',
    (employee: any) => ({ employee }))

export const updateEmployeeSuccess = createAction('[Employee] Update Employee Success',
    (employee: any) => ({ employee }))