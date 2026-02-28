package com.comprinno.contactapp.repository;

import com.comprinno.contactapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Repository interface for User entity.
 * Fulfills the 'Any user can register' and 'User should login' requirements.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by their email address.
     * Essential for the 'Registration' (to check uniqueness) and 'Login' flows.
     *
     * @param email The unique email of the user.
     * @return An Optional containing the User if found.
     */
    Optional<User> findByEmail(String email);
}