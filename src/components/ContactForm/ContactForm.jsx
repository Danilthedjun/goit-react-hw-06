import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

export default function ContactForm() {
  const dispatch = useDispatch();
  const contactNameId = useId();
  const contactNumberId = useId();
  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        id: nanoid(),
        name: values.contactName,
        number: values.contactNumber,
      })
    );
    actions.resetForm();
  };
  const ContactSchema = Yup.object().shape({
    contactName: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Only alphabets are allowed")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    contactNumber: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .matches(/^\d{3}-\d{2}-\d{2}$/, "xxx-xx-xx")
      .required("Required"),
  });
  return (
    <Formik
      initialValues={{
        contactName: "",
        contactNumber: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.container}>
          <label htmlFor={contactNameId}>Name</label>
          <Field name="contactName" id={contactNameId} />
          <ErrorMessage name="contactName" />
        </div>
        <div className={css.container}>
          <label htmlFor={contactNumberId}>Number</label>
          <Field type="tel" name="contactNumber" id={contactNumberId} />
          <ErrorMessage name="contactNumber" />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
