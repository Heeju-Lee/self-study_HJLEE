package com.web.spring.controller;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.web.spring.dto.child.ChildRequestDto;
import com.web.spring.dto.child.ChlidResponseDto;
import com.web.spring.dto.child.payment.PayRequestDto;
import com.web.spring.entity.Payment;
import com.web.spring.service.ChildService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/children")
public class ChildController {

	private final ChildService childService;
	
	
/* 회원가입*/
	@PostMapping
	public ResponseEntity<?> singUp(@RequestBody ChildRequestDto childRequestDto){
		
		ChlidResponseDto response = childService.singUp(childRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body(response);
	}
	
	/*그날의 소비내역 받기 */
	 @PostMapping("/payment/{date}")
	public ResponseEntity<?> monthPayment(@RequestBody PayRequestDto payRequestDto ,@PathVariable String date) throws ParseException{
		LocalDate formDate = LocalDate.parse(date);
		
		
		
		  int month = formDate.getMonthValue();
		    int year = formDate.getYear();
		
		HashMap<String,Integer> payments = childService.monthPayment(payRequestDto.getChildNum(), year, month);
		
		
		return ResponseEntity.status(HttpStatus.CREATED).body(payments);
	}
	
	
}
