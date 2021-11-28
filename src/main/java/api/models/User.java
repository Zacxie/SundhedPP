package api.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import javax.persistence.*;

@Entity
@Table(name = "users")
@JsonRootName(value = "users")
public class User {
    @Id
    @GeneratedValue
    @Column(name = "id")
    @JsonProperty("id")
    public int id;

    @Column(name = "name", nullable = false)
    @JsonProperty("name")
    public String name;

    @Column(name = "token", nullable = false)
    @JsonProperty("token")
    public String token;

    @Column(name = "expiration", nullable = false)
    @JsonProperty("expiration")
    public String expiration;

    public User(String username) {
        name = username;
    }
}
