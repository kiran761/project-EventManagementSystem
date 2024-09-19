package com.example.planirright.controller;

import com.example.planirright.model.AppUser;
import com.example.planirright.service.UserService;
import com.example.planirright.service.JwtService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	private RestTemplate restTemplate;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody AppUser user) {
        try {
            userService.registerUser(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");

            return ResponseEntity.ok(response);

        } 
        catch (Exception e) {
        	Map<String, String> response = new HashMap<>();
            response.put("message", "User registered unsuccessfully");
            return ResponseEntity.status(400).body(response);
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<Map<String, Boolean>> checkUsername(@RequestParam String username) {
        boolean exists = userService.existsByUsername(username);
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AppUser appUser) {
        Map<String, Object> response = new HashMap<>();
        
        if (userService.authenticate(appUser.getEmail(), appUser.getPassword())) {
            String token = jwtService.generateToken(appUser.getEmail());
            response.put("token", token); // Include the token in the response
            response.put("user",userService.getUserByEmail(appUser.getEmail()));
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }
    
    @GetMapping("/protected")
    public ResponseEntity<Map<String, Object>> protectedResource() {
        return ResponseEntity.ok(Map.of("Hello", "Hello"));
    }
}
