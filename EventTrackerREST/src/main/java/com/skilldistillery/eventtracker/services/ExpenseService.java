package com.skilldistillery.eventtracker.services;

import java.util.Date;
import java.util.List;

import com.skilldistillery.event.Expense;

public interface ExpenseService {
	
	public List<Expense> index();
	public Expense create(Expense expense);
	public Expense findExpenseById(int id);
	public Expense update(int id, Expense expense);
	public Expense replace(int id, Expense expense);
	public boolean delete(int id);
	public List<Expense> findByPriceRange(double low, double high);
	public List<Expense> findByDate(Date date);
	public List<Expense> findByName(String name);

}
