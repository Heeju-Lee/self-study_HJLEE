package com.web.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.web.spring.entity.Child;
import com.web.spring.entity.Wish;

public interface WishRepository extends JpaRepository<Wish, Long>{
	

}
