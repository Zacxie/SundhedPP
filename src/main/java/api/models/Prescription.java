package api.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import database.DatabaseHelper;
import org.hibernate.Session;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "prescription")
@JsonRootName(value = "prescription")
public class Prescription {
    @Id @GeneratedValue @Column(name = "id")
    @JsonProperty("id")
    public int id;

    @Column(name = "description", nullable = false)
    @JsonProperty("description")
    public String description;

    @Column(name = "start_date", nullable = false)
    @JsonProperty("start_date") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    public Date startDate;

    @Column(name = "end_date", nullable = false)
    @JsonProperty("end_date") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    public Date endDate;

    public Prescription() {}

    public Prescription(String description) {
        this.description = description;
    }

    public Prescription(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public static List<Prescription> getAllFromDB() {
        Session session = DatabaseHelper.getSession();
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<Prescription> criteria = criteriaBuilder.createQuery(Prescription.class);
        criteria.from(Prescription.class);
        return session.createQuery(criteria).getResultList();
    }

    public static Prescription getById(int id) {
        return DatabaseHelper.getSession().find(Prescription.class, id);
    }
}
