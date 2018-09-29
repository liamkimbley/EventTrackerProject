package com.skilldistillery.eventtracker.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.event.Expense;


public interface ExpenseRepository extends JpaRepository<Expense, Integer>{
	
	public List<Expense> findByNameContains(String name);
	public List<Expense> findByDate(LocalDate date);
	
	@Query("SELECT e FROM Expense e WHERE e.price BETWEEN :low AND :high")
	public List<Expense> queryForPostByPriceRange(@Param("low") double lowest, @Param("high") double highest);
	
	@Query("SELECT SUM(e.price) FROM Expense e")
	public double queryForTotalSpent();

}
