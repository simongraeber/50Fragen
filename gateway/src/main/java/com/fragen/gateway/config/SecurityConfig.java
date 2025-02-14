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
                        auth.pathMatchers("/quiz-database/**", "/quiz-session/**", "/user")
                                .authenticated()
                                .anyExchange().permitAll())
                .oauth2Login(oauth2 ->
                        oauth2
                                .authenticationSuccessHandler((exchange, authentication) ->
                                        handleRedirect(exchange, true)))
                .logout(logout ->
                        logout
                                .logoutSuccessHandler((exchange, authentication) ->
                                        handleRedirect(exchange, false)))
                .build();
    }

    /**
     * A common redirect handler that builds the redirect URL from the externalized base URL
     * and appends a query parameter indicating whether the login was successful.
     *
     * @param webFilterExchange the current exchange
     * @param loginSuccess      flag indicating if the login authenticated successfully (true)
     *                          or if the user is logging out (false)
     * @return a completed Mono signaling that redirect handling is done
     */
    private Mono<Void> handleRedirect(WebFilterExchange webFilterExchange, boolean loginSuccess) {
        String redirectUri = String.format("%s?success=%s", redirectBaseUrl, loginSuccess);
        webFilterExchange.getExchange().getResponse().setStatusCode(HttpStatus.FOUND);
        webFilterExchange.getExchange().getResponse().getHeaders().setLocation(URI.create(redirectUri));
        return webFilterExchange.getExchange().getResponse().setComplete();
    }
}