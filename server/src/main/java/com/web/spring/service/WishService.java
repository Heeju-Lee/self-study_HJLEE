package com.web.spring.service;


import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.web.spring.dto.child.wish.WishRequestDto;
import com.web.spring.entity.Child;
import com.web.spring.entity.Wish;
import com.web.spring.repository.ChildRepository;
import com.web.spring.repository.WishRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishService {
	
	private final WishRepository wishRepository;
	private final ChildRepository childRepository;
	
//	@Transactional
//	public void createWish(WishRequestDto wishRequestDto, MultipartFile multipartFile) throws IOException {
//		
//		String imgUrl = s3UploadService.upload(multipartFile);
//		Wish wish = wishRequestDto.toWish(wishRequestDto, imgUrl);
//		System.out.println(wish);
//					wishRepository.save(wish);
//					
//	}

}
