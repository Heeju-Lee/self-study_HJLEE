package Looping;

//혼공자 p183 6번
public class ForTest2 {
    public static void main(String[] args) {
        int rows = 4;
        for (int i = 1; i <= rows; i++) {
            //공백 출력하기
            for (int j = rows-i ; j>0; j--) {
                System.out.print(" ");
            }
            // 별 출력하기
            for(int k=1;k<=i;k++){
                System.out.print("*");
            }System.out.println();
        }
    }
}

