package net.ai.webabackend.Security;

import lombok.RequiredArgsConstructor;
import net.ai.webabackend.config.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import io.jsonwebtoken.lang.Arrays;

import static net.ai.webabackend.modal.Permission.*;
import static net.ai.webabackend.modal.Role.*;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class WebSecurityConfig {
	private static final String[] WHITE_LIST_URL = {"/api/v1/auth/**",
			"/api/v1/contact",
			"/api/v1/pack/**",
			"/v2/api-docs",
			"/v3/api-docs",
			"/v3/api-docs/**",
			"/swagger-resources",
			"/swagger-resources/**",
			"/configuration/ui",
			"/configuration/security",
			"/swagger-ui/**",
			"/webjars/**",
			"/swagger-ui.html",
			"/api/v1/user/**"
		};
	private final JwtAuthenticationFilter jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider;
	private final LogoutHandler logoutHandler;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.csrf(AbstractHttpConfigurer::disable)
				.cors(cors -> {
					cors.configurationSource(corsConfigurationSource());
				})
				.authorizeHttpRequests(req ->
						req.requestMatchers(WHITE_LIST_URL)
								.permitAll()
								// .requestMatchers("/api/v1/user/**").hasAnyRole(ADMIN.name())
								.requestMatchers("/api/v1/management/**").hasAnyRole(ADMIN.name(), CLIENT.name())
								.requestMatchers(GET, "/api/v1/management/**").hasAnyAuthority(ADMIN_READ.name(), CLIENT_READ.name())
								.requestMatchers(POST, "/api/v1/management/**").hasAnyAuthority(ADMIN_CREATE.name())
								.requestMatchers(PUT, "/api/v1/management/**").hasAnyAuthority(ADMIN_UPDATE.name())
								.requestMatchers(DELETE, "/api/v1/management/**").hasAnyAuthority(ADMIN_DELETE.name())
								.anyRequest()
								.authenticated()
				)
				.sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
				.logout(logout ->
						logout.logoutUrl("/api/v1/auth/logout")
								.addLogoutHandler(logoutHandler)
								.logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
				)
		;

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("http://localhost:4200"); 
		configuration.addAllowedMethod("*"); 
		configuration.addAllowedHeader("*"); 
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new 
		UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	
	
}
