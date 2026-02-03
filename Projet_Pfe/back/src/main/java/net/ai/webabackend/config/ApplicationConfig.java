package net.ai.webabackend.config;

import lombok.RequiredArgsConstructor;
import net.ai.webabackend.Repository.UserRepository;
import net.ai.webabackend.auditing.ApplicationAuditAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
//une configuration d'application:qui gère l'authentification des utilisateurs
public class ApplicationConfig {

  private final UserRepository repository;
  //UserRepository: une classe qui gère la persistance des utilisateurs dans la base de données

  @Bean
  // Responsable de fournir un service pour charger les détails de l'utilisateur 
  public UserDetailsService userDetailsService() {
    return username -> repository.findByEmail(username)
    //pour rechercher un utilisateur par son e-mail
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }

  @Bean //sera géré par le conteneur Spring
  // est utilisé pour effectuer l'authentification des utilisateurs
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    //Création d'une instance de DaoAuthenticationProvider, qui est une implémentation de l'interface AuthenticationProvider.
    authProvider.setUserDetailsService(userDetailsService());
    //utiliser le service de détails de l'utilisateur 
    authProvider.setPasswordEncoder(passwordEncoder());
    //Configuration de l'encodeur de mot de passe pour l'instance de DaoAuthenticationProvider
    return authProvider;
  }

  @Bean
  //une implémentation de l'interface AuditorAware, qui est utilisée pour récupérer l'identifiant de l'utilisateur pour l'audit.
  public AuditorAware<Long> auditorAware() {
    return new ApplicationAuditAware();
  }

  @Bean

  //utilisé pour gérer l'authentification dans l'application.
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
    //encoder les mots de passe avec l'algorithme de hachage BCrypt.
  }

}
