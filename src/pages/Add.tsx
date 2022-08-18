import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik"
import "./Add.css"
import { isUri } from "valid-url"

export default function Add() {
  return (
    <div className="Add">
      <header>
        <h1>Add a new book</h1>
        <img src="cross.svg" />
      </header>
      <main>
        <BookForm />
      </main>
    </div>
  )
}

interface BookFormValues {
  title: string
  author: string
  description: string
  imageUrl: string
}

const InnerForm = (props: FormikProps<BookFormValues>) => {
  const { touched, errors, isSubmitting } = props
  return (
    <Form>
      <BookField
        label="Title"
        prop="title"
        touched={touched.title}
        error={errors.title}
      />
      <BookField
        label="Author"
        prop="author"
        touched={touched.author}
        error={errors.author}
      />
      <BookField
        label="Description"
        prop="description"
        multiline={true}
        touched={touched.description}
        error={errors.description}
      />
      <BookField
        label="Image URL"
        prop="imageUrl"
        touched={touched.imageUrl}
        error={errors.imageUrl}
      />
      <button type="submit" disabled={isSubmitting}>
        Save
      </button>
    </Form>
  )
}

const BookField = ({
  label,
  prop,
  multiline,
  touched,
  error,
}: {
  label: string
  prop: string
  multiline?: boolean
  touched?: boolean
  error?: string
}) => {
  const showError = touched && error
  return (
    <label>
      {label}
      <Field
        as={multiline ? "textarea" : "input"}
        type="text"
        name={prop}
        className={showError ? "error" : ""}
      />
      {showError && <div className="error-message">{error}</div>}
    </label>
  )
}

const BookForm = withFormik<{}, BookFormValues>({
  mapPropsToValues: () => ({
    title: "",
    author: "",
    description: "",
    imageUrl: "",
  }),

  validate: (values: BookFormValues) => {
    let errors: FormikErrors<BookFormValues> = {}
    if (!values.title) {
      errors.title = "Required"
    } else if (!values.author) {
      errors.author = "Required"
    } else if (!values.description) {
      errors.description = "Required"
    } else if (!isUri(values.imageUrl)) {
      errors.imageUrl = "Invalid image URL"
    }
    return errors
  },

  handleSubmit: (values, actions) => {
    confirm(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)
    actions.resetForm()
  },
})(InnerForm)
