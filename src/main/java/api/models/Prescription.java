package api.models;

import com.fasterxml.jackson.annotation.*;
import database.DatabaseHelper;
import org.hibernate.Session;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.NotFoundException;
import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "prescription")
@JsonRootName(value = "prescription")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id", nullable = false)
    @JsonProperty("patient")
    public Patient patient;

    @JsonProperty("patient_id")
    public void setPatientId(int id) {
        Patient p = Patient.getById(id);
        if (p == null)
            throw new NotFoundException();

        this.patient = p;
    }

    public Prescription() {}

    public static List<Prescription> getAllFromDB() {
        Session session = DatabaseHelper.getSession();
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<Prescription> criteria = criteriaBuilder.createQuery(Prescription.class);
        criteria.from(Prescription.class);
        List<Prescription> list = session.createQuery(criteria).getResultList();
        DatabaseHelper.closeSession(session);
        return list;
    }

    public static Prescription getById(int id) {
        Session session = DatabaseHelper.getSession();
        Prescription prescription = session.find(Prescription.class, id);
        DatabaseHelper.closeSession(session);
        return prescription;
    }

    public static List<Prescription> getByPatientId(int id ) {
        Session session = DatabaseHelper.getSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Prescription> criteria = builder.createQuery(Prescription.class);
        Root<Prescription> from = criteria.from(Prescription.class);
        criteria.where(builder.equal(from.get("patient"), id));
        List<Prescription> list = session.createQuery(criteria).getResultList();
        DatabaseHelper.closeSession(session);
        return list;
    }
}
