package com.comprinno.contactapp.controller;

import com.comprinno.contactapp.model.User;
import com.comprinno.contactapp.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
// Change this to match the IP/Port in your browser exactly
@CrossOrigin(origins = "http://127.0.0.1:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // REGISTER API - Module 1 Specification
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    // LOGIN API - Module 1 Specification
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        Optional<User> user = userRepository.findByEmail(loginData.getEmail());

        // Validation: Check if user exists and password matches
        if (user.isPresent() && user.get().getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // UPDATE PROFILE API - "Manage his/her profile" Specification
    @PutMapping("/{id}")
    public ResponseEntity<User> updateProfile(@PathVariable Long id, @RequestBody User details) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Update user details
        user.setName(details.getName());
        user.setEmail(details.getEmail());

        // Only update password if a new one is provided
        if (details.getPassword() != null && !details.getPassword().isEmpty()) {
            user.setPassword(details.getPassword());
        }

        return ResponseEntity.ok(userRepository.save(user));
    }
}