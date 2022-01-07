import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, EmptyError } from "rxjs";
import { catchError, concatMap, exhaustMap, map, mergeMap } from "rxjs/operators";

import { EmployeeDataService } from "src/app/services/employee-data.service";
import { addEmployee, addEmployeeSuccess, deleteEmployee, deleteEmployeeSuccess, getEmployee, getEmployeeSuccess, updateEmployee, updateEmployeeSuccess } from "../actions/action";

@Injectable()
export class EmployeeEffects {

    loadEmployees$ = createEffect(() =>
        this.action.pipe(
            ofType(getEmployee),
            exhaustMap(() =>
                this.service.getData().pipe(
                    map((employee: any) => getEmployeeSuccess(employee)),
                    catchError(() => EMPTY)
                ))
        )
    );

    addEmployees$ = createEffect(() =>
        this.action.pipe(
            ofType(addEmployee),
            exhaustMap((newEmployee) =>
                this.service.addData(newEmployee).pipe(
                    map((employee: any) => addEmployeeSuccess(employee)),
                    catchError(() => EMPTY)
                ))
        )
    );

    deleteEmployee$ = createEffect(() =>
        this.action.pipe(
            ofType(deleteEmployee),
            concatMap(({ employeeId }) =>
                this.service.deleteData(employeeId).pipe(
                    map(() => deleteEmployeeSuccess(employeeId)),
                    catchError(() => EMPTY)
                ))
        )
    );

    updateEmployees$ = createEffect(() =>
        this.action.pipe(
            ofType(updateEmployee),
            exhaustMap(({ employee }) =>
                this.service.editData(employee).pipe(
                    map((employee: any) => updateEmployeeSuccess(employee)),
                    catchError(() => EMPTY)
                ))
        )
    );

    constructor(private action: Actions, private service: EmployeeDataService) {

    }
}
