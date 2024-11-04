package com.web.spring.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Notification {

	@Id
	@Column(name="n_num")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Nnum;
	
	private String message;
	
	private String category;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private LocalDate date;	

    @ManyToOne(fetch = FetchType.LAZY) 
	@JoinColumn(name = "p_num")
	private Parent parent;
	
    @ManyToOne(fetch = FetchType.LAZY) 
	@JoinColumn(name = "c_num")
	private Child child;
	
	@Override
	public String toString() {
		return "Notification [Nnum=" + Nnum + ", message=" + message + ", category=" + category + "]";
	}

	
}
