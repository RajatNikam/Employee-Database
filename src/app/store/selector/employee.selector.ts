import { createSelector } from "@ngrx/store";
import { employee } from "../employee";
import { EmployeeState } from "../reducers/reducers";


export const employeeSelector = createSelector(
    (state: EmployeeState) => state.employee,
    (employee: ReadonlyArray<employee>) => employee
);