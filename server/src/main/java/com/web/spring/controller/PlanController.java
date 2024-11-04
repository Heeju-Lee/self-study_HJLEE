package com.web.spring.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.spring.dto.child.plan.PlanResponseDto;
import com.web.spring.dto.child.plan.PlanRequestDto;
import com.web.spring.entity.Plan;
import com.web.spring.service.PlanService;

import java.time.LocalDate;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/plans")
public class PlanController {
	
//	private final PlanService planService;
//	
//	@PostMapping
//	public ResponseEntity<?> createPlan( @RequestBody PlanRequestDto planRequestDto) throws Exception{
//		
//		System.out.println(planRequestDto);
//		
//		PlanResponseDto response = planService.createPlan(planRequestDto);
//		
//		return ResponseEntity.status(HttpStatus.CREATED)
//							 .body(response);
//	}
//	
//
//	@GetMapping
//	public ResponseEntity<?> showPlan() throws Exception{
//		
//		System.out.println(LocalDate.now());
//	
//		PlanResponseDto response = planService.showPlan(LocalDate.now());
//		//System.out.println(response);
//		
//		return ResponseEntity.status(HttpStatus.OK).body(response);
//	}
//	
//	
//	@PutMapping("/{planNum}")
//	public ResponseEntity<?>updatePlan (@PathVariable String planNum, 
//										@RequestBody PlanRequestDto planRequestDto) throws Exception{
//		
//		PlanResponseDto plan = planService.updatePlan(Long.parseLong(planNum), planRequestDto);
//		
//		return ResponseEntity.status(HttpStatus.OK).body(plan);	
//	}
//	

}
