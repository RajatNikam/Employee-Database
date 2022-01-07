import { createReducer, on } from "@ngrx/store";
import { addEmployeeSuccess, deleteEmployeeSuccess, getEmployeeSuccess, updateEmployeeSuccess } from "../actions/action";
import { employee } from "../employee";

export interface EmployeeState {
    employee: ReadonlyArray<employee>;
}

const initialState: ReadonlyArray<employee> = [];

export const reducer = createReducer(
    initialState,
    on(getEmployeeSuccess, (state, { employee }) => [...employee]),
    on(addEmployeeSuccess, (state, { employee }) => [...state, employee]),
    on(deleteEmployeeSuccess, (state, { employeeId }) =>
        state.filter((employee) => employee.id !== employeeId)
    ),
    on(updateEmployeeSuccess, (state, { employee }) => {
        const employees = state.map((payload) => {
          if (payload.id === employee.id) {
            return employee;
          }
          return payload;
        });
        return employees;
      })
);
