package com.skilldistillery.eventtracker.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.event.Expense;
import com.skilldistillery.eventtracker.repository.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService {

	@Autowired
	private ExpenseRepository expRepo;

	@Override
	public List<Expense> index() {
		return expRepo.findAll();

	}

	@Override
	public Expense create(Expense expense) {
		Expense exp = new Expense();

		if (expense != null) {
			if (expense.getName() != null && !expense.getName().equals("")) {
				exp.setName(expense.getName());
			}
			if (expense.getPrice() != 0.0) {
				exp.setPrice(expense.getPrice());
			}
			if (expense.getDescription() != null && !expense.getDescription().equals("")) {
				exp.setDescription(expense.getDescription());
			}
			if (expense.getReason() != null && !expense.getReason().equals("")) {
				exp.setReason(expense.getReason());
			}
			if (expense.getDate() != null) {
				exp.setDate(expense.getDate());
			}
			if (expense.getDate() == null) {
				exp.setDate(new Date());
			}
		}

		return exp;

	}

	@Override
	public Expense findExpenseById(int id) {
		Optional<Expense> opEx = expRepo.findById(id);

		if (opEx.isPresent()) {
			return opEx.get();
		}
		return null;
	}

	@Override
	public Expense update(int id, Expense expense) {
		Optional<Expense> opExp = expRepo.findById(id);

		if (opExp.isPresent()) {
			Expense exp = opExp.get();
			if (expense.getName() != null && !expense.getName().equals("")) {
				exp.setName(expense.getName());
			}
			if (expense.getPrice() != 0.0) {
				exp.setPrice(expense.getPrice());
			}
			if (expense.getDescription() != null && !expense.getDescription().equals("")) {
				exp.setDescription(expense.getDescription());
			}
			if (expense.getReason() != null && !expense.getReason().equals("")) {
				exp.setReason(expense.getReason());
			}
			if (expense.getDate() != null) {
				exp.setDate(expense.getDate());
			}
			if (expense.getDate() == null) {
				exp.setDate(new Date());
			}
			return expRepo.saveAndFlush(exp);

		}
		return null;

	}

	@Override
	public Expense replace(int id, Expense expense) {
		Optional<Expense> opExp = expRepo.findById(id);

		if (opExp.isPresent()) {
			Expense exp = opExp.get();
			if (expense.getName() != null && !expense.getName().equals("")) {
				exp.setName(expense.getName());
			}
			if (expense.getPrice() != 0.0) {
				exp.setPrice(expense.getPrice());
			}
			if (expense.getDescription() != null && !expense.getDescription().equals("")) {
				exp.setDescription(expense.getDescription());
			}
			if (expense.getReason() != null && !expense.getReason().equals("")) {
				exp.setReason(expense.getReason());
			}
			if (expense.getDate() != null) {
				exp.setDate(expense.getDate());
			}
			if (expense.getDate() == null) {
				exp.setDate(new Date());
			}
			return expRepo.saveAndFlush(exp);

		}
		return null;

	}

	@Override
	public boolean delete(int id) {

		try {
			expRepo.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<Expense> findByPriceRange(double low, double high) {
		return expRepo.queryForPostByPriceRange(low, high);

	}

	@Override
	public List<Expense> findByDate(Date date) {
		return expRepo.findByDate(date);

	}

	@Override
	public List<Expense> findByName(String name) {
		return expRepo.findByName(name);

	}

}
