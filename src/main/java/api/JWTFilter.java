package api;


import api.models.User;
import api.services.OauthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import database.DatabaseHelper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.hibernate.Session;

import javax.annotation.Priority;
import javax.persistence.PersistenceException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
@Priority(1000)
public class JWTFilter implements ContainerRequestFilter {


    @Context
    HttpHeaders headers;

    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {

        System.out.println(containerRequestContext.getUriInfo().getPath());

        if (!"login".equals(containerRequestContext.getUriInfo().getPath())) {
            System.out.println(containerRequestContext.getHeaderString("jwttoken"));
            //Authorize the request!

            try {
                User user = resolveUser();
                User locatedUser = null;
                try {
                    locatedUser = getUser(user.username);
                } catch (OauthService.ElementNotFoundException e) {
                    e.printStackTrace();
                }
                if(locatedUser == null){
                    containerRequestContext.abortWith(
                            Response.status(Response.Status.FORBIDDEN).entity("You are not allowed to access this resource!").build());
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public User getUser(String username) throws OauthService.ElementNotFoundException, PersistenceException {
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


    private User resolveUser() throws Exception {
        User user = null;
        String authHead = headers.getHeaderString("jwttoken");
        if(authHead == null){
            throw new Exception("You need to login!");
        } else {
            String[] splitAuth = authHead.split(" ");
            if(splitAuth.length != 2){
                throw new Exception("not correct JWT format: Bearer <JWTTOKEN>");
            }
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(System.getenv("JWT_SECRET_KEY")).parseClaimsJws(splitAuth[1]);
            ObjectMapper mapper = new ObjectMapper();
            user = mapper.convertValue(claimsJws.getBody().get("username"), User.class);
        }
        return user;
    }


}
