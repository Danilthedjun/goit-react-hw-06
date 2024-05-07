import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setDefaultContacts } from "../../redux/contactsSlice";

export default function ContactList() {
  const dispatch = useDispatch();
  const isFirstRender = useRef(true); //genialno, poshemu eto ne pokazali na urokah?

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(setDefaultContacts());
      isFirstRender.current = false;
    }
  }, [dispatch]);

  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filter.name);
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          <Contact contactItem={contact} />
        </li>
      ))}
    </ul>
  );
}
