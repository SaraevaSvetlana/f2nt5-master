import {useEffect, useState} from "react";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import {useForm} from "react-hook-form";
type Post = {
  "userId": number;
  "id": number;
  "title": string;
  "body": string;
}


export default function Home() {
  const [textValue, setTextValue] = useState<string>("init");
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [customColorName, setCustomColorName] = useState<string>("blue");
  const [listElement, setListElement] = useState<any>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(()=>{
    let list:any[] = [...listElement];
    if (textValue!== 'init'){
      if(checkboxValue){
        list = listElement.filter((item:Post)=>item.title.includes(textValue));
        setListElement(list);
      }else {
        onSubmit();
      }
    }
  },[checkboxValue])

  function onSubmit() {
    const list: any [] = [];
    let post: Post;
    setIsVisible(false);
    fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(response => response.json())
        .then(data => {
          data.map((item: Post) => {
            post = {
              userId: item.userId,
              id: item.id,
              title: item.title,
              body: item.body
            };
            list.push(post);
          })
          console.log(list);
          setListElement(list);
          setIsVisible(true);
        })
        .catch(e => {
          console.log(e);
        });
  }
  const {
    handleSubmit,
  } = useForm({
    mode: "onBlur"
  });


  return (
    <div>
      <div className="flex flex-col gap-2 my-2 ml-1">
        <div>
          <code className="bg-cyan-400">customColorName</code>
          = {customColorName}
        </div>
        <div>
          <code className="bg-green-400">textValue</code>
          = {textValue}
        </div>
        <div>
          <code className="bg-purple-400">checkboxValue</code>
          = {checkboxValue.toString()}
        </div>
      </div>
      <div className="flex flex-col bottom-20 gap-5 mb-3 justify-center">
        <Checkbox
            checked = {checkboxValue}
            onChange = {setCheckboxValue}
            color={customColorName}
        >Test</Checkbox>
        <Input
          value={textValue}
          onChange={setTextValue}
          color={customColorName}
          placeholder={'Standard'}
        />
        <div className="ml-3"></div>
      </div>
      <div className="ml-3 mt-20"></div>

      <div className="flex space-x-3   items-center justify-center">
        <button
          onClick={() => setCustomColorName("green")}
          className="bg-slate-300 rounded-md p-1.5"
        >
          set green
        </button>
        <button
          onClick={() => setCustomColorName("blue")}
          className="bg-slate-300 rounded-md p-1.5"
        >
          set blue
        </button>


        {/* This button should toggle checkbox state */}
        <button className="bg-slate-300 rounded-md p-1.5"
                onClick={() => setCheckboxValue(!checkboxValue)}
        >
          <span className="bg-yellow-300"> toggle checkbox</span>
        </button>
      </div>

      <div className="flex  justify-center gap-2 mt-20 mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
        <button className="bg-slate-300  rounded-md p-1.5"
                type='submit'
                // onClick={handleSubmit}
        >
          <span className=" mt-60"> form submit</span>
        </button>
        </form>

      </div>
      <div className="font-bold text-center">Results:</div>
      <div className="text-left">
          <span className="bg-yellow-300">
             {listElement.length === 0 ? '' :
                 isVisible ?
                     listElement.map((item: Post, index: number) =>
                         <div key={`id#${index}`}>
                           <h5>{item.title}</h5>
                           <p>{item.body}</p>
                         </div>
                     ) : <Loader/>
             }
          </span>
      </div>
      <ol className="list-decimal pl-5 ml-2 mt-5">
        <li>Clicking on toggle checkbox button should toggle checkbox value</li>
        <li>
          <code>checkboxValue</code> and checkbox state should be two way synced
        </li>
        <li>
          Clicking on 'set input value' button should change input current value
        </li>
        <li>
          <code>textValue</code> and input state should be two way synced
        </li>
        <li>
          Input border bottom in focus state should change to green instead of
          blue when <code>customColorName</code> variable is green (changes on
          'set green' button click)
        </li>
        <li>
          Checkbox and Input should implement <code>value</code> and{" "}
          <code>onChange</code> callbacks
        </li>
        <li>
          Implement react hook form:
          <ul className="list-disc pl-5">
            <li>Add 'submit' button</li>
            <li>
              Validate checkbox. required value: <code>true</code>.
            </li>
            <li>
              Validate Input value. minLength: 4, maxLength: 8, only latin
              letters
            </li>
            <li>Show error messages only after submitting</li>
            <li>Make fake post request to any url</li>
            <li>Show loader before http request and hide it after</li>
          </ul>
        </li>
        <li>Add typing - bonus</li>
      </ol>
      <div className="font-bold mt-2">References:</div>
      <ul className="list-disc pl-5">
        <li>
          <a href="https://tailwindcss.com/">Tailwind CSS Docs</a>
        </li>
        <li>
          <a href="https://react-hook-form.com/">React hook form docs</a>
        </li>
      </ul>
    </div>
  );
}
