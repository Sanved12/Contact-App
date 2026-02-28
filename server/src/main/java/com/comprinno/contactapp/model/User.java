package com.comprinno.contactapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for PostgreSQL

    @NotBlank(message = "Name is required")
    private String name; // Used for "Update user details" and Registration

    @Column(unique = true)
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email; // Unique login credential

    @NotBlank(message = "Password is required")
    @Size(min = 4, message = "Password must be at least 4 chars")
    private String password; // Validated for security

    // One-to-Many relationship: One user can have multiple contacts
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Contact> contacts;
}