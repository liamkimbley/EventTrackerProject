package com.skilldistillery.eventtracker.controllers;

import java.time.LocalDate;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.event.Expense;
import com.skilldistillery.eventtracker.services.ExpenseService;


@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4201"})
public class ExpenseController {

	@Autowired
	private ExpenseService expServ;
	
	@RequestMapping(path="expenses", method=RequestMethod.GET)
	public List<Expense> index(){
		return expServ.index();
	}
	
//	@RequestMapping(path="expenses/total", method=RequestMethod.GET)
//	public double total(){
//		return expServ.findTotalExpenses();
//	}
	
	@RequestMapping(path="expenses/{eid}", method=RequestMethod.GET)
	public Expense getSingleExpense(@PathVariable int eid) {
		return expServ.findExpenseById(eid);
	}
	
	@RequestMapping(path="expenses/search/{keyword}", method=RequestMethod.GET)
	public List<Expense> getExpensesByName(@PathVariable String keyword) {
		return expServ.findByName(keyword);
	}
	
	@RequestMapping(path="expenses/search/date/{date}", method=RequestMethod.GET)
	public List<Expense> getExpensesByDate(@PathVariable LocalDate date) {
		return expServ.findByDate(date);
	}
	
	@RequestMapping(path="expenses/search/price/{low}/{high}", method=RequestMethod.GET)
	public List<Expense> getExpenseByPrice(@PathVariable double low, @PathVariable double high) {
		return expServ.findByPriceRange(low, high);
	}
	
	@RequestMapping(path="expenses", method=RequestMethod.POST)
	public Expense create(@RequestBody Expense expense, HttpServletResponse res) {
		Expense exp = expServ.create(expense);
		if (exp != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(500);
		}
		return exp;
	}
	
	@RequestMapping(path="expenses/{eid}", method=RequestMethod.PATCH)
	public Expense updateExpense(@PathVariable int eid, @RequestBody Expense expense, HttpServletResponse res) {
		Expense exp = expServ.update(eid, expense);
		if (exp != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(500);
		}
		return exp;
	}
	
	@RequestMapping(path="expenses/{eid}", method=RequestMethod.PUT)
	public Expense replaceExpense(@PathVariable int eid, @RequestBody Expense expense, HttpServletResponse res) {
		Expense exp = expServ.update(eid, expense);
		if (exp != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(500);
		}
		return exp;
	}
	
	@RequestMapping(path="expenses/{eid}", method=RequestMethod.DELETE)
	public boolean deletePost(@PathVariable int eid, HttpServletResponse res) {
		boolean deleted = expServ.delete(eid);
		if (deleted == true) {
			res.setStatus(201);
		}
		else {
			res.setStatus(500);
		}
		return deleted;
	}
}
