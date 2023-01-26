package com.lue.pcsistel.utils;

import java.util.Random;

public class RandomNumber {
	
	public static Integer getNumber(){
		// create instance of Random class 
		Random rand = new Random(); 
		// Generate random integers in range 999999
		return  100000 + rand.nextInt(900000);
	}
}
