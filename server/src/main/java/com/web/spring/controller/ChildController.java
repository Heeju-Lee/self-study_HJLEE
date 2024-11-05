package com.web.spring.controller;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

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
	
	/*아이의 퀴즈 결과 보여주기	*/
	@PostMapping("/quiz")
	public ResponseEntity<?> showQuizResult(@RequestBody Map<String, String> request){
		
		 Long childNum = Long.valueOf(request.get("childNum"));
		
		HashMap<String, Integer> response = childService.showQuizResult(childNum);
		
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
	}
	
	
	/*아이의 퀴즈 결과를 */
	@PostMapping("quiz/top3")
	public ResponseEntity<?> showQuizResultTop3(@RequestBody Map<String, String> request){
		
		Long childNum = Long.valueOf(request.get("childNum"));
		
		HashMap<String, Integer> response = childService.showQuizResultTop3(childNum);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
		
	}
	
}
