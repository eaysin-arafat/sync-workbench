// INPUT PROPS
type Props = {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  required?: boolean;
  errMsg?: string;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  onClick?: () => void;
  id?: string;
};

const AttachFile = (props: Props) => {
  const {
    value,
    onChange,
    id,
    name,
    label,
    required,
    errMsg,
    disabled,
    placeholder,
    readOnly = false,
    onClick,
  } = props;

  return (
    <div className="flex flex-col gap-5.5 p-6.5">
      <div>
        <label className="mb-3 text-black dark:text-white">{label}</label>
        {required && <span className="input_required">*</span>}

        <input
          type="file"
          value={value}
          required={required}
          onChange={onChange}
          onClick={onClick}
          name={name}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-3 block text-black dark:text-white">
          Attach file
        </label>
        <input
          type="file"
          className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
        />
      </div>

      {errMsg && <span className="input_error">{errMsg}!</span>}
    </div>
  );
};

export default AttachFile;
