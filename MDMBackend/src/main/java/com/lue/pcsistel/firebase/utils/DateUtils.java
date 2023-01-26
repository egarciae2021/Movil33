package com.lue.pcsistel.firebase.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

	public static String getCurrentDate(){
		SimpleDateFormat dmyFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return dmyFormat.format(new Date());
	}
}
