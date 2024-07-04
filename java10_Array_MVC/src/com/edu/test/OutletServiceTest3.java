package com.edu.test;

import com.edu.service.OutletService;
import com.edu.vo.Customer;
import com.edu.vo.Product;

public class OutletServiceTest3 {

	public static void main(String[] args) {
		Product[] products1 = {
				new Product("신라면", 1200, 5, "농심"),
				new Product("삼다수 생수", 1000, 10, "농심"),
				new Product("하이타이", 14000, 1, "엘지"),
				new Product("짐빔", 1300000, 1, "JIM")
		};
		
		Product[] products2 = {
				new Product("Terra", 2200, 1, "농심"),
				new Product("맥심커피", 20000, 10, "농심"),
				new Product("휘센 에어컨", 334000, 1, "대우")
		};
		
		Customer c1 = new Customer(111, "이정재", "방배동");
		Customer c2 = new Customer(222, "정우성", "신사동");
		
		Customer[] customers = {c1, c2};
		
		//1
		OutletService service = new OutletService();
		Product [] pros = service.getAllProduct(customers[0]);
		for(Product product : pros) System.out.println(product.getDetails());

		//2
	}

}
