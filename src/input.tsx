import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";

export interface InputProps {
  updateInputs: (boardSize: number, numMines: number) => void;
}

export class Input extends React.Component<InputProps> {
  public render() {
    // TODO: pass prettier message
    // TODO: validate less than n^2 (either solve yup or rewrite custom validation)
    const InputSchema = Yup.object().shape({
      boardSize: Yup.number()
        .positive()
        .integer(),
      numMines: Yup.number()
        .positive()
        .integer()
    });
    return (
      <div>
        <Formik
          initialValues={{ boardSize: "", numMines: "" }}
          validationSchema={InputSchema}
          onSubmit={(values, { setSubmitting }) => {
            // callback function pass submitted values upstream
            // boardSize should default to 6 if undefined at time of submit
            // TODO: move magic number to top level source of truth (pass down from app)
            if (!values.boardSize) {
              values.boardSize = "6";
            }
            if (!values.numMines) {
              values.numMines = "5";
            }
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="boardSize">Size of board (n x n): </label>
              <input
                id="boardSize"
                type="boardSize"
                name="boardSize"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.boardSize}
              />
              <br />
              <br />
              {errors.boardSize && touched.boardSize && errors.boardSize}

              <br />
              <br />
              <label htmlFor="numMines">Number of mines: </label>
              <input
                id="numMines"
                type="numMines"
                name="numMines"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.numMines}
              />
              <br />
              <br />
              {errors.numMines && touched.numMines && errors.numMines}
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
