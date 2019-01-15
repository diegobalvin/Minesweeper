import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import "./input.css";

export interface InputProps {
  updateInputs: (boardSize: number, numMines: number) => void;
}

export class Input extends React.Component<InputProps> {
  public render() {
    const InputSchema = Yup.object().shape({
      boardSize: Yup.number()
        .required()
        .positive()
        .integer()
        .max(30),
      numMines: Yup.number()
        .required()
        .positive()
        .integer()
    });
    return (
      <div>
        <Formik
          initialValues={{ boardSize: "6", numMines: "5" }}
          validationSchema={InputSchema}
          onSubmit={values => {
            this.props.updateInputs(
              Number(values.boardSize),
              Number(values.numMines)
            );
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
          }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="boardSize">Board Size (n x n): </label>
              <input
                id="boardSize"
                type="boardSize"
                name="boardSize"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.boardSize}
              />
              <pre />
              {errors.boardSize && touched.boardSize && errors.boardSize}
              <pre />
              <label htmlFor="numMines">Number of Mines: </label>
              <input
                id="numMines"
                type="numMines"
                name="numMines"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.numMines}
              />
              <br />
              {errors.numMines && touched.numMines && errors.numMines}
              <br />
              <button type="submit" disabled={isSubmitting}>
                Play Now →
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
