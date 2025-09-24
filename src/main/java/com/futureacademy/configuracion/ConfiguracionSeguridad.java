package com.futureacademy.configuracion;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class ConfiguracionSeguridad {

    private final ConfiguracionCors configuracionCors;

    public ConfiguracionSeguridad(ConfiguracionCors configuracionCors) {
        this.configuracionCors = configuracionCors;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(configuracionCors.corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/autenticacion/**").permitAll()
                        .requestMatchers("/api/**").permitAll() // TEMPORAL: permitir todas las APIs
                        .requestMatchers("/h2-console/**").permitAll()
                        .anyRequest().authenticated()
                )
                .headers(headers -> headers.frameOptions().disable()) // Para H2 console
                .httpBasic();

        return http.build();
    }
}