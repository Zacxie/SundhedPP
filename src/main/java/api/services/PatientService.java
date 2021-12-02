package api.services;

import api.models.Patient;
import database.DatabaseHelper;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import io.prometheus.client.Counter;
import io.prometheus.client.Summary;

@Path("/patient")
@Produces(MediaType.APPLICATION_JSON)
public class PatientService {
    static final Counter requests = Counter.build()
            .name("requests_per_patient_total").help("Total requests.").register();
    static final Summary requestLatency = Summary.build()
            .name("requests_per_patient_latency_seconds").help("Request latency in seconds.").register();

    @GET
    public List<Patient> getPatients() {
        return Patient.getAllFromDb();
    }

    @GET
    @Path("/{id}")
    public Patient getPatient(@PathParam("id") String id) {
        requests.inc();
        Summary.Timer requestTimer = requestLatency.startTimer();
        try {
            Patient patient = Patient.getById(Integer.parseInt(id));
            if (patient == null)
                throw new NotFoundException();
            return patient;
        } finally {
            requestTimer.observeDuration();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Patient createPatient(Patient patient) {
        DatabaseHelper.saveInDb(patient);
        return patient;
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Patient updatePatient(@PathParam("id") String id, Patient patient) {
        int pathId = Integer.parseInt(id);
        if (patient.id == 0 && pathId != 0) {
            patient.id = pathId;
        }

        DatabaseHelper.updateInDb(patient);
        return patient;
    }
}
