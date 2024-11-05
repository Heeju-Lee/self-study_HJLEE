package com.web.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.spring.entity.Child;
import java.util.List;
import com.web.spring.entity.Payment;
import com.web.spring.entity.Plan;


public interface ChildRepository extends JpaRepository<Child, Long>{
	
	@Query(value ="SELECT c FROM Child c WHERE c.id = :id")
	Child duplicateCheck(String  id);
	
	//MGMT-23(특정 년/월의 소비를 보여주기)
	@Query("SELECT p.category,SUM(p.paymentAmt) FROM Child c JOIN c.payments p where c.childNum =: childNum AND FUNCTION('YEAR', p.createdAt)=:year AND FUNCTION('MONTH',p.createdAt)=:month")
	List<Payment> findMonthPayment(@Param("childNum") Long childNum, @Param("year") int year, @Param("month") int month);
	//MGMT-24(특정 년/월의 소비계획을 보여주기)
	@Query("SELECT p FROM Child c JOIN c.plans p where c.childNum =: childNum AND FUNCTION('YEAR', p.createdAt)=:year AND FUNCTION('MONTH',p.createdAt)=:month")
	List<Plan> findMonthPlan(@Param("childNum") Long childNum, @Param("year") int year, @Param("month") int month);
	

	//MGMT-25(아이의 퀴즈결과 누적수치 조회-findById사용)

	//MGMT-26(아이의 퀴즈결과 Top3 조회-findById사용)
	
}
