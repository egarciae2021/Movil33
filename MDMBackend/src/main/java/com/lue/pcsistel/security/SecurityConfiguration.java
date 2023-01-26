package com.lue.pcsistel.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	@Qualifier("customUserDetailsService")
	UserDetailsService userDetailsService;

	@Autowired
	PersistentTokenRepository tokenRepository;
	
	@Autowired
	private CustomeSuccessHendler customeSuccessHendler;

	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService)
		.passwordEncoder(passwordEncoder());
		auth.authenticationProvider(authenticationProvider());
	}
	
	/*@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("admin").password("admin").roles("ADMIN");
		auth.inMemoryAuthentication().withUser("cus").password("cus").roles("CUSTOMER");
	}*/
	

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//hasAnyRole('ROLE_USER','ROLE_ADMIN')"
		http.authorizeRequests()
		.antMatchers("welcome").permitAll()
		.antMatchers("/").access("hasAnyRole('ROLE_ADMIN','ROLE_CUSTOMER')")
        .and().formLogin().loginPage("/login").successHandler(customeSuccessHendler)
		.loginProcessingUrl("/login").usernameParameter("ssoId").passwordParameter("password").and()
		.logout().logoutSuccessUrl("/logout").and()
		.rememberMe().rememberMeParameter("remember-me").tokenRepository(tokenRepository)
		.tokenValiditySeconds(86400).and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	}

		@Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/rest/**");
    }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	
	
	
	
	@Bean
	public PersistentTokenBasedRememberMeServices getPersistentTokenBasedRememberMeServices() {
		PersistentTokenBasedRememberMeServices tokenBasedservice = new PersistentTokenBasedRememberMeServices(
				"remember-me", userDetailsService, tokenRepository);
		return tokenBasedservice;
	}

	@Bean
	public AuthenticationTrustResolver getAuthenticationTrustResolver() {
		return new AuthenticationTrustResolverImpl();
	}

}
