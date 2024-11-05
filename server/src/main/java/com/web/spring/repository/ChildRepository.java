package com.web.spring.repository;

import com.web.spring.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.spring.entity.Child;
import com.web.spring.entity.Plan;

import java.util.ArrayList;
import java.util.List;

public interface ChildRepository extends JpaRepository<Child, Long>{
	
	@Query(value ="SELECT c FROM Child c WHERE c.id = :id")
	Child duplicateCheck(String  id);
	
	@Query("SELECT p FROM Child c JOIN c.plans p WHERE FUNCTION('YEAR', p.createdAt) = :year AND FUNCTION('MONTH', p.createdAt) = :month")
	Plan findPlanByDate( @Param("year") int year, @Param("month")  int month);

	//MGMT-23(특정 년/월의 소비를 보여주기)
	@Query("SELECT p FROM Child c JOIN c.payments p where c.childNum =: childNum")
	ArrayList<Payment> showMonthPayments(@Param("childNum") Long childNum);


}
