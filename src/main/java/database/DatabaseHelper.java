package database;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class DatabaseHelper {

    public static Session getSession() {

        return FactorySession.getFactory().openSession();
    }

    public static void closeSession(Session session) {
        if (session != null) {
            session.close();
        }
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
