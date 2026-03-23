package db

import "time"

type User struct {
	ID        uint   `gorm:"primaryKey;autoIncrement"`
	Name      string `gorm:"not null"`
	Email     string `gorm:"unique;not null"`
	Password  string `gorm:"not null"`
	Role      string `gorm:"not null;default:'staff'"` // admin or staff
	CreatedAt time.Time
}

type Clinic struct {
	ID          uint   `gorm:"primaryKey;autoIncrement"`
	Name        string `gorm:"not null"`
	Description string
	Tickets     []Ticket `gorm:"foreignKey:ClinicID"`
	CreatedAt   time.Time
}

type Patient struct {
	ID        uint   `gorm:"primaryKey;autoIncrement"`
	Name      string `gorm:"not null"`
	CreatedAt time.Time
}

type Ticket struct {
	ID        uint   `gorm:"primaryKey;autoIncrement"`
	Code      string `gorm:"unique;not null"`
	Status    string `gorm:"not null;default:'WAITING'"` // WAITING, IN_ATTENTION, ATTENDED, CANCELLED
	ClinicID  uint   `gorm:"not null"`
	Clinic    Clinic
	PatientID uint `gorm:"not null"`
	Patient   Patient
	CreatedAt time.Time
	UpdatedAt time.Time
}

type QueueEntry struct {
	ID        uint `gorm:"primaryKey;autoIncrement"`
	TicketID  uint `gorm:"not null"`
	Ticket    Ticket
	ClinicID  uint `gorm:"not null"`
	Clinic    Clinic
	Position  int `gorm:"not null"`
	CreatedAt time.Time
}
