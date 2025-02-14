package com.fragen.gateway.controller;

import java.net.URI;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RestController
public class LogoutController {

    @Value("${custom.redirect-base-url:/loginCallback}")
    private String redirectBaseUrl;

    @GetMapping("/logout_now")
    public Mono<Void> logout(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        // Invalidate the session.
        return exchange.getSession()
            .flatMap(session -> session.invalidate())
            .then(Mono.fromRunnable(() -> {
                response.setStatusCode(HttpStatus.FOUND);
                response.getHeaders().setLocation(URI.create(redirectBaseUrl + "?logout"));
            }))
            .then(response.setComplete());
    }
}