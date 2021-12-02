package database;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.Optional;

public class FactorySession {
    static SessionFactory factory;

    private FactorySession() {

    }

    public static synchronized SessionFactory getFactory() {
        if(factory == null) {
            System.out.println("Factory is null");
            Configuration configuration = new Configuration().configure();

            String DB_HOST = System.getenv("DB_HOST");
            String DB_NAME = System.getenv("DB_NAME");
            String DB_PORT = Optional.ofNullable(System.getenv("DB_PORT")).orElse("3306");
            if (DB_HOST == null || DB_NAME == null)
                throw new IllegalStateException("\"DB_HOST\" and \"DB_NAME\" cannot be null");

            configuration.setProperty("hibernate.connection.username", Optional.ofNullable(System.getenv("DB_USERNAME")).orElse("root"));
            configuration.setProperty("hibernate.connection.password", Optional.ofNullable(System.getenv("DB_PASSWORD")).orElse("password"));
            configuration.setProperty("hibernate.connection.url", "jdbc:mysql://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME + "?useSsl=false&allowPublicKeyRetrieval=true");

            factory =configuration.buildSessionFactory();
            }
        System.out.println("Factory is not null");
        return factory;
        }
    }

