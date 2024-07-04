package com.edu.service;

import com.edu.vo.Customer;
import com.edu.vo.Product;

//Outlet 에서 상품을 구매하는 고객의 기능을 정의하고 있는 클래스.....
//서비스 클래스는 기능만으로 이루어지는 클래스.
//vo, test, service 클래스를 작성하게 되면 드디어 구조적인 Application을 자바 SE기반으로 작성 
public class OutletService {
	public Product[] get1() {
		//작성x 나중에
		return null;
	}
	
	public Customer[] get2() {
		//작성x 나중에
		return null;
	}

	//1. 특정 고객이 구입한 모든 상품을 반환(get)하는 기능(모든 = all or -s/es)
		public Product[] getAllProduct(Customer vo) {
			return null;
		}
	//2. 특정 고객이 구입한 상품의 MAKER들만을 반환하는 기능// 메소드의 명칭은 일관적이면서 다른점만 명칭을 지정
		public String[] getAllProductMaker(Customer vo) {
			vo.buyProducts(get1());
			return null;
		}
	//3. Outlet안에 있는 고객중에서 특정한 고객을 검색하는 기능.(검색 = search , find)
		public Customer findCustomer(Customer[] customers, int ssn) {
			
			return null;
		}
	//4. Outlet안에 있는 고객중에서 동일한 주소를 가지고 있는 고객들을 반환.(!!!!!!!!오버로딩 서비스클래스에서 기능의 일관성을 보장하는 가장 좋은 기법)
		public Customer findCustomer(Customer[] customers, String address) {
			
			return null;			
		}
	//5. 특정 고객이 구입한 물건중에서 최고가에 해당하는 물건의 가격을 리턴하는 기능.
		public int maxPriceProduct(Customer vo) {//Customer가 구입한 상품, hasing 관계이기 때문에 customer로 접근
			
			return 0;
		}
	//6. 모든 고객이 구입한 물건 중 특정 가격 이상이 되는 제품들을 반환하는 기능.
		public Product[] getMorePriceProduct(Customer[] customers, int price) {
		
			return null;
		}
}
