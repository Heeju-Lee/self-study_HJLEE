package com.web.spring.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.web.spring.entity.Child;
import com.web.spring.entity.Member;
import com.web.spring.entity.Parent;
import com.web.spring.repository.ChildRepository;

import com.web.spring.repository.ParentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomMemberDetailsService implements UserDetailsService {

	private final ChildRepository childRepository;
	private final ParentRepository parentRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Member member = new Member();
		// 첫 로그인 시

		// ChildRepository에서 username으로 조회
		Child child = childRepository.duplicateCheck(username);
		if (child != null) {
			log.info("찾았다!! :: CHILD :: {}", child);
			// 새로운 Member 생성 후 메모리에 저장
			 member = new Member(username, child.getPwd(),child.getName(), "USER_CHILD", child.getChildNum());

			return new CustomMemberDetails(member);
		}

		// ParentRepository에서 username으로 조회
		Parent parent = parentRepository.duplicateCheck(username);
		if (parent != null) {
			log.info("찾았다!! :: PARENTS :: {}", parent);
			// 새로운 Member 생성 후 메모리에 저장
			 member  = new Member(username, parent.getPwd(),parent.getName(), "USER_PARENT", parent.getParentNum());
			
			return new CustomMemberDetails(member);
		}

		//아마도 로그인 후 토큰에 있는 값을 확인해주는 크드가 있어야하지 않나?ㄴ

		throw new UsernameNotFoundException("유효하지 않은 사용자 역할입니다: " + member.getRole());
	}

}
