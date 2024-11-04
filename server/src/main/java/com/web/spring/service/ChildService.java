package com.web.spring.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.spring.dto.child.ChildRequestDto;
import com.web.spring.dto.child.ChlidResponseDto;
import com.web.spring.entity.Child;
import com.web.spring.repository.ChildRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChildService {

	private final ChildRepository childRepository;
	
	@Transactional
	public ChlidResponseDto singUp(ChildRequestDto childRequestDto) {
		
		Child child = childRequestDto.toChild(childRequestDto);
		Child rChild = childRepository.save(child);
		
		System.out.println("rChild : " + rChild);
		
		return new ChlidResponseDto(rChild);
				
	}
	
	@Transactional(readOnly = true)
	public String duplicateCheck(String id) {
		
		Child rMember = childRepository.duplicateCheck(id);
		System.out.println( "rMember ==> " +  rMember);
		
		if(rMember == null) return "아이디 사용 가능";
		else return "아이디 사용 불가";
		
	}

	
}
