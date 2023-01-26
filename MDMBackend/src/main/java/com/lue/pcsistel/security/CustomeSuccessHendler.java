package com.lue.pcsistel.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomeSuccessHendler extends SimpleUrlAuthenticationSuccessHandler {
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	@Override
	protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		String targetUrl = determinTargetURL(authentication);
		if (response.isCommitted()) {
			System.out.println("con't redirect");
			return;
		}
		redirectStrategy.sendRedirect(request, response, targetUrl);
	}

	/*
	 * This method extracts the role of currently logged-in user and return
	 * appropriate url according to his/her role.
	 */
	private String determinTargetURL(Authentication authentication) {
		String url = "";
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

		List<String> roles = new ArrayList<>();

		for (GrantedAuthority grantedAuthority : authorities) {
			roles.add(grantedAuthority.getAuthority());
		}
		if (isAdmin(roles)) {
			url = "/admin";
		} else if (isCustomer(roles)) {
			url = "/client";
		}
		return url;
	}

	private boolean isAdmin(List<String> roles) {
		if (roles.contains("ROLE_ADMIN")) {
			return true;
		} else {
			return false;
		}
	}

	private boolean isCustomer(List<String> roles) {
		if (roles.contains("ROLE_CLIENT")) {
			return true;
		} else {
			return false;
		}
	}

	public RedirectStrategy getRedirectStrategy() {
		return redirectStrategy;
	}

	public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
		this.redirectStrategy = redirectStrategy;
	}

}
