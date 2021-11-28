package api.services;


import api.models.Patient;
import api.models.Prescription;
import api.models.User;
import database.DatabaseHelper;
import kong.unirest.Config;
import kong.unirest.Unirest;

import javax.persistence.PersistenceException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.hibernate.Session;

import java.io.IOException;

@Path("/oauth")
public class OauthService {

    String baseURL = "http://localhost:8080/rest/oauth";
    String baseAuth = "https://auth.dtu.dk/dtu/?service=";

    @GET
    @Path("/login")
    public Response loginDTU() {
        String URI =  baseAuth + baseURL +"/redirect";
        return Response.seeOther(UriBuilder.fromUri(URI).build()).build();
    }

    @GET
    @Path("/redirect")
    public Response callback(@QueryParam("ticket") String ticket){
        OkHttpClient client = new OkHttpClient();
        String url = baseAuth + baseURL + "&ticket=" + ticket;
        Request request = new Request.Builder().url(url).build();
        try {
            okhttp3.Response response = client.newCall(request).execute();
            String validationReply = response.body().string();
            String[] validationArray = validationReply.split("\n");
            String frontUrl = (baseURL == null) ? "" : baseURL;
            String jwtToken = "";
            //STEP 4: Issue Token and redirect to frontpage including token in url:
            if (validationArray.length == 2 && validationArray[0].toLowerCase().trim().equals("yes")) { //Login success
                User user = resolveUser(validationArray[1].trim()); //validationArray[1] contains campusnet username.

                jwtToken = new JWTHandler().generateJwtToken(user);
                //Generating redirection page and returning it.
                String html = baseURL + "?token=" + jwtToken;
                return Response.ok().entity(html)
                        .header("Authorization", "Bearer " + jwtToken)
                        .build();
            } else {
                return Response.status(401).entity("Login failed, reply was: "  + validationReply + "<br><a href='" + frontUrl +"'>Return to frontPage</a>").build();
            }
        } catch (IOException e) {
            return Response.serverError().entity("Could not connect to campusnet-auth").build();
        }
    }

    @POST
    @Path("/add/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public User createUser(@PathParam("id") String name) {
        User user = new User(name);
        DatabaseHelper.saveInDb(user);
        return user;
    }


    @GET
    @Path("/logout")
    public Response logout() {
        String URI =  "https://auth.dtu.dk/dtu/?service=http://localhost:8080/rest/campusnet/redirect";

        return Response.seeOther(UriBuilder.fromUri(URI).build()).build();
    }



    public class ElementNotFoundException extends Throwable {
        public ElementNotFoundException(String msg) {
            super(msg);
        }
    }


    public User updateUser(String name, String token) {
        Session session = DatabaseHelper.getSession();
        User user = session.find(User.class, name);
        user.token = token;
        DatabaseHelper.updateInDb(user);
        DatabaseHelper.closeSession(session);
        return user;
    }

    public User getUserByCampusNetId(String cnId) throws ElementNotFoundException, PersistenceException {
        Session session = DatabaseHelper.getSession();
        User user = session.find(User.class, cnId);
        DatabaseHelper.closeSession(session);
        return user;
    }


    private User resolveUser(String cnId){
        User userByCampusNetId = null;
        try {
            userByCampusNetId = getUserByCampusNetId(cnId);
            if (userByCampusNetId==null){
                throw new ElementNotFoundException("null User in db");
            }
        } catch (ElementNotFoundException e) {

        }
        return userByCampusNetId;
    }

}
