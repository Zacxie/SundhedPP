package api.services;


import api.models.Patient;
import api.models.Prescription;
import api.models.User;
import database.DatabaseHelper;
import io.prometheus.client.Summary;
import kong.unirest.Config;
import kong.unirest.Unirest;

import javax.persistence.PersistenceException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import lombok.Data;
import lombok.NoArgsConstructor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.mindrot.jbcrypt.BCrypt;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@Path("/oauth")
public class OauthService {

    static final Summary redirectLatency = Summary.build()
            .name("redirect_latency_seconds").help("Request latency in seconds.").register();

    String baseURL = "http://localhost:8080/rest/oauth/";
    String baseFrontURL= "http://localhost:3000/#/auth";
    String baseAuth = "https://auth.dtu.dk/dtu/?service=";
    String baseAuthValidate = "https://auth.dtu.dk/dtu/validate?service=";

    @Data
    @NoArgsConstructor
    public class LoginData {
        private String username;
        private String password;
    }

    @GET
    @Path("test")
    public String headerTest(@HeaderParam("Authorization") String Authorization){
        return Authorization;
    }

    @GET
    @Path("/login")
    public Response loginDTU() {
            System.out.println("Redirecting to DTU CAS");
        String URI =  baseAuth + baseURL +"redirect";
        return Response.temporaryRedirect(java.net.URI.create(URI)).build();
        //return Response.seeOther(UriBuilder.fromUri(URI).build()).build();
    }

    @GET
    @Path("/redirect")
    public Response callback(@QueryParam("ticket") String ticket){
        Summary.Timer redirectTimer = redirectLatency.startTimer();
            System.out.println("Returning validation from DTU CAS");
        try {
            String body = Unirest.get(baseAuthValidate+baseURL+"redirect&ticket="
                            + ticket)
                    .asString()
                    .getBody();
                System.out.println(body);
            String validationReply = body;
            String[] validationArray = validationReply.split("\n");
            System.out.println( "Valid: " + validationArray[0]);
            String frontUrl = (baseURL == null) ? "" : baseURL;
            String jwtToken = "";
            //STEP 4: Issue Token and redirect to frontpage including token in url:
            if (validationArray.length == 2 && validationArray[0].toLowerCase().trim().equals("yes")) { //Login success
                    System.out.println( "User: " + validationArray[1]);
                User user = resolveUser(validationArray[1].trim()); //validationArray[1] contains campusnet username.
                    System.out.println("Resolved user: "+ user);
                if(user == null){
                    // hashed generic password (should definitly be changed)
                    String hashed = BCrypt.hashpw("undefined", BCrypt.gensalt());
                    user = new User(validationArray[1].trim(),hashed);
                    DatabaseHelper.saveInDb(user); //
                    System.out.println("User saved to database");
                }
                jwtToken = new JWTHandler().generateJwtToken(user);

                System.out.println("Generated JWT: "+ jwtToken);
                //Generating redirection page and returning it.
                String html = baseFrontURL + "/?token=" + jwtToken;
                return Response.temporaryRedirect(URI.create(html)).header("Authorization", "Bearer " + jwtToken).build();
                /*
                return Response.ok()
                        .entity(html)
                        .header("Authorization", "Bearer " + jwtToken)
                        .build();

                 */

            } else {
                return Response.status(401).entity("Login failed, reply was: " + validationReply + "<br><a href='" + frontUrl + "'>Return to frontPage</a>").build();
            }
        } finally {
            redirectTimer.observeDuration();
        }
    }

    @POST
    @Path("/add/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public User createUser(@PathParam("id") String name) {
        User user = new User(name,"undefined");
        DatabaseHelper.saveInDb(user);
        return user;
    }

    @GET
    @Path("/dummy")
    @Consumes(MediaType.APPLICATION_JSON)
    public User createDummy(){
        // hashed generic password (should definitly be changed)
        String hashed = BCrypt.hashpw("undefined", BCrypt.gensalt());
        User user = new User("Mikkel",hashed);
        DatabaseHelper.saveInDb(user);
        return user;
    }

    @GET
    @Path("/validate")
    public Response validateLocal(){
        User user = resolveUser("Mikkel");
        String jwtToken = new JWTHandler().generateJwtToken(user);

        //Generating redirection page and returning it.
        String html = baseFrontURL + "/?token=" + jwtToken;
        return Response.ok()
                .entity(html)
                .header("Authorization", "Bearer " + jwtToken)
                .build();
    }


    public class ElementNotFoundException extends Throwable {
        public ElementNotFoundException(String msg) {
            super(msg);
        }
    }


    public User getUserByCampusNetId(String username) throws ElementNotFoundException, PersistenceException {
            System.out.println("Locating user in database for user: "+username);
        Session session = DatabaseHelper.getSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<User> criteria = builder.createQuery(User.class);
        Root<User> from = criteria.from(User.class);
        criteria.where(builder.equal(from.get("username"), username));
        User user = session.createQuery(criteria).uniqueResult();
            System.out.println("User found on server:" + user);
        DatabaseHelper.closeSession(session);
        return user;
    }


    private User resolveUser(String username){
        User userByCampusNetId = null;
        try {
            userByCampusNetId = getUserByCampusNetId(username);
            if (userByCampusNetId==null){
                throw new ElementNotFoundException("null User in db");
            }
        } catch (ElementNotFoundException e) {

        }
        return userByCampusNetId;
    }

}
