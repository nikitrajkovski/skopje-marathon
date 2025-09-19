package com.example.skopje_maraton.security;

import com.example.skopje_maraton.model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;

    private long expiresIn;

    private User user;
}
