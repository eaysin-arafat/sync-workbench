const FormInputLabel = ({lebel}) => {
  return <label className="mb-3 text-black dark:text-white">{label}</label>;
  {
    required && <span className="input_required">*</span>;
  }
};

export default FormInputLabel;
