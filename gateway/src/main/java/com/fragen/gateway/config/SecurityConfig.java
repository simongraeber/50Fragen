package com.fragen.gateway.config;

import java.net.URI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.WebFilterExchange;
import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Value("${custom.redirect-base-url:/loginCallback}")
    private String redirectBaseUrl;

    @Bean
    public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) {
        return http
                .authorizeExchange(auth ->
                        auth.pathMatchers("/quiz-database/**", "/quiz-session/**")
                                .authenticated()
                                .anyExchange().permitAll())
                .oauth2Login(oauth2 ->
                        oauth2
                                .authenticationSuccessHandler((exchange, authentication) ->
                                        handleRedirect(exchange, "success=true"))
                                .authenticationFailureHandler((exchange, exception) ->
                                        handleRedirect(exchange, "error"))
                )
                .logout(logout ->
                        logout
                                .logoutSuccessHandler((exchange, authentication) ->
                                        handleRedirect(exchange, "logout"))
                )
                .csrf().disable()
                .build();
    }

    private Mono<Void> handleRedirect(WebFilterExchange exchange, String flagQuery) {
        String redirectUri = String.format("%s?%s", redirectBaseUrl, flagQuery);
        exchange.getExchange().getResponse().setStatusCode(HttpStatus.FOUND);
        exchange.getExchange().getResponse().getHeaders().setLocation(URI.create(redirectUri));
        return exchange.getExchange().getResponse().setComplete();
    }
}