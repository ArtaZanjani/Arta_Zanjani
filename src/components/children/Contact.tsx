import { buttons } from "@/utils/path";
import AnimateLayout from "../AnimateLayout";
import Monoco from "@monokai/monoco-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import supabase from "@/configs/supabase";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

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
    borderRadius: 16,
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

      if (existing?.length) {
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
      <Monoco className="flex flex-col w-full p-4 gap-y-5 bgColor" borderRadius={32} smoothing={1} clip as="div">
        {inputs.map((e, index) => (
          <div className="relative" key={index}>
            {e.label === "Type your message here." ? <Monoco className={`${inputClassList} resize-none min-h-32 field-sizing-content`} {...baseMonocoProps} placeholder={e.label} as="textarea" value={e.value} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(index, ev.target.value)} /> : <Monoco className={`${inputClassList} h-14`} placeholder={e.label} type={e.type} {...baseMonocoProps} as="input" value={e.value} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => handleChange(index, ev.target.value)} />}
            {e.error && <p className="mt-2 ml-1 text-sm font-Poppins_Medium text-red">{e.error}</p>}
          </div>
        ))}
        <Monoco className={`w-full h-14 innerBgColor duration-200 full_center gap-x-2.5 ${(!checkValue || loading) && "opacity-50 cursor-not-allowed"}`} onClick={handleSubmit} as="button" borderRadius={16} smoothing={1} clip>
          {loading ? <Spinner /> : <p className="text-sm font-Poppins_Semibold">Submit</p>}
        </Monoco>
      </Monoco>
    </AnimateLayout>
  );
};

export default Contact;
