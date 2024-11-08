package com.web.spring.jwt;

import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<Long,RefreshToken>{

}
