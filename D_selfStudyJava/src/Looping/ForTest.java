package Looping;

//혼공자 p183 5번
public class ForTest {
    public static void main(String[] args) {
        int rows = 0;
        for (int i = 1; i <5; i++) {
            rows++;
            for (int j = 1 ; j <= rows; j++) {
                System.out.print("*");
            }System.out.println(" ");
        }
    }
}
