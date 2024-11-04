package com.web.spring.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
public class Quiz {
	
	@Id
	@Column(name="q_num")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long qNum;

	private String quiz;
	
	private String answer;
	
	private String description;
	
	@Lob
	private String videoUrl; 
	
	private String category;

	@Override
	public String toString() {
		return "Quiz [qNum=" + qNum + ", quiz=" + quiz + ", answer=" + answer + ", description=" + description
				+ ", videoUrl=" + videoUrl + ", category=" + category + "]";
	}
	
	
}
