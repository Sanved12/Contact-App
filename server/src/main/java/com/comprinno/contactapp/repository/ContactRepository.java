package com.comprinno.contactapp.repository;

import com.comprinno.contactapp.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    // Supports 'List all contacts (Paginated)' specification
    Page<Contact> findByUserId(Long userId, Pageable pageable);

    // Supports 'Delete all the record button' specification
    @Transactional
    @Modifying
    @Query("DELETE FROM Contact c WHERE c.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);
}