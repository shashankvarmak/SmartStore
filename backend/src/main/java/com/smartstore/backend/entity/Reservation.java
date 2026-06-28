package com.smartstore.backend.entity;

import com.smartstore.backend.enums.ReservationStatus;
import com.smartstore.backend.entity.ReservationItem;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    private Double totalAmount;

    private LocalDateTime reservationDate;

    @OneToMany(
            mappedBy = "reservation",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ReservationItem> items;


    @PrePersist
    public void prePersist() {
        this.reservationDate = LocalDateTime.now();
    }
}


