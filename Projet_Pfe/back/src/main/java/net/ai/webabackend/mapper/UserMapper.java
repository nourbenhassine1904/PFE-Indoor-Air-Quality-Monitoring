package net.ai.webabackend.mapper;

import org.mapstruct.Mapper;

import net.ai.webabackend.dto.RegisterRequest;
import net.ai.webabackend.dto.UserDto;
import net.ai.webabackend.modal.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto userToUserDto(User user);
    User registerRequestToUser(RegisterRequest request);
}
