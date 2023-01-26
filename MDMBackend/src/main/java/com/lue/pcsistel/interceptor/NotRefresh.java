package com.lue.pcsistel.interceptor;
/*package com.lue.pcsistel.intercepter;

import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class NotRefresh extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		HttpSession httpSession = null;
		Integer servetToken = null, clientToken = null;
		RequestDispatcher dispatcher = null;
		if (request.getMethod().equalsIgnoreCase("GET")) {
			// create locate Session
			httpSession = request.getSession(true);
			// generate server side session token and keep in session attribute
			httpSession.setAttribute("sToken", new Random().nextInt(800));
			return true;
		} else {
			// locate session
			httpSession = request.getSession(false);
			// read server side token
			servetToken = (Integer) httpSession.getAttribute("sToken");
			// read client side token
			clientToken = Integer.parseInt(request.getParameter("cToken"));
			if (servetToken.hashCode() == clientToken.hashCode()) {
				// change server side token
				httpSession.setAttribute("sToken", new Random().nextInt(800));
				return true;
			} else {
				dispatcher = request.getRequestDispatcher("/WEB-INF/views/notrefesh.jsp");
				request.setAttribute("response", "Not allows to refresh while/after saving record.");
				dispatcher.forward(request, response);
				return false;
			}
		}
	}
}
*/