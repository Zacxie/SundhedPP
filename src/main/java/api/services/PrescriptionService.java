package api.services;

import api.models.Prescription;
import database.DatabaseHelper;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/prescription")
@Produces(MediaType.APPLICATION_JSON)
public class PrescriptionService {

    @GET
    public List<Prescription> getPrescriptions() {
        return Prescription.getAllFromDB();
    }

    @GET
    @Path("/{id}")
    public Prescription getPrescription(@PathParam("id") String id) {
        Prescription prescription = Prescription.getById(Integer.parseInt(id));
        if (prescription == null)
            throw new NotFoundException();

        return prescription;
    }

    @GET
    @Path("/patient/{patientId}")
    public List<Prescription> getPatientPrescriptions(@PathParam("patientId") String id) {
        return Prescription.getByPatientId(Integer.parseInt(id));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Prescription createPrescription(Prescription prescription) {
        DatabaseHelper.saveInDb(prescription);
        return prescription;
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Prescription updatePrescription(@PathParam("id") String id, Prescription prescription) {
        int pathId = Integer.parseInt(id);
        if (prescription.id == 0 && pathId != 0) {
            prescription.id = pathId;
        }
        DatabaseHelper.updateInDb(prescription);
        return prescription;
    }

    @DELETE
    @Path("/{id}")
    public Response deletePrescription(@PathParam("id") String id) {
        Prescription prescription = Prescription.getById(Integer.parseInt(id));
        if (prescription != null)
            DatabaseHelper.deleteFromDb(prescription);

        return Response.ok().build();
    }
}
