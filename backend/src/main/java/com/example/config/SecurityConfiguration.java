package com.example.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    
    @Configuration
    @Profile("prod")
    @Order(1) // Ensures this configuration runs before the other one
    @RequiredArgsConstructor
    public static class DevSecurityConfiguration {
        
        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;
        private final CorsConfigurationSource corsConfigurationSource;
        
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .cors(httpSecurityCorsConfigurer ->
                            httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource))
                    .csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests((authorize) -> authorize
                            .requestMatchers("api/v1/auth/**").permitAll()
                            .requestMatchers("api/v1/reserved_hours/**").permitAll()
                            .requestMatchers("api/v1/ticket-updates/**").hasAnyAuthority("ADMIN", "MECHANIC", "MANAGER")
                            .requestMatchers(HttpMethod.GET, "api/v1/users/me").permitAll()
                            .requestMatchers("api/v1/users/**").hasAnyAuthority("ADMIN")
                            .requestMatchers(HttpMethod.GET,"api/v1/services/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "api/v1/services/featured-photos").permitAll()
                            .requestMatchers(HttpMethod.GET, "api/v1/services/available-photos").permitAll()
                            .requestMatchers(HttpMethod.GET, "api/v1/services/ticket-services").permitAll()
                            .requestMatchers("api/v1/reviews/**").permitAll()
                            .requestMatchers("api/v1/assignments/**").hasAnyAuthority("ADMIN", "MANAGER")
                            .requestMatchers("api/v1/mechanics/**").hasAnyAuthority("ADMIN", "MANAGER")
                            .requestMatchers("api/v1/tickets/my-tickets").permitAll()
                            .requestMatchers("api/v1/tickets/create-user-ticket").permitAll()
                            .requestMatchers("api/v1/tickets/**").hasAnyAuthority("ADMIN", "MANAGER")
                    )
                    .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .authenticationProvider(authenticationProvider)
                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
            
            return http.build();
        }
    }
    
    @Configuration
    @Profile({"!prod"})
    @RequiredArgsConstructor
    public static class ProdSecurityConfiguration {
        
        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;
        
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .httpBasic(Customizer.withDefaults())
                    .cors(Customizer.withDefaults())
                    .csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests((authorize) -> authorize.anyRequest().permitAll())
                    .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .authenticationProvider(authenticationProvider)
                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
            return http.build();
        }
    }
    
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("Content-Type", "Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/v1/**", configuration);
        return source;
    }
}
