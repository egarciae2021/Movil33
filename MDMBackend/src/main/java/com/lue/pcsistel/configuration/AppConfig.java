package com.lue.pcsistel.configuration;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import com.lue.pcsistel.interceptor.CustomeHander;

@Configuration
@EnableWebMvc
@Import(value=HibernateConfiguration.class)

@ComponentScan(basePackages = "com.lue.pcsistel.rest.api,com.lue.pcsistel.controller,"
		+ "com.lue.pcsistel.security,com.lue.pcsistel.service,com.lue.pcsistel.dao,"
		+ "com.lue.pcsistel.converter,com.lue.pcsistel.firebase.controller,com.lue.pcsistel.firebase")

public class AppConfig extends WebMvcConfigurerAdapter{
	
	
	/*@Autowired
	RoleToUserProfileConverter roleToUserProfileConverter;*/
	
	

	/**
     * Configure ViewResolvers to deliver preferred views.
     */
	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {

		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/views/");
		viewResolver.setSuffix(".jsp");
		registry.viewResolver(viewResolver);
	}
	
	/**
     * Configure ResourceHandlers to serve static resources like CSS/ Javascript etc...
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("/static/");
    }
    
    /**
     * Configure Converter to be used.
     * In our example, we need a converter to convert string values[Roles] to UserProfiles in newUser.jsp
     */
   /* @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(roleToUserProfileConverter);
    }
	*/

    /**
     * Configure MessageSource to lookup any validation/error message in internationalized property files
     */
    @Bean
	public MessageSource messageSource() {
	    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
	    messageSource.setBasename("messages");
	    return messageSource;
	}
    
    /**Optional. It's only required when handling '.' in @PathVariables which otherwise ignore everything after last '.' in @PathVaidables argument.
     * It's a known bug in Spring [https://jira.spring.io/browse/SPR-6164], still present in Spring 4.1.7.
     * This is a workaround for this issue.
     */
    @Override
    public void configurePathMatch(PathMatchConfigurer matcher) {
        matcher.setUseRegisteredSuffixPatternMatch(true);
    }
    
    
    @Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new CustomeHander());
		//registry.addInterceptor(new NotRefresh());
	}
    
    @Bean
    public MultipartResolver multipartResolver() {
       CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
       return multipartResolver;
    }
    
    @Bean
    public RestTemplate restTemplate(){
    	return new RestTemplate();
    }
  
}



