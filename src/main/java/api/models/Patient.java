package api.models;

import com.fasterxml.jackson.annotation.*;
import database.DatabaseHelper;
import org.hibernate.Session;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

@Entity
@Table(name = "patients")
@JsonRootName(value = "patient")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Patient {
    @Id @GeneratedValue @Column(name = "id")
    @JsonProperty("id")
    public int id;

    @Column(name = "name", nullable = false)
    @JsonProperty("name")
    public String name;

    @Column(name = "cpr", nullable = false)
    @JsonProperty("cpr")
    public String cpr;

    @OneToMany(mappedBy = "patient")
    @JsonIdentityReference(alwaysAsId = true)
    public List<Prescription> prescriptions;

    public static Patient fromId(int id) {
        Patient patient = new Patient();
        patient.id = id;
        return patient;
    }

    public Patient() {}

    public static List<Patient> getAllFromDb() {
        Session session = DatabaseHelper.getSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Patient> criteria = builder.createQuery(Patient.class);
        criteria.from(Patient.class);
        List<Patient> retVal = session.createQuery(criteria).getResultList();
        DatabaseHelper.closeSession(session);
        return retVal;
    }

    public static Patient getById(int id) {
        return DatabaseHelper.getSession().find(Patient.class, id);
    }
}
