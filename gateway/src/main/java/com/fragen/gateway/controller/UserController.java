package com.fragen.gateway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/user")
    public Mono<ResponseEntity<Map<String, Object>>> getUser() {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> securityContext.getAuthentication())
                .filter(authentication -> authentication != null && authentication.getPrincipal() instanceof OAuth2User)
                .flatMap(authentication -> {
                    OAuth2User principal = (OAuth2User) authentication.getPrincipal();
                    Map<String, Object> userInfo = new HashMap<>();
                    userInfo.put("id", principal.getAttribute("id"));
                    userInfo.put("name", principal.getAttribute("username"));
                    // Combine the image URL
                    String imageUrl = "https://cdn.discordapp.com/avatars/"
                            + principal.getAttribute("id")
                            + "/" + principal.getAttribute("avatar");
                    userInfo.put("image", imageUrl);
                    return Mono.just(ResponseEntity.ok(userInfo));
                })
                // If there is no authentication or principal then return 200 with a body of null.
                .defaultIfEmpty(ResponseEntity.ok(null));
    }
}