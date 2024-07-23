package collectionFramework.map;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class MapExample {
    public static void main(String[] args) {
        Map<String,Integer> map = new HashMap<>();
        map.put("blue", 96);
        map.put("hong", 86);
        map.put("white", 92);

        String name = null;
        int maxScore = 0;
        int totalScore = 0;

        Set<String> key = map.keySet();//Set에 key 객체를 담음.
        for(String k: key){
            if(map.get(k)>maxScore){
                maxScore = map.get(k);//k가 있는 values를 return
                name = k;//k=key
            }
            totalScore += map.get(k);
        }
        int avgScore = 0;
        avgScore = totalScore/map.size();

        System.out.println("평균점수 :" +avgScore);
        System.out.println("최고점수 :" +maxScore);
        System.out.println("최고점수를 받은 아이디 :" +name);
    }
}