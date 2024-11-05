package com.web.spring.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.spring.dto.child.ChildRequestDto;
import com.web.spring.dto.child.ChlidResponseDto;
import com.web.spring.dto.child.wish.WishRequestDto;
import com.web.spring.service.ChildService;
import com.web.spring.service.WishService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/children")
@CrossOrigin
public class ChildController {

	private final ChildService childService;
	private final WishService wishService;
	
	
/* 회원가입*/
	@PostMapping
	public ResponseEntity<?> singUp(@RequestBody ChildRequestDto childRequestDto){
		
		ChlidResponseDto response = childService.singUp(childRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body(response);
	}
	
	//위시 등록하기
	@PostMapping("/wishes")
	public ResponseEntity<?> createWish(@RequestBody WishRequestDto wishRequestDto){
		
		wishService.createWish(wishRequestDto);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body("위시 등록에 성공하셨습니다~!");
	}
	
	
	//위시 삭제하기
	//위시 전체리스트 조회
	//위시 상세보기
	//위시 돈모으기 
	
	
	
	
	
	
}
