package com.project.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 허용할 URL 패턴 지정
                .allowedOrigins("http://localhost:3000") // 허용할 Origin 지정
                .allowCredentials(true)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드 지정
                .allowedHeaders("*");
               
    }

    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setMaxUploadSize(10485760); // 10MB까지 업로드 허용 (옵션)
        return resolver;
    }

      @Bean
    public FilterRegistrationBean<CharacterEncodingFilter> characterEncodingFilter() {
        FilterRegistrationBean<CharacterEncodingFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CharacterEncodingFilter());
        registrationBean.addUrlPatterns("/*"); // 모든 URL 패턴에 대해 필터 적용
        registrationBean.setName("characterEncodingFilter");
        registrationBean.setOrder(1); // 필터 순서 설정 (다른 필터보다 먼저 실행되도록 설정)
        registrationBean.addInitParameter("encoding", "UTF-8"); // 인코딩 설정
        registrationBean.addInitParameter("forceEncoding", "true"); // 강제로 인코딩 적용
        return registrationBean;
    }

     @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
        .addResourceLocations("file:///C:/VSCode/project/backend/src/main/resources/static/image/");
       
    }

}