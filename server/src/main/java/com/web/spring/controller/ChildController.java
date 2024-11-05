package com.web.spring.controller;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;


import java.time.LocalDate;
import java.util.HashMap;

import com.web.spring.entity.Payment;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.web.spring.dto.child.ChildRequestDto;
import com.web.spring.dto.child.ChlidResponseDto;

import com.web.spring.dto.child.payment.PayRequestDto;

import com.web.spring.dto.child.plan.PlanRequestDto;
import com.web.spring.dto.child.plan.PlanResponseDto;
import com.web.spring.dto.child.point.PointRequestDto;

import com.web.spring.service.ChildService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/children")
public class ChildController {

	private final ChildService childService;
	
	
/* Child : 회원가입 */
	@PostMapping("/children")
	public ResponseEntity<?> singUp(@RequestBody ChildRequestDto childRequestDto){
		
		ChlidResponseDto response = childService.singUp(childRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body(response);
	}
	

	/*아이의 퀴즈 결과 보여주기	*/
	@PostMapping("/quiz")
	public ResponseEntity<?> showQuizResult(@RequestBody Map<String, String> request){
		
		 Long childNum = Long.valueOf(request.get("childNum"));
		
		HashMap<String, Integer> response = childService.showQuizResult(childNum);
		
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
	}
	
	
	/*아이의 퀴즈 결과를 top3로 나눠서 보여주기*/
	@PostMapping("quiz/top3")
	public ResponseEntity<?> showQuizResultTop3(@RequestBody Map<String, String> request){
		
		Long childNum = Long.valueOf(request.get("childNum"));
		
		HashMap<String, Integer> response = childService.showQuizResultTop3(childNum);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
	}

	
/* Plan : 소비 계획 세우기 */
	@PostMapping("/plans")
	public ResponseEntity<?> createPlan( @RequestBody PlanRequestDto planRequestDto) throws Exception{
		
		System.out.println(planRequestDto);
		
		PlanResponseDto response = childService.createPlan(planRequestDto);
		
		return ResponseEntity.status(HttpStatus.CREATED)
							 .body(response);
	}
	

	@GetMapping("/plans")
	public ResponseEntity<?> showPlan(	@RequestParam  String year,
										@RequestParam  String month) throws Exception{
	
		PlanResponseDto response = childService.showPlan(year, month);
		System.out.println(response);
		
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@PutMapping("/plans/{planNum}")
	public ResponseEntity<?>updatePlan (@PathVariable String planNum,
										@RequestBody PlanRequestDto planRequestDto) throws Exception{
		
		PlanResponseDto plan = childService.updatePlan(Long.parseLong(planNum), planRequestDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(plan);	
	}


	//이번달 소비리스트
	@GetMapping("/payments/{childNum}")
	public ResponseEntity<?> showMonthChart(	@PathVariable String childNum,
			 									 @RequestParam  String year,
												  @RequestParam  String month) throws Exception{

		HashMap<String, Integer> response = childService.showMonthChart(childNum, year, month);
		System.out.println(response);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	/* 포인트 조회 */
	@GetMapping("/point/{childNum}")
	public ResponseEntity<?> showPoint(@PathVariable Long childNum){
		int response = childService.showPoint(childNum);
		return ResponseEntity.status(HttpStatus.OK)
							.body(response);
	}
	
	/* 포인트 업데이트 */
	@PutMapping("/point")
	public ResponseEntity<?> updatePoint(@RequestBody PointRequestDto request){
		int response = childService.updatePoint(request.getChildNum(),request.getPoint());
		return ResponseEntity.status(HttpStatus.OK).body(response);

	}
	
}
