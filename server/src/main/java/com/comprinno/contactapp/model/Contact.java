package com.comprinno.contactapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "user_contacts") // Avoiding "contacts" as it can be a reserved word in some SQL versions
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for PostgreSQL

    @NotBlank(message = "Contact name is required")
    private String contactName; // Required field as per specifications

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp="^[0-9]{10}$", message="Phone must be exactly 10 digits")
    private String phone; // Validated for the Add/Update Contact forms

    @Email(message = "Invalid email format")
    private String email; // Optional but must be valid if provided

    private String work; // Field for work details or occupation

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore // CRITICAL: This prevents the 500 error during JSON serialization
    private User user; // Links the contact to the specific logged-in user
}