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
                        // 1. Permitir la raíz y cualquier ruta estática que el navegador pueda intentar acceder.
                        .requestMatchers("/", "/**").permitAll()

                        // 2. Permitir el acceso a todos tus endpoints de API y autenticación
                        .requestMatchers("/api/autenticacion/**").permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()

                        // 3. Cualquier otra solicitud DEBE autenticarse (si hubiera alguna que no cae en lo anterior)
                        // Para este caso, ya permitimos TODO con "/**", así que esta línea es redundante o se cambia a:
                        .anyRequest().permitAll() // Lo cambiamos a 'permitAll' para evitar la autenticación básica.
                )
                .headers(headers -> headers.frameOptions().disable()) // Para H2 console

        // CLAVE: Eliminamos o comentamos .httpBasic() si no necesitas esta capa de seguridad
        // para que el navegador pida usuario/contraseña.
        // Si la quitas, Spring Security ya no fuerza la ventana de Basic Auth.
        // .httpBasic()

        ; // <--- Notar que el punto y coma se mueve aquí

        return http.build();
    }
}