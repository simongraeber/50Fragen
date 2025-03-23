package com.fragen.quiz;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .cors().and() // enable CORS support
            .csrf().disable() // disable CSRF if you don’t use cookies for auth
            .authorizeHttpRequests(authorize -> authorize
                .anyRequest().permitAll() // permit all endpoints
            )
            .build();
    }
};