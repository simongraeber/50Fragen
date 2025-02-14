package com.fragen.gateway.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/user")
    public Mono<ResponseEntity<Map<String, Object>>> getUser(
            @AuthenticationPrincipal Mono<OAuth2User> principalMono) {
        return principalMono
                .map(principal -> {
                    Map<String, Object> userInfo = new HashMap<>();
                    userInfo.put("id", principal.getAttribute("id"));
                    userInfo.put("username", principal.getAttribute("username"));
                    userInfo.put("avatar", principal.getAttribute("avatar"));
                    return ResponseEntity.ok(userInfo);
                })
                .switchIfEmpty(Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()));
    }
}