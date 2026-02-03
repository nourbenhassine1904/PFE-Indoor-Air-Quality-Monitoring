package net.ai.webabackend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.ai.webabackend.Repository.TokenRepository;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// un filtre de sécurité pour gérer l'authentification basée sur JWT

//doit être automatiquement détectée lors du balayage de composants par Spring
@Component
// un constructeur avec des arguments pour les champs final de la classe
@RequiredArgsConstructor
//garantit que le filtre est exécuté une fois par demande
//garantit que le filtre est exécuté une fois par demande
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  // diverses opérations: telles que l'extraction du nom d'utilisateur à partir du token & la validation du token 
  private final UserDetailsService userDetailsService;
  //  charger les détails de l'utilisateur à partir du nom d'utilisateur
  private final TokenRepository tokenRepository;
  // pour accéder aux informations sur les tokens stockés

  @Override
  // remplace une méthode héritée 
  protected void doFilterInternal(
          @NonNull HttpServletRequest request,
          @NonNull HttpServletResponse response,
          @NonNull FilterChain filterChain
  ) throws ServletException, IOException {
    // Vérifie si la requête est destinée à l'endpoint d'authentification
    if (request.getServletPath().contains("/api/v1/auth")) {
      filterChain.doFilter(request, response);
      return;
    }
    final String authHeader = request.getHeader("Authorization");
    // Récupère l'en-tête d'authentification de la requête HTTP
    final String jwt;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
      //  Vérifie si l'en-tête d'authentification n'est pas présent ou ne commence pas par "Bearer"(jeton àl'en-tête de la requête pour prouver son identité)
      // Si c'est le cas, le filtre ne fait rien et laisse la requête continuer son traitement
    }
    jwt = authHeader.substring(7);
    //  Extrait le token de l'en-tête d'authentification en supprimant le préfixe "Bearer "
    userEmail = jwtService.extractUsername(jwt);
    //  Extrait le nom d'utilisateur à partir du token en utilisant le service jwtService
    if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) 
    // Vérifie si le nom d'utilisateur extrait n'est pas nul et qu'aucune authentification n'est actuellement configurée dans le contexte de sécurité
    {
      UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
      // Charge les détails de l'utilisateur à partir du service
      var isTokenValid = tokenRepository.findByToken(jwt)
              .map(t -> !t.isExpired() && !t.isRevoked())
              .orElse(false);
              // vérifier si le token n'est pas expiré et n'est pas révoqué.
      if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid)
      
        //  Vérifie si à la fois le token JWT et l'utilisateur sont valides
       {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        authToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );
        SecurityContextHolder.getContext().setAuthentication(authToken);
      }
    }
    filterChain.doFilter(request, response);
  }
}
