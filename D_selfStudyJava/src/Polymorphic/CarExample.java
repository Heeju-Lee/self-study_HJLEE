package Polymorphic;

public class CarExample {
    public static void main(String[] args) {
        Car myCar = new Car();

        myCar.run();
        System.out.println("================================");
        System.out.println("===  앞바퀴만 금호로 교체합니다.  ===");
        myCar.frontLeftTire = new KumhoTire();
        myCar.frontRightTire = new KumhoTire();
        System.out.println("================================");


        myCar.frontLeftTire.roll();
        myCar.frontRightTire.roll();
        myCar.backLeftTire.roll();
        myCar.backRightTire.roll();
    }
}