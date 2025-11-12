import supabase from "@/configs/supabase";

export const fetcher = async (where: string) => {
  const { data, error } = await supabase.from(where).select("*");
  if (error) throw new Error(error.message);
  return [...data];
};
