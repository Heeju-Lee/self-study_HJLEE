package com.web.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.web.spring.entity.Child;

public interface ChildRepository extends JpaRepository<Child, Long>{
	
	@Query(value ="SELECT c FROM Child c WHERE c.id = :id")
	Child duplicateCheck(String  id);
	
}
