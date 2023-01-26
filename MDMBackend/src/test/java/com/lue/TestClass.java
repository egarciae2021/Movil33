package com.lue;

import java.text.ParseException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class TestClass {

	public static void main(String[] args) throws ParseException{
		//2018-09-11 13:46:29
		long milisecond=1542620658;//DST
		long crt=1522932812l;
		/*SimpleDateFormat dmyFormat = new SimpleDateFormat("MM-dd-yyyy");
		Date result = new Date(milisecond); */
		
		
		/* DateFormat formatter= new SimpleDateFormat("MM-dd-yyyy");
		 formatter.setTimeZone(TimeZone.getTimeZone("Europe/Berlin"));
		 System.out.println(formatter.format(new Date(milisecond)));
		 */
		
		Instant instant = Instant.ofEpochSecond( crt );
		ZoneId zoneId = ZoneId.of( "Europe/Berlin" );
		ZonedDateTime zdt = ZonedDateTime.ofInstant( instant , zoneId );
		System.out.println(zdt.getDayOfMonth() +"    "+zdt.getMonth()+"     "+zdt.getYear());
	}
}
