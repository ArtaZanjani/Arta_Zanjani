import { buttons } from "@/utils/path";
import AnimateLayout from "../AnimateLayout";
import Monoco from "@monokai/monoco-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import supabase from "@/configs/supabase";
import { toast } from "react-toastify";

const Contact = () => {
  const { theme } = useTheme();
  const [inputs, setInputs] = useState([
    {
      label: "Name",
      type: "text",
      value: "",
      error: "",
    },
    {
      label: "Email",
      type: "email",
      value: "",
      error: "",
    },
    {
      label: "Type your message here.",
      type: "text",
      value: "",
      error: "",
    },
  ]);

  const baseMonocoProps = {
    borderRadius: 8,
    smoothing: 1,
    clip: true,
    border: [2, theme === "light" ? "#000" : "#f2f5f9"] as [number, string],
  };
  const inputClassList = "w-full p-3 placeholder:text-gray-500 dark:placeholder:text-gray-400";

  const validateInput = (label: string, value: string) => {
    if (!value) return "";

    if (label === "Name") {
      return /^[A-Za-z\s]*$/.test(value) ? "" : "Name should contain only letters.";
    }

    if (label === "Email") {
      return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? "" : "Enter a valid email.";
    }

    if (label === "Type your message here.") {
      return value.trim() ? "" : "Message cannot be empty.";
    }

    return "";
  };

  const handleChange = (index: number, newValue: string) => {
    setInputs((prev) =>
      prev.map((field, i) =>
        i === index
          ? {
              ...field,
              value: newValue,
              error: validateInput(field.label, newValue),
            }
          : field
      )
    );
  };

  const checkValue = inputs.every((e) => e.value.length && !e.error);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!checkValue || loading) return;

    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const message = inputs[2].value.trim();

    try {
      setLoading(true);
      const { data: existing, error: selectError } = await supabase.from("contact").select("*").eq("email", email).eq("message", message).limit(1);

      if (selectError) throw selectError;

      if (existing && existing.length > 0) {
        toast.error("This message has already been submitted!");
        return;
      }

      const { error: insertError } = await supabase.from("contact").insert([{ name, email, message }]);

      if (insertError) throw insertError;

      toast.success("Message submitted successfully!");

      setInputs(inputs.map((i) => ({ ...i, value: "", error: "" })));
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimateLayout title={buttons[3].label}>
      <Monoco className="flex flex-col w-full p-4 gap-y-5 bgColor" borderRadius={16} smoothing={1} clip as="div">
        {inputs.map((e, index) => (
          <div className="relative" key={index}>
            {e.label === "Type your message here." ? <Monoco className={`${inputClassList} resize-none min-h-32 field-sizing-content`} {...baseMonocoProps} placeholder={e.label} as="textarea" value={e.value} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(index, ev.target.value)} /> : <Monoco className={`${inputClassList} h-14`} placeholder={e.label} type={e.type} {...baseMonocoProps} as="input" value={e.value} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => handleChange(index, ev.target.value)} />}
            {e.error && <p className="mt-2 ml-1 text-sm font-medium text-red">{e.error}</p>}
          </div>
        ))}
        <Monoco className={`w-full h-14 innerBgColor duration-200 full_center gap-x-2.5 ${(!checkValue || loading) && "opacity-50 cursor-not-allowed"}`} onClick={handleSubmit} as="button" borderRadius={8} smoothing={1} clip>
          {loading ? (
            <div role="status">
              <svg aria-hidden="true" className="text-gray-200 size-8 animate-spin dark:text-gray-600 fill-orange" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <p className="text-sm font-semibold">Submit</p>
          )}
        </Monoco>
      </Monoco>
    </AnimateLayout>
  );
};

export default Contact;
