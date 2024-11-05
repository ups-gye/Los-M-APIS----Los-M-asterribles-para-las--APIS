package ec.edu.ups.login.entity

import jakarta.persistence.*


@Entity
@Table(name = "user", schema = "login", catalog = "login")
class UserEntity (
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    var id: Short = 0,

    @Basic
    @Column(name = "user_name")
    var userName: String = "",

    @Basic
    @Column(name = "user_password")
    var userPassword: String = ""
)
