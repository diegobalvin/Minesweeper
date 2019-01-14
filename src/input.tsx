import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";

export class Input extends React.Component<{}> {
  public render() {
    const InputSchema = Yup.object().shape({
      size: Yup.number()
        .required()
        .positive()
        .integer()
    });
    return (
      <div>
        <h1>Welcome to minesweeper input page!</h1>
        <Formik
          initialValues={{ size: "", password: "" }}
          validationSchema={InputSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="size">Size of board (n x n): </label>
              <input
                id="size"
                type="size"
                name="size"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.size}
              />
              {errors.size && touched.size && errors.size}
              <br />
              <br />
              <label htmlFor="password">Number of mines: </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <br />
              <br />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
