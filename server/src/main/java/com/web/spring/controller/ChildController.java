package com.web.spring.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.spring.dto.child.ChildRequestDto;
import com.web.spring.dto.child.ChlidResponseDto;
import com.web.spring.service.ChildService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/childs")
public class ChildController {

	private final ChildService childService;
	
	@PostMapping
	public ResponseEntity<?> singUp(@RequestBody ChildRequestDto childRequestDto){
		
		ChlidResponseDto response = childService.singUp(childRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body(response);
	}
	
}
