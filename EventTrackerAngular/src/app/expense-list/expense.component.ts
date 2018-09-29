import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
// import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  title = 'Expense Tracker';
  expenses: Expense[];
  selected: Expense = null;
  newExp: Expense = new Expense();
  editExp: Expense = null;
  total = 0;
  sum = 0;

  displayExpense(exp) {
    this.selected = exp;
  }

  getTotalExpenses = function() {
    return this.total;
  };

  getNumberofExpenses = function() {
    return this.sum;
  };

  reload = function() {
    this.expenseService.index().subscribe(
      data => { this.expenses = data;
              this.sum = this.expenses.length;
              this.total = 0;
              for (let i = 0; i < this.expenses.length; i++) {
                this.total += this.expenses[i].price;
              }},
      err => {console.error('Observer got an error: ' + err.status); }
      );
  };

  displayTable = function() {
    this.selected = null;
  };

  addExpense = function() {
    this.expenseService.create(this.newExp).subscribe(
      data => {this.reload(); },
      err => {console.error('Observer got an error: ' + err.status); }
      );
      console.log(this.newExp);
      this.newExp = new Expense();
  };

  setEditExp = function() {
    this.editExp = Object.assign({}, this.selected);
  };

  updateExp = function(exps: Expense) {
    console.log(exps);
    this.expenseService.update(exps).subscribe(
      data => {
        this.selected = data;
        this.editExp = null;
        this.reload(); },
      err => {console.error('Observer got an error: ' + err.status); }
    );
  };

  deleteExp = function(id: number) {
    this.expenseService.destroy(id).subscribe(
      data => {
        this.reload(); },
      err => {console.error('Observer got an error: ' + err.status); }
    );
  };

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.reload();
  //   const expId = this.route.snapshot.paramMap.get('id');

  //   if (expId) {
  //     this.expenseService.show(expId).subscribe(
  //       data => {
  //         if (data) {
  //           this.selected = data;
  //         } else {
  //           this.router.navigateByUrl('notfound');
  //         }
  //       }
  //     );
  //   }
  }

}
