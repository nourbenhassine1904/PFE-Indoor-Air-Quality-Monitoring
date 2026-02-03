package net.ai.webabackend.auditing;

import net.ai.webabackend.modal.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;
//obtenir l'identifiant de l'utilisateur actuellement authentifié
public class ApplicationAuditAware implements AuditorAware<Long> {
    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();
                        //SecurityContextHolder:stocke les informations d'authentification de l'utilisateur
        if (authentication == null ||
            !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken //utilisée pour représenter les utilisateurs non authentifiés.

        ) {
            return Optional.empty();
        }

        User userPrincipal = (User) authentication.getPrincipal();
        return Optional.ofNullable(userPrincipal.getId());
        // renvoyer l'identifiant de l'utilisateur
        //optional: un conteneur pouvant contenir une valeur ou être vide.
    }
}
