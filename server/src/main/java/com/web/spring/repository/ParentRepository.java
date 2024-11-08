package com.web.spring.repository;


import com.web.spring.entity.Child;
import com.web.spring.entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ParentRepository  extends JpaRepository<Parent,Long> {

	@Query(value ="SELECT c FROM Parent c WHERE c.id = :id")
	Parent duplicateCheck(String  id);

}
