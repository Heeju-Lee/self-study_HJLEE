package com.web.spring.repository;

import com.web.spring.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findById(String id); //id에 해당하는 멤버를 검색..Query method

    Boolean existsById(String id);//id에 해당하는 멤버가 있는지 여부를 확인
}
