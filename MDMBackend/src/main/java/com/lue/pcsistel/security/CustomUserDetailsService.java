package com.lue.pcsistel.security;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lue.pcsistel.model.SEGPerfil;
import com.lue.pcsistel.model.SEGUsuario;
import com.lue.pcsistel.service.SEGUsuarioService;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

	static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

	@Autowired
	private SEGUsuarioService userService;

	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String ssoId) throws UsernameNotFoundException {
		SEGUsuario user = userService.findByUserName(ssoId);
		logger.info("User : {}", user);
		
		if (user == null) {
			logger.info("User not found");
			throw new UsernameNotFoundException("Username not found");
		}
		return new org.springframework.security.core.userdetails.User(user.getVcUsu(), user.getVcPas(), true, true,
				true, true, getGrantedAuthorities(user));
	}

	private List<GrantedAuthority> getGrantedAuthorities(SEGUsuario user) {

		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		
		for(SEGPerfil userProfile : user.getSegPerfils()){
				logger.info("UserProfile : {}", userProfile);
				authorities.add(new SimpleGrantedAuthority("ROLE_"+userProfile.getVcNom()));
		}
               // authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		logger.info("authorities : {}", authorities);
		
		return authorities;
	}

	
/*	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		SEGUsuario segUsuario =userService.findByUserName(userName);
		 buildUserAuthority(segUsuario.getSegPerfils());
	}

	private List<GrantedAuthority> buildUserAuthority(SEGPerfil  segPerfil) {
		Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();
		// Build user's authorities
		setAuths.add(new SimpleGrantedAuthority(userAuthorizations.getUserRole()));
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>(setAuths);

		return list;
	}

	private User buildUserForAuthentication(UserAuthentication userAuthentication, List<GrantedAuthority> authorities) {
		return new User(userAuthentication.getUsername(), userAuthentication.getPassword(),
				userAuthentication.isEnabled(), true, true, true, authorities);
	}
	*/
	
	
}
