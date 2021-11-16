package api.services;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/oauth")
@Produces(MediaType.APPLICATION_JSON)
public class UserOauth {

    @GET
    @Path("/")
    public Response getting(){
        return Response.status(Response.Status.OK).entity("test").build();
    }

}
