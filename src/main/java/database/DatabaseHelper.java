package database;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import java.util.Optional;

public class DatabaseHelper {
    public static Session getSession() {
        SessionFactory factory;
        try {
            Configuration configuration = new Configuration().configure();

            String DB_HOST = System.getenv("DB_HOST");
            String DB_NAME = System.getenv("DB_NAME");
            String DB_PORT = Optional.ofNullable(System.getenv("DB_PORT")).orElse("3306");
            if (DB_HOST == null || DB_NAME == null)
                throw new IllegalStateException("\"DB_HOST\" and \"DB_NAME\" cannot be null");

            configuration.setProperty("hibernate.connection.username", Optional.ofNullable(System.getenv("DB_USERNAME")).orElse("root"));
            configuration.setProperty("hibernate.connection.password", Optional.ofNullable(System.getenv("DB_PASSWORD")).orElse("password"));
            configuration.setProperty("hibernate.connection.url", "jdbc:mysql://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME + "?useSsl=false&allowPublicKeyRetrieval=true");

            factory = configuration.buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Failed to create sessionFactory object." + ex);
            throw new ExceptionInInitializerError(ex);
        }
        return factory.openSession();
    }

    public static void closeSession(Session session) {
        if (session != null) session.close();
    }

    public static void saveInDb(Object o) {
        Transaction tx = null;
        Session session = DatabaseHelper.getSession();
        try {
            tx = session.beginTransaction();
            session.save(o);
            tx.commit();
        } catch (HibernateException ex) {
            if (tx != null)
                tx.rollback();
            ex.printStackTrace();
        } finally {
            session.close();
        }
    }

    public static void updateInDb(Object o) {
        Transaction tx = null;
        Session session = DatabaseHelper.getSession();
        try {
            tx = session.beginTransaction();
            session.update(o);
            tx.commit();
        } catch (HibernateException ex) {
            if (tx != null)
                tx.rollback();
            ex.printStackTrace();
        } finally {
            session.close();
        }
    }

    public static void deleteFromDb(Object o) {
        Transaction tx = null;
        Session session = DatabaseHelper.getSession();
        try {
            tx = session.beginTransaction();
            session.delete(o);
            tx.commit();
        } catch (HibernateException ex) {
            if (tx != null)
                tx.rollback();
            ex.printStackTrace();
        } finally {
            session.close();
        }
    }
}
