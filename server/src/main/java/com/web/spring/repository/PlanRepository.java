package com.web.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import com.web.spring.entity.Plan;

public interface PlanRepository extends JpaRepository<Plan, Long>{
	
	@Query(value ="SELECT p FROM Plan p , Child c WHERE c.cNum = :cNum AND p.date=:date")
	Plan findByDate(Long cNum, LocalDate date);
	
	
	

}
