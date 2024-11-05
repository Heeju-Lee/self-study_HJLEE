package com.web.spring.global.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.web.spring.dto.child.payment.PayRequestDto;
import com.web.spring.entity.Payment;

@Mapper
public interface ChildMapper {

	ChildMapper INSTANCE = Mappers.getMapper(ChildMapper.class);

	
	@Mapping(source = "cardNum", target = "cardNum")
	@Mapping(source = "storeName", target = "storeName")
	@Mapping(source = "paymentAmt", target = "paymentAmt")
	@Mapping(source = "category", target = "category")
	Payment PayRequestDtoToPayment(PayRequestDto payRequestDto);
}
