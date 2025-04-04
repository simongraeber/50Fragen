package com.fragen.gateway.filter;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class UserIdHeaderFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {
        return ReactiveSecurityContextHolder.getContext()
                .flatMap(ctx -> {
                    Authentication authentication = ctx.getAuthentication();
                    if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
                        OAuth2User user = (OAuth2User) authentication.getPrincipal();

                        String userId;
                        String username;
                        String imageUrl;

                        if (user.getAttributes().containsKey("id")) {
                            // Discord login
                            userId = user.getAttribute("id");
                            username = user.getAttribute("global_name");
                            String avatar = user.getAttribute("avatar");
                            imageUrl = "https://cdn.discordapp.com/avatars/" + userId + "/" + avatar;
                        } else {
                            // Google login
                            userId = user.getAttribute("sub");
                            username = user.getAttribute("given_name");
                            imageUrl = user.getAttribute("picture");
                        }

                        ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                                .header("X-User-ID", userId)
                                .header("X-User-Name", username)
                                .header("X-User-Image", imageUrl)
                                .build();
                        return chain.filter(exchange.mutate().request(modifiedRequest).build());
                    }
                    return chain.filter(exchange);
                })
                .switchIfEmpty(chain.filter(exchange))
                .then();
    }

    @Override
    public int getOrder() {
        return -1;
    }
}