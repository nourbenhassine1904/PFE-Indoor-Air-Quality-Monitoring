package net.ai.webabackend.service;

import lombok.RequiredArgsConstructor;
import net.ai.webabackend.Repository.UserRepository;
import net.ai.webabackend.dto.ChangePasswordRequest;
import net.ai.webabackend.dto.RegisterRequest;
import net.ai.webabackend.dto.UserDto;
import net.ai.webabackend.mapper.UserMapper;
import net.ai.webabackend.modal.Role;
import net.ai.webabackend.modal.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;


    public List<User> getAllUsers() {
        List<User> users = new ArrayList<User>();
        userRepo.findAll().forEach(user -> users.add(user));
        return users;
    }

    public User save(User newUser) {
        userRepo.save(newUser);
        return newUser;
    }

    public Boolean checkEmailUsed(String email){
        if(userRepo.findByEmail(email) != null){
            return true;
        }
        return false;
    }

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        userRepo.save(user);
    }

    public List<UserDto> getListClients(Role role) {
        List<UserDto> listClient = new ArrayList<UserDto>();
        var users = userRepo.findAllByRole(role);
        users.forEach(user -> listClient.add(userMapper.userToUserDto(user)));
        
        return listClient;
    }

    public List<UserDto> getListClientWithStatusActif(Role role, Boolean actif) {
        List<UserDto> listClient = new ArrayList<UserDto>();
        var users = userRepo.findAllByRoleAndActif(role, actif);
        users.forEach(user -> listClient.add(userMapper.userToUserDto(user)));
        
        return listClient;
    }

    public UserDto getClientById(Long id) {
        var user =  userRepo.findAllById(id).get(0);
        return userMapper.userToUserDto(user);
    }

    public Map<String, String> activateClient(Long id) {
        User user =  userRepo.findAllById(id).get(0);
        user.setActif(true);
        user.setActivationDate(LocalDateTime.now());
        userRepo.save(user);
        HashMap<String, String> map = new HashMap<>();
        map.put("message", "Client activated successfully");
        return map;
    }

    public Map<String, String> updateClientData(Long id, RegisterRequest request) {
        User user =  userRepo.findAllById(id).get(0);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setHousingType(request.getHousingType());
        user.setCompanySize(request.getCompanySize());
        user.setSecteurActivite(request.getSecteurActivite());
        userRepo.save(user);
        HashMap<String, String> map = new HashMap<>();
        map.put("message", "Client updated successfully");
        return map;
    }
}
