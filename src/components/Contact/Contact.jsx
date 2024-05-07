import { deleteContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";
import css from "./Contact.module.css";

export default function Contact({ contactItem: { name, number, id } }) {
  const dispatch = useDispatch();

  return (
    <div className={css.item}>
      <div>
        <p>{name}</p>
        <p>{number}</p>
      </div>
      <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
    </div>
  );
}
