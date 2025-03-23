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

                    String userId;
                    String userName;
                    String userImage;

                    if (principal.getAttributes().containsKey("id")) {
                        // Discord login
                        userId = principal.getAttribute("id");
                        userName = principal.getAttribute("username");
                        String avatar = principal.getAttribute("avatar");
                        userImage = "https://cdn.discordapp.com/avatars/" + userId + "/" + avatar;
                    } else {
                        // Google login
                        userId = principal.getAttribute("sub");
                        userName = principal.getAttribute("name");
                        userImage = principal.getAttribute("picture");
                    }

                    userInfo.put("id", userId);
                    userInfo.put("name", userName);
                    userInfo.put("image", userImage);
                    return Mono.just(ResponseEntity.ok(userInfo));
                })
                .defaultIfEmpty(ResponseEntity.ok(null));
    }
}