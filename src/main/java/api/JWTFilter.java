package api;


import javax.annotation.Priority;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
@Priority(1000)
public class JWTFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {
        System.out.println(containerRequestContext.getUriInfo().getPath());

        if (!"login".equals(containerRequestContext.getUriInfo().getPath())) {
            System.out.println(containerRequestContext.getHeaderString("Authorization"));
            //Authorize the request!
        }
    }


}
