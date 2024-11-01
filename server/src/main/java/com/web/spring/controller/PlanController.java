package com.web.spring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.web.spring.dto.PlanRequestDto;
import com.web.spring.dto.PlanResponseDto;
import com.web.spring.service.PlanService;

import java.time.LocalDate;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PlanController {
	
	private final PlanService planService;
	
	@PostMapping("/plans/{cNum}")
	public ResponseEntity<?> createPlan( @PathVariable String cNum, 
										@RequestBody PlanRequestDto planRequestDto ) throws Exception{
		
		System.out.println(cNum + " ," + planRequestDto);
		
		planService.createPlan(Long.parseLong(cNum), planRequestDto);
		
		return ResponseEntity.ok(200);
	}
	
	@GetMapping("/plans/{cNum}")
	public ResponseEntity<?> showPlan (@PathVariable String cNum) throws Exception{
	
		
		PlanResponseDto plan = planService.showPlan(Long.parseLong(cNum), LocalDate.now());
		System.out.println(plan);
		
		
		return ResponseEntity.ok(plan);
	}
	
	@PutMapping("/plans/{cNum}/{planNum}")
	public ResponseEntity<?>updatePlan (@PathVariable String cNum, 
										@PathVariable String planNum, 
										@RequestBody PlanRequestDto planRequestDto) throws Exception{
		
		PlanResponseDto plan = planService.updatePlan(Long.parseLong(cNum), Long.parseLong(planNum), planRequestDto);
		
		return ResponseEntity.status(202).body(plan);	
	}
	

}
