package api.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import javax.persistence.*;

@Entity
@Table(name = "DBUSER")
@JsonRootName(value = "users")
public class User {
    @Id
    @GeneratedValue
    @Column(name = "id")
    @JsonProperty("id")
    public int id;

    @Column(name = "username", nullable = false)
    @JsonProperty("username")
    public String username;

    @Column(name = "password", nullable = false)
    @JsonProperty("password")
    public String password;

    @Column(name = "role", nullable = false)
    @JsonProperty("role")
    public String role;


    @Column(name = "expiration", nullable = false)
    @JsonProperty("expiration")
    public int expiration;

    public User(){

    }
    public User(String username, String password) {
        this.username = username;
        this.password = password;
        role = "employee";
        expiration = 0;
    }
}
