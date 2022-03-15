import clsx from "clsx";
import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";


type propsType = {
  color: string;
  value:string;
  placeholder:string;
  onChange: any;

}

export default function InputText(props:propsType) {

  const {
     value,
    onChange,
    color,
    placeholder = "Standard"
  } = props;

  const validationSchema:any = Yup.object().shape({
    text: Yup.string()
        .min(4, 'Text must be at least 4 characters')
        .max(8, 'Text must not exceed 8 characters')
        .matches(
            /^[a-zA-Z\s]+$/,
            "Text is not valid"
        ),

  });

  const {
    register,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur"
  });
  const onSubmit = (data:any) => {
    onChange(data.text);
    reset();
  }

  return (
    <div className="mx-auto h-8 w-64">
      <label className="relative justify-center items-center">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className={clsx(
              "peer placeholder-transparent outline-none absolute border border-1 border-t-0 border-r-0 border-l-0 border-b-slate-500 hover:border-b-slate-800 hover:border-b-2",
                {
                  "focus:border-b-2 focus:border-b-blue-500":
                      color === "blue",
                  "focus:border-b-2 focus:border-b-green-500":
                      color === "green",
                }
                )}
            id='idI'
            defaultValue={value}
            color={color}
            placeholder={placeholder}
            {...register(`text`)}
          />
            <div className="relative justify-center items-center top-10">{errors?.text && <p>{errors?.text?.message || "Error!"}</p>}</div>
            <button type='submit'
                    className="bg-slate-300  mt-8 rounded-md p-1.5"
                    color='primary'
            >set input value</button>

          </form>
          <div
            className={clsx(
              "absolute cursor-text top-2 left-0 text-gray-500 text-xs transition-all -translate-y-6 peer-focus:-translate-y-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-xs peer-placeholder-shown:text-base peer-focus:text-blue-500"
            )}
          >
            {placeholder}
          </div>
        </div>
      </label>
    </div>
  );
}
